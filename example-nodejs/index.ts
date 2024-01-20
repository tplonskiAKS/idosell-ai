import { IdoSell } from "./src/IdoSell"
import { ProductsService } from "./src/ProductsService";
import { OpenAIExtended } from "./src/OpenAIApiExtended";
import * as yargs from 'yargs'


(async () => {
    const args = await yargs
        .option('insertId', {
            alias: 'i',
            demand: true
        }).argv;

    const idosell = new IdoSell();
    const productsService = new ProductsService(args);
    const openAi = new OpenAIExtended();

    console.log('[LOG] Geting products from PG...');

    await productsService.initializeDataSource();

    const products = await productsService.getProducts();

    await productsService.closeDataSource();

    console.log('[LOG] Processing products with OpenAI and adding to IdoSell...');

    for (const product of products) {
        const description = await openAi.getDescription(product.RawProduct_product_name);

        await idosell.setDescription(product.RawProduct_id, description?.content);
    }

    console.log('[LOG] Done.');
})().catch((error) => {
    console.log(error);
});