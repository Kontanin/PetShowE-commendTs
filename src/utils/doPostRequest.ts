import axios from 'axios';
import Cookies from 'js-cookie';

async function doPostRequest(payload: object, path: string) {
  // Get the token from cookies
  const token = Cookies.get('authToken') || '';

  // Set the headers conditionally based on the presence of the token
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { authorization: `Bearer ${token}` }),  // Only add authorization if token exists
  };

  try {
    const res = await axios.post(path, payload, { headers });
    const body = res.data;
    console.log(res);  // Log the response for debugging
    return body;
  } catch (e) {
    console.log(e, 'error');
    return false;
  }
}

export default doPostRequest;
