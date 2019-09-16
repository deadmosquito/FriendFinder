var friendInfo = require("../data/friends");

module.exports = function (app) {
    // app.get API link for all friends (JSON)
    app.get("/api/friends", function (req, res) {
        res.json(friendInfo);
    });

   // app.post to push and get friend
    app.post("/api/friends", function (req, res) {
        // Our user is the data sent in the request.
        var user = req.body;
        console.log(user)
        // The differences between Friend and user
        var differences = [];

        // look through these potential friends.
        friendInfo.forEach(function (friend) {
            var userFriendDifference = 0;
            // For each answer, compare the answers and add the absolute value of the difference to the total difference.
            for (var i = 0; i < user.scores.length; i++) {
                var userScore = user.scores[i];
                var friendScore = friend.scores[i];
                var difference = friendScore - userScore;
                userFriendDifference += Math.abs(difference);
            }
            differences.push(userFriendDifference);
        });

        // Find the minimum difference score.
        var minimumDifference = Math.min.apply(null, differences);

        // If there is more than one potential friend with that score, create an array.
        var bestMatches = [];

        // For each item in differences, if it is equal to the minimumDifference, add the corresponding friendInfo to the bestMatches array.
        for (var i = 0; i < differences.length; i++) {
            if (differences[i] === minimumDifference) {
                bestMatches.push(friendInfo[i]);
            }
        }

        // Then send Best Match to the client.
        res.json(bestMatches);
        friendInfo.push(user)
    })
}