import { Product } from "@Models";
import Ajv, { JSONSchemaType } from "ajv"

const ajv = new Ajv();

const schema: JSONSchemaType<Product> = {
    type: "object",
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
    },
    required: ['title', 'description'],
    additionalProperties: false
  }

  const validate = ajv.compile<Product>(schema);

  export { schema, validate };
  