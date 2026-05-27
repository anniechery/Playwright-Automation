import { test, expect, APIResponse } from '@playwright/test';
import { getAccessToken } from './oauthtoken';
import dotenv from 'dotenv';
import path from 'path';
import apiTestData from '../../test-data/api-test-data.json';
dotenv.config({ path: path.resolve(__dirname, '../..', '.env') });


//helper function to get the UTC timestamp in the required format for the API request
function formatUtcRequestTimestamp(date: Date): string {
  const pad = (value: number) => value.toString().padStart(2, '0');
  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();
  let hour = date.getUTCHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const hourStr = pad(hour);
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${day}/${month}/${year} ${hourStr}:${minutes}:${seconds} ${ampm}`;
}


test('Validate New Fuel Prices', async ({ request }) => {
  const apikey = process.env.APIKEY;
  expect(apikey, 'Missing APIKEY in .env or environment').toBeTruthy();

  const token = await getAccessToken();
  const requesttimestamp = formatUtcRequestTimestamp(new Date());
  for (const testData of apiTestData) {
      const apiUrl = testData.apiURL;
      const expectedStatus = testData.status;
      const startTime = Date.now();
      const response: APIResponse = await request.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Apikey: apikey!,
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          Transactionid: '1984',
          Requesttimestamp: requesttimestamp
        }
      });
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      const body = await response.json();
      console.log('Response Body:', body);
      console.log(`API Response Time for ${apiUrl}: ${responseTime} ms`);
      expect(response.status()).toBe(expectedStatus); //Response status should match the expected status from the test data
      expect(responseTime).toBeLessThan(2000); // Response time should be less than 2000 ms
           
  }
});