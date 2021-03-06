import * as AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instagram-uploads-i",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};

/* export const deleteInS3 = async (fileUrl) => {
  const Key = fileUrl.replace(
    "https://instagram-uploads-i.s3.amazonaws.com/",
    ""
  );
  await new AWS.S3()
    .deleteObject({
      Bucket: "instagram-uploads-i",
      Key,
    })
    .promise();
}; */
