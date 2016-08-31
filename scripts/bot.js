module.exports = function(robot) {

  // Hi
  robot.hear(/Hello!/, function(res) {
    return res.send("Hi! I'm a note-taking app.");
  });

  // Is it a weekend?
  robot.respond(/is it a (weekend|holiday)\s?\?/i, function(msg){
      var today = new Date();

      return msg.send(
        today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO"
      );
  });

   // Remember this please app
   let listOfThings = [];

   robot.respond(/Can you please remember this\? (.*)/i, function(msg) {
     let memoryAnswer = msg.match[1];
     listOfThings.push(memoryAnswer);

     return msg.reply("Cool, I'll remember that for you.");
   });

   // Remind me
   robot.respond(/Can you please remind me of the things\?/, function(msg) {

     // Make it nice to read
     let listRemind = listOfThings.map(something => {
       return something;
     });

     return msg.reply("Yep! Here you go: " + listRemind);
   });

   // Remind me specific
   robot.respond(/What was number (.*)\?/i, function(msg){
     let memoryAnswer = msg.match[1].parseInt();

     if (memoryAnswer > listOfThings.length) {
       return msg.reply("Sorry, there's only " + listOfThings.length + " items in my memory.");
     } else {
       return msg.reply(listOfThings[memoryAnswer]);
     }
   });

   // How many things
   robot.respond(/How many things are you remembering\?/i, function(msg){
     if (listOfThings.length === 0) {
       return msg.reply("Nothing");
     } else {
       return msg.reply(listOfThings.length + " things.");
     }
   });

}
