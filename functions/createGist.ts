import { Handler } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (event, context) => {
  try {
    // Get access key
    // const { code } = req.query;
    const newGist = JSON.parse(event.body || "{}");
    const params = new URLSearchParams({
      client_id: process.env.CLIENT_ID || "",
      client_secret: process.env.CLIENT_SECRET || "",
      // code: ,
    });
    console.log(params);
    const authUrl = "https://github.com/login/oauth/access_token?" + params;
    const authResult = await axios.post(authUrl);
    console.log(authResult);
    const authData = new URLSearchParams(authResult.data);
    const accessToken = authData.get("access_token");
    console.log(accessToken);

    // Get user's username
    const userApi = "https://api.github.com/user";
    const userResult = await axios.get(userApi, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { login } = userResult.data;
    console.log("User login:", login);

    // Call api with access token
    // const newGist = app.get("new_gist");
    const gistApi = "https://api.github.com/gists";
    await axios.post(gistApi, newGist, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Gist created" }),
    };
    // Catch errors from any of the api calls
  } catch (e) {
    console.error("Error:", e.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", details: e }),
    };
  }
};

export { handler };
