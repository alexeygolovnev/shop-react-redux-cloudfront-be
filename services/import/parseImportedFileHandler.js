const { S3 } = require("aws-sdk");
const csv = require("csv-parser");

module.exports.handler = async function (event) {
  const { REGION, PARSE_FOLDER, UPLOAD_FOLDER } = process.env;

  const s3 = new S3({ region: REGION, signatureVersion: "v4" });

  const s3Event = event.Records[0].s3;

  const params = {
    Bucket: s3Event.bucket.name,
    Key: s3Event.object.key,
  };

  const s3Stream = s3.getObject(params).createReadStream();

  const results = [];

  const copyUploadedFileIntoParsedFolder = async () => {
    await s3
      .copyObject({
        ...params,
        CopySource: params.Bucket + "/" + params.Key,
        Key: params.Key.replace(UPLOAD_FOLDER, PARSE_FOLDER),
      })
      .promise();
  };

  const deleteUploadedFileFromUploadedFolder = async () => {
    await s3.deleteObject(params).promise();
  };

  const result = await new Promise((resolve, reject) => {
    s3Stream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("error", reject)
      .on("end", async () => {
        await copyUploadedFileIntoParsedFolder();
        await deleteUploadedFileFromUploadedFolder();

        resolve(results);
      });
  });

  console.log(JSON.stringify(result));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  };
};
