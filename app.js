const http = require("http");

http
  .createServer(function (req, res) {
    res.write("Welcome to Meowmitos!");
    res.end();
  })
  .listen(3001);

console.log("Server started on port 3000");
