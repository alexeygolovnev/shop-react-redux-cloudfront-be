import { GetProductById } from "@DTOs/product";
import Ajv, { JSONSchemaType } from "ajv"

const ajv = new Ajv();

const schema: JSONSchemaType<GetProductById> = {
    type: "object",
    properties: {
      productId: { type: 'string' },
    },
    required: ['productId']
}

  const validate = ajv.compile<GetProductById>(schema);

  export { schema, validate };
  