import { Product, Stock } from "@Models";
import productsMock from "./products";

const productsWithStocksMock = productsMock.map((product) => {
    return {
        ...product,
        count: 1,
    } as Product & Pick<Stock, 'count'>;
});

export default productsWithStocksMock;
