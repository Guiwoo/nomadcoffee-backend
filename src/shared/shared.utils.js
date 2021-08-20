import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadImage = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const objName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const upload = await new AWS.S3()
    .upload({
      Bucket: "nomad-coffee-uploader",
      Key: objName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return upload.Location;
};
