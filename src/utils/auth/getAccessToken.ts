import { request } from "@playwright/test";

export async function getAccessToken() {

  const apiContext = await request.newContext();

  const response = await apiContext.post(
    "https://auth.casaqa.ajira.tech/auth/realms/casa/protocol/openid-connect/token",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "password",
        username: "fashionfolks@gmail.com",
        password: "abcd1234",
        client_id: "casa_dashboard",
      },
    }
  );

  const body = await response.json();

  console.log("Token Response:", body);  
  console.log("Token Status:", response.status());

  return body.access_token;
}