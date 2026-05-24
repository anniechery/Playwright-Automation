import { request, expect, APIRequestContext } from '@playwright/test';

export async function getAccessToken(): Promise<string> {
  const authorization = process.env.AUTHORIZATION;
 
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: 'https://api.onegov.nsw.gov.au',

    extraHTTPHeaders: {
      Authorization: `Basic ${authorization}`
    }
  });


  const response = await apiContext.get('/oauth/client_credential/accesstoken', {
    params: {
      grant_type: 'client_credentials'
    }
  });

  // Validate status code
  expect(response.status()).toBe(200);

  // Parse JSON response
  const body = await response.json();

  console.log('Response Body:', body);

  expect(body).toHaveProperty('access_token');
  // Validate access token is not empty
  expect(body.access_token).not.toBe('');

  return body.access_token;
}