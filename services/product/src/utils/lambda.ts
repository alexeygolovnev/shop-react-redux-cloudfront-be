import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser())
}

export default middyfy;
