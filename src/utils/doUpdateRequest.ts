// src/utils/doUpdateRequest.ts

import axios from 'axios';

async function doUpdateRequest(payload: object, path: string) {
  try {
    const res = await axios.patch(path, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default doUpdateRequest;
