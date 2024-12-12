import { getCookie } from 'cookies-next';

let apiUrl = 'http://127.0.0.1:8000';

interface setDataParams {
  url: string;
}

export const setData = ({ url }: setDataParams) => {
  apiUrl = url;
};

interface IData {
  body?: any;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
}

export const methodDefault = async <T>(
  path: string,
  { body, method = 'GET', headers }: IData,
  baseUrl: string = apiUrl
): Promise<T> => {
  const token = getCookie('access_token') as string | undefined;

  const fullPath = `${baseUrl}/${path}`;

  try {
    const response = await fetch(fullPath, {
      method,
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: token ? `Bearer ${token}` : '',
        Authorization: token ? `${token}` : '',
        ...headers,
      },
      // credentials: 'include'
    });

    if (!response.ok) {
      const errorMessage = `HTTP Error! status: ${response.status} - ${response.statusText}`;
      console.error(errorMessage);
      // throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Fetch Error >>> ${error.message}`);
    } else {
      console.error('Unknown error occurred', error);
    }
    throw error;
  }
};
