// src/utils/doDeleteRequest.ts

import axios from 'axios';

async function doDeleteRequest(path: string) {
  try {
    const res = await axios.delete(path, {
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

export default doDeleteRequest;
