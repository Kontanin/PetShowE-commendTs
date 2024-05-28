// utils/validateToken.ts
import Cookies from 'js-cookie';

const validateToken = async (): Promise<boolean> => {
  const token = Cookies.get('authToken');
  console.log(token, 'token');
  if (!token) {
    return false;
  }

  const response = await fetch('http://localhost:5000/user/validate-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  console.log(response, 'response');
  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.valid;
};

export default validateToken;
