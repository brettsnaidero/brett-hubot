module.exports = function(robot) {

  robot.hear(/Hello!/, function(res) {
    return res.send("Bye!");
  });

  robot.respond(/is it a (weekend|holiday)\s?\?/i, function(msg){
      return msg.send(
        let today = new Date();
        today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO"
      );
  });

}
