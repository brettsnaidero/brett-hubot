module.exports = function(robot) {

  robot.hear(/Hello!/, function(res) {
    return res.send("Bye!");
  });

  robot.respond(/is it a (weekend|holiday)\s?\?/i, function(msg){
      let today = new Date();

      msg.reply(
        today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO"
      );
  });

}
