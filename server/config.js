var host = process.env.HOST || "localhost"
var port = process.env.PORT || "8001"
module.exports = {
  redis_port : process.env.REDIS_PORT,
  redis_host : process.env.REDIS_HOST,
  oauth2_client_id : process.env.OAUTH2_CLIENT_ID,
  oauth2_client_secret : process.env.OAUTH2_CLIENT_SECRET,
  oauth2_callback_url : "http://" + host + ":" + port + "/auth/google/callback"
}
