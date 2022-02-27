import {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

async function listBuckets(client: S3Client) {
  const result = await client.send(new ListBucketsCommand({}));
  console.log("list of buckets, ", result.Buckets);
}

async function createBuckets(client: S3Client, bucketName: string) {
  const result = await client.send(
    new CreateBucketCommand({
      Bucket: bucketName,
    })
  );
  console.log("createdBucket", result.Location);
}

async function listObjects(client: S3Client, bucketName: string) {
  const result = await client.send(
    new ListObjectsCommand({
      Bucket: bucketName,
    })
  );
  console.log(
    "list object of bucket",
    result.Contents?.map((object) => object.Key)
  );
}
async function createObject(
  client: S3Client,
  bucketName: string,
  objectName: string,
  content: string
) {
  const result = await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: objectName,
      Body: content,
    })
  );
  console.log("create object result", result);
}
async function getObject(
  client: S3Client,
  bucketName: string,
  objectName: string
) {
  const result = await client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: objectName,
    })
  );
  console.log("get object result", result.Body);
}


const s3Client = new S3Client({
    credentials: {
        secretAccessKey: 'dummy',
        accessKeyId: 'dummy',
    },
    region: 'eu-central-1',
    endpoint: 'http://localhost:4566',
    forcePathStyle: true, // for local dev (http intead of https object path)
})