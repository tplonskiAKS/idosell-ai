import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Insert, RawProduct } from "./typeorm/product.entity";
import { Arguments } from "./types/index.types";

dotenv.config();


export class ProductsService {
    private readonly postgresDataSource: DataSource;
    private readonly args: Arguments;

    constructor(args: Arguments) {
        this.postgresDataSource = new DataSource({
            type: "postgres",
            host: process.env.DATABASE_HOST,
            port: 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [
                RawProduct,
                Insert
            ],
        });
        this.args = args;
    }

    public async initializeDataSource(): Promise<void> {
        await this.postgresDataSource.initialize();
    }

    public async closeDataSource(): Promise<void> {
        await this.postgresDataSource.destroy();
    }

    public async getlastInsert() {
        return this.postgresDataSource.getRepository(Insert).findOne({
            where: {},
            order: { date: 'DESC' },
        });
    }

    public async getProducts() {
        const readStream = await this.postgresDataSource.getRepository(RawProduct)
            .createQueryBuilder()
            .where("insert_id = :insertId", { insertId: this.args.insertId })
            .stream();

        const products = [];

        for await (const product of readStream) {
            products.push(product);
        }

        return products;

    }

}