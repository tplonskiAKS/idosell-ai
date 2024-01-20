/* eslint-disable @typescript-eslint/no-this-alias */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { parse } from 'csv-parse';
import { pipeline } from 'stream/promises';
import { ProductsService } from 'src/products/services/products.service';
import { InsertService } from 'src/insert/insert.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ApiAuth } from 'src/auth/decorators/api-auth.decorator';
import { OfferIdsDto } from './dto/offerIds.dto';
import * as _ from 'lodash';


@Controller('autodescription')
@ApiTags('AutoDescription')
export class AutoDescriptionController {
    private jenkinsTriggerUrl = 'http://34.116.133.168:8080/job/run_script/buildWithParameters';
    constructor(private readonly productsService: ProductsService, private readonly insertService: InsertService, private readonly configService: ConfigService) { }

    @Post('asset')
    @ApiAuth()
    @UseInterceptors(
        FileInterceptor('file_asset', {
            storage: diskStorage({
                destination: './files',
                filename: (_, file, callback) => {
                    callback(null, file.originalname);
                }
            }),
        }))
    async uploadFile() {
        const lastInsert = await this.insertService.findLastInsert();

        const currentInsert = { insert_id: lastInsert?.insert_id + 1, date: new Date() };

        await this.insertService.createInsert(currentInsert);

        const readStream = createReadStream('./files/products.csv');

        const classProperties = this;

        await pipeline(readStream, parse({ delimiter: ';', columns: true }), async function* (stream) {
            const products = [];
            const pushProduct = async (product: Record<string, string>) => {
                products.push(product);
            }
            for await (const chunk of stream) {
                const rowToAdd = { ...chunk, insert_id: currentInsert?.insert_id };
                yield await pushProduct(rowToAdd);
            }

            await classProperties.productsService.insertBatchProducts(products);

            const token = classProperties.configService.get<string>('JENKINS_TOKEN');
            const username = classProperties.configService.get<string>('JENKINS_USER');
            const password = classProperties.configService.get<string>('JENKINS_PASSWORD');

            await axios.get(`${classProperties.jenkinsTriggerUrl}?token=${token}&INSERT_ID=${currentInsert?.insert_id}`, {
                auth: {
                    username,
                    password
                }
            })

        });
    }

    @Post('handle-product-ids')
    @ApiAuth()
    async handleProductIds(@Body() body: OfferIdsDto) {
        const productIdsRanges = body?.productIds.split('\n');
        const productIds = productIdsRanges.map((el) => {
            if (el.includes('-')) {
                const [firstId, secondId] = el.split('-');
                const range = _.range(Number(firstId), Number(secondId));
                const rangeWrappedInObject = range.map((el) => {
                    return { id: String(el) }
                });
                return rangeWrappedInObject;
            }

            return { id: el };
        });

        console.log(productIds.flat())

    }
}
