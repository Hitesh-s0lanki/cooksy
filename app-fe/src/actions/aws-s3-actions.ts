"use server";

import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";

export const downloadAndUploadImage = async (url: string, filename: string) => {
  try {
    const imageBuffer = await downloadImage(url);
    const s3Url = await uploadToS3(imageBuffer, filename);
    return s3Url;
  } catch (error) {
    console.error("Error checking file existence in S3:", error);
    return {
      message: "Something went wrong in finding the key in AWS",
      status: 500,
    };
  }
};

const downloadImage = async (url: string): Promise<Buffer> => {
  const response = await axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });
  return response.data;
};

const uploadToS3 = async (buffer: Buffer, filename: string) => {
  const key = `dish/${filename}`;

  if (!process.env.COOKSY_AWS_BUCKET) throw new Error("AWS bucket not found!");
  if (!process.env.COOKSY_AWS_REGION) throw new Error("AWS Region not found!");
  if (!process.env.COOKSY_AWS_ACCESS_KEY_ID)
    throw new Error("AWS access key not found!");
  if (!process.env.COOKSY_AWS_SECRET_KEY)
    throw new Error("AWS secret key not found!");

  const s3Client = new S3Client({
    region: process.env.COOKSY_AWS_REGION,
    credentials: {
      accessKeyId: process.env.COOKSY_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.COOKSY_AWS_SECRET_KEY,
    },
  });

  const command = new PutObjectCommand({
    Bucket: process.env.COOKSY_AWS_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: "image/png",
  });

  await s3Client.send(command);

  return key;
};

export const checkImageAlreadyExist = async (key: string) => {
  try {
    if (!process.env.COOKSY_AWS_BUCKET)
      throw new Error("AWS bucket not found!");
    if (!process.env.COOKSY_AWS_REGION)
      throw new Error("AWS Region not found!");
    if (!process.env.COOKSY_AWS_ACCESS_KEY_ID)
      throw new Error("AWS access key not found!");
    if (!process.env.COOKSY_AWS_SECRET_KEY)
      throw new Error("AWS secret key not found!");

    const s3Client = new S3Client({
      region: process.env.COOKSY_AWS_REGION,
      credentials: {
        accessKeyId: process.env.COOKSY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.COOKSY_AWS_SECRET_KEY,
      },
    });

    const headCommand = new HeadObjectCommand({
      Bucket: process.env.COOKSY_AWS_BUCKET,
      Key: key,
    });

    await s3Client.send(headCommand); // If no error, the key exists
    return {
      data: true,
      message: "key found successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Error checking file existence in S3:", error);
    return {
      message: "Something went wrong in finding the key in AWS",
      status: 500,
    };
  }
};

export const getImageUrl = async (key: string) => {
  try {
    if (!process.env.COOKSY_AWS_BUCKET)
      throw new Error("AWS bucket not found!");
    if (!process.env.COOKSY_AWS_REGION)
      throw new Error("AWS Region not found!");
    if (!process.env.COOKSY_AWS_ACCESS_KEY_ID)
      throw new Error("AWS access key not found!");
    if (!process.env.COOKSY_AWS_SECRET_KEY)
      throw new Error("AWS secret key not found!");

    const s3Client = new S3Client({
      region: process.env.COOKSY_AWS_REGION,
      credentials: {
        accessKeyId: process.env.COOKSY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.COOKSY_AWS_SECRET_KEY,
      },
    });

    const command = new GetObjectCommand({
      Bucket: process.env.COOKSY_AWS_BUCKET,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return {
      data: url,
      message: "Image Url Successfully generated",
      status: 200,
    };
  } catch (error) {
    console.error("Error checking file existence in S3:", error);
    return {
      message: "Something went wrong in finding the key in AWS",
      status: 500,
    };
  }
};
