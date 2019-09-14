var friendsInfo = require("../app/data/friends");

module.exports = function(app) {
  
  app.get("/api/friends", function(req, res) {
    res.json(friendsInfo);
  });

  app.post("/api/friends", function(req, res) {
    friendsInfo.push(req.body);
        res.json(true);
    });
};