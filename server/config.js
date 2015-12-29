var domain_name = process.env.DOMAIN_NAME || "http://localhost:8001"
module.exports = {
  redis_url : process.env.REDIS_URL,
  oauth2_client_id : process.env.OAUTH2_CLIENT_ID,
  oauth2_client_secret : process.env.OAUTH2_CLIENT_SECRET,
  oauth2_callback_url : domain_name + "/auth/google/callback"
};
