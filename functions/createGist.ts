import { Handler } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (event, context) => {
  try {
    // Env vars
    const CLIENT_ID = process.env.CLIENT_ID || "";
    const CLIENT_SECRET = process.env.CLIENT_SECRET || "";

    // Get access key
    // const githubLogin = `https://github.com/login/oauth/authorize?scope=gist&client_id=${CLIENT_ID}`;
    // const loginQuery = await axios.get(githubLogin);
    // console.log("code", code);
    // const { code } = loginQuery.data.args;

    // const query = event.queryStringParameters as Record<string, string>;
    // console.log(query);
    // const { code } = query;

    // Get data from post body
    const data = JSON.parse(event.body || "{}");
    const { code, gist } = data;

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    });
    console.log("Params", params);
    const authUrl = "https://github.com/login/oauth/access_token?" + params;
    const authResult = await axios.post(authUrl);

    console.log("Auth result", authResult.data);
    const authData = new URLSearchParams(authResult.data);
    const accessToken = authData.get("access_token");
    console.log("access token", accessToken);

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
    await axios.post(gistApi, gist, {
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
