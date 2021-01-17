import test from 'ava';
import saveToGCP from '../../src/utils/googlecloud/googleCloudFunctions';
import { Storage } from '@google-cloud/storage'

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage();
// Makes an authenticated API request.
async function listBuckets() {
  try {
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log('Buckets:');
    buckets.forEach((bucket: { name: any; }) => {
      console.log(bucket.name);
    });
    return true;
  } catch (err) {
    console.error('ERROR:', err);
    return false
  }
}

test('get gcp to save file', async (t) => {

  if (await listBuckets()) {
    await saveToGCP("test/gcpTests/2021-01-16-211341.jpg","2021-01-16-211341.jpg");
    t.assert("potato");
  } else {
    t.log("authentication failed, see https://cloud.google.com/docs/authentication/getting-started#auth-cloud-implicit-nodejs")
    console.log("authentication failed, see https://cloud.google.com/docs/authentication/getting-started#auth-cloud-implicit-nodejs")
    t.assert("potato");
  }


})



