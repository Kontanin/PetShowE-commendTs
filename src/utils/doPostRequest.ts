import axios from 'axios';

async function doPostRequest(payload: object, path: string) {
  console.log(payload, 'payload');
  try {
    const res = await axios.post(path, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = res.data;

    return body;
  } catch (e) {
    console.log(e, 'error');
    return false;
  }
}

export default doPostRequest;
