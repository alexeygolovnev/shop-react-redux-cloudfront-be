import { Stock } from "@Models";
import Ajv, { JSONSchemaType } from "ajv"

const ajv = new Ajv();

const schema: JSONSchemaType<Stock> = {
    type: "object",
    properties: {
        productId: { type: 'string' },
        count: { type: 'number' },
    },
    required: ['count'],
    additionalProperties: false
  }

  const validate = ajv.compile<Stock>(schema);

  export { schema, validate };
  