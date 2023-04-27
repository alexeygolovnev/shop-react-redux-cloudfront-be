const { S3, SQS } = require("aws-sdk");
const csv = require("csv-parser");

module.exports.handler = async function (event) {
  const {
    REGION,
    PARSE_FOLDER,
    UPLOAD_FOLDER,
    CATALOG_ITEMS_QUEUE,
    ACCOUNT_ID,
  } = process.env;

  const s3 = new S3({ region: REGION, signatureVersion: "v4" });
  const sqs = new SQS({ region: REGION });

  const catalogItemsQueueMetaData = await sqs
    .getQueueUrl({
      QueueName: CATALOG_ITEMS_QUEUE,
      QueueOwnerAWSAccountId: ACCOUNT_ID,
    })
    .promise();

  const s3Event = event.Records[0].s3;

  const bucketParams = {
    Bucket: s3Event.bucket.name,
    Key: s3Event.object.key,
  };

  const s3Stream = s3.getObject(bucketParams).createReadStream();

  const results = [];

  const copyUploadedFileIntoParsedFolder = async () => {
    return await s3
      .copyObject({
        ...bucketParams,
        CopySource: bucketParams.Bucket + "/" + bucketParams.Key,
        Key: bucketParams.Key.replace(UPLOAD_FOLDER, PARSE_FOLDER),
      })
      .promise();
  };

  const deleteUploadedFileFromUploadedFolder = async () => {
    await s3.deleteObject(bucketParams).promise();
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

  const payload = results.map((result, index) => ({
    Id: index.toString(),
    MessageBody: JSON.stringify(result),
  }));

  sqs.sendMessageBatch(
    {
      QueueUrl: catalogItemsQueueMetaData.QueueUrl,
      Entries: payload,
    },
    (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(
          `Successfully sent ${payload.length} messages to the queue`
        );
        console.log(`Entries sent: ${JSON.stringify(data.Successful)}`);
      }
    }
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  };
};
