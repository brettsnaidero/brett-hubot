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

   // What is your fave
   robot.respond(/what is your favorite (.*)/, function(msg) {
     var fav;
     fav = msg.match[1];
     console.log(fav);

     if (fav.length > 1) {
       switch (fav) {
         case "food":
           return msg.reply("I'm a robot--I don't eat food!");
           break;
         case "band":
           return msg.reply("It's gotta be Daft Punk!");
           break;
         case "programming language":
           return msg.reply("Javascript, of course!");
           break;
         default:
           return msg.reply("I don't have a favorite " + fav + ". What's yours?");
       }
     } else {
       switch (fav) {
         case "food":
           return msg.reply("I'm a robot--I don't eat food!");
           break;
         case "band":
           return msg.reply("It's gotta be Daft Punk!");
           break;
         case "programming language":
           return msg.reply("Javascript, of course!");
           break;
         default:
           return msg.reply("I don't have a favorite " + fav + ". What's yours?");
       }
     }

   });

}
