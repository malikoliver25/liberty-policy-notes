const { test, expect } = require('@playwright/test');
const notesData = require('../notesData.json'); 

test.describe('Liberty Mutual - Policyholder Notes API', () => {

  for (const record of notesData) {
    test(`POST Note: ${record.title}`, async ({ request }) => {
      
      const startTime = Date.now();

      const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: record
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Crucial for the Indy region performance check requested by the PM
      console.log(` Response time for "${record.title}": ${duration}ms`);

      // 1. Validate Status Code (201 = Created)
      expect(response.status()).toBe(201);
      
      const responseBody = await response.json();
      
      // 2. Validate Mock Success ID
      expect(responseBody.id).toBe(101); 

      // 3. Performance SLA: Must be under 500ms
      expect(duration).toBeLessThan(500);
    });
  }
});