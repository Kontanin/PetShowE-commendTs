import axios from 'axios';
import Cookies from 'js-cookie';

async function doGetRequest(path: string) {
  const token = Cookies.get('authToken') || '';

  // Set the headers conditionally based on the presence of the token
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { authorization: `Bearer ${token}` })  // Only add the authorization header if token exists
  };

  try {
    const res = await axios.get(path, { headers });  // Pass headers object correctly
    
    return res.data;
  } catch (e) {
    console.error(e, 'error');
    return false;
  }
}

export default doGetRequest;
