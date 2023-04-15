const { S3 } = require("aws-sdk");

module.exports.handler = async function (event) {
  const { BUCKET_NAME, REGION, UPLOAD_FOLDER } = process.env;

  const s3 = new S3({ region: REGION });

  const requestedFileName = event.queryStringParameters.name;

  let signedUrl;
  if (requestedFileName) {
    signedUrl = s3.getSignedUrl("putObject", {
      Bucket: BUCKET_NAME,
      Key: `${UPLOAD_FOLDER}/${requestedFileName}`,
      ContentType: "text/csv",
    });
  }

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: signedUrl }),
  };

  return response;
};
