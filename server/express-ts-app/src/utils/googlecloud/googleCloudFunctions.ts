
import { Storage } from '@google-cloud/storage';

const storage = new Storage();

export default async function saveToGCP(path: string, filename: string) {
  const bucketName = "imageshtn"
  let response = await storage.bucket(bucketName).upload(path);
  
  console.log(`${path} uploaded to ${bucketName}.`);
  return "gs://imageshtn/" + filename;
  

}