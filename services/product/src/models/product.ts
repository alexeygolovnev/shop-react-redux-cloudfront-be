import { productSchema } from "@Schemas";
import { FromSchema } from "json-schema-to-ts";

type Product = FromSchema<typeof productSchema>;

export default Product;
