module.exports = function(robot) {

  robot.hear(/Hello!/, function(res) {
    return res.send("Bye!");
  });

  robot.respond(/is it a (weekend|holiday)\s?\?/i, function(msg){
      var today = new Date();

      return msg.send(
        today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO"
      );
  });

}
