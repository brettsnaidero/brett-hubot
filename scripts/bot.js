module.exports = function(robot) {

  // Hi
  robot.hear(/Hello!/, function(res) {
    return res.send("Bye!");
  });

  // Is it a weekend?
  robot.respond(/is it a (weekend|holiday)\s?\?/i, function(msg){
      var today = new Date();

      return msg.send(
        today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO"
      );
  });

  // Hi
  robot.respond(/Hi Hubot! My name is (.*)/i, function(msg) {
     var name;
     name = msg.match[1];
     if (name == "Hubot"){
       return msg.send("You're not Hubot--I'm Hubot!");
     } else {
       return msg.reply("Nice to meet you, " + name + "!");
     }
   });

   // Remember this please app
   let listOfThings = [];
   let listOfThingsCounter = 0;

   robot.respond(/Can you please remember this\? (.*)/i, function(msg) {
     var memoryAnswer = msg.match[1];
     listOfThings[listOfThingsCounter] = memoryAnswer;

     listOfThingsCounter++;

     return msg.reply("Cool, I'll remember that for you.");
   });

   // Brett's thing
   robot.respond(/Can you please remind me of the things\?/, function(msg) {
     return msg.reply("Yep! Here you go: " + listOfThings);
   });


}
