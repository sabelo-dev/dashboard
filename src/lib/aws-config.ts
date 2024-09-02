// src/lib/aws-config.ts

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Uploads a file to AWS S3
 * @param fileBuffer - The buffer of the file to upload
 * @param fileName - The name of the file
 * @returns The result of the upload operation including the URL of the uploaded file
 */
export const uploadFile = async (fileBuffer: Buffer, fileName: string) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: `${Date.now()}-${fileName}`,
    Body: fileBuffer,
    ContentType: 'image/jpeg', // Adjust based on your needs
    // Remove ACL: 'public-read' as const,
  };

  const command = new PutObjectCommand(params);
  const result = await s3Client.send(command);

  return {
    Location: `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${params.Key}`,
    ...result,
  };
};
