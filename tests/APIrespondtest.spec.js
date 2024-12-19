import { test, expect } from '../common/fixtures';


test("Let's see how this API shit is working with hardcode mode: ", async({ page }) => {
    const respond = await page.request.post('https://demoqa.com/Account/v1/Authorized', {
        data: {
            "userName": "admin1",
            "password": "!Password123"
          }
    })
    console.log(respond);
    expect(respond.status()).toBe(200);
})