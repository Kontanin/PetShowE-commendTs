// @/utils/doUpdateByUserIdRequest.ts
import axios from 'axios';

async function doUpdateRequest(payload: object, path: string) {
  try {
    const res = await axios.patch(path, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (e) {
    console.error('Error in doUpdateRequest:', e);
    throw e;
  }
}

export default doUpdateRequest;

