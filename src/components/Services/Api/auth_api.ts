import axios from 'axios';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const Login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Enable if backend requires cookies/sessions
      }
    );
    return response.data.token;
  } catch (error) {
    throw new Error(`login Failed ! ${error}`);
  }
};

export const Register = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    await axios.post(`${BASE_API_URL}/register`, {
      fullName,
      email,
      password,
    });
    return true;
  } catch (error) {
    throw new Error(`Register Failed ! ${error}`);
  }
};
