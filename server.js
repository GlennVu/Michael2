const spawn = require("child_process").spawn;
const express = require("express");
const http = express();

spawn("twitter-proxy");

http.use((req, res, next) => {
  console.log("%s %s %s", new Date(), req.method, req.url);
  next();
});

http.use(express.static(__dirname + "/frontend/dist/"));

http.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
  console.log(
    "Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool"
  );
});
