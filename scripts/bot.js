module.exports = function(robot) {

  robot.hear(/Jelly Time!/, function(res) {
    return res.send("No!");
  });

}
