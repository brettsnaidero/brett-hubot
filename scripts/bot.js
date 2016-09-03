module.exports = function(robot) {

    let doorImages = [
      'http://math.ucsd.edu/~crypto/Monty/images/door1.jpg',
      'http://math.ucsd.edu/~crypto/Monty/images/door2.jpg',
      'http://math.ucsd.edu/~crypto/Monty/images/door3.jpg',
    ];

    // Hi
    robot.hear(/(Hello|Hi|Help)/, function(res) {
      return res.send("Hi! I'm a Monty Hall problem simulator! Would you like to play? (Y/N)");
    });

    // Hi
    robot.hear(/Door please/, function(res) {
      return res.send( doorImages[1] );
    });

    // Is it a weekend?
    robot.respond(/is it a (weekend|holiday)\s?\?/i, function(msg){
        let today = new Date();

        return msg.send(
          today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO"
        );
    });

    // Monty Hall
    // Variables to keep track of score
    let numWin = 0;
    let numLoss = 0;
    let ratioValue = 0;


    // Game Variables
    let inGame = false;
    let currentTurn = 0;


    // Object for the doors
    let doors = [];

    // Put the car behind a random door
    let carDoor = (Math.random() * 3) + 1;
    doors[carDoor] = 'A new car!';

    // Put goats behind the remaining doors
    let i = 0;
    while (i < 4) {
      if (i != carDoor) {
        doors[i] = 'An old goat!';
      };
    };

    // Separate array for which doors are open
    let openDoors = [
      false,
      false,
      false
    ];

    robot.respond(/Door (.*)/i, function(msg) {
      let memoryAnswer = msg.match[1];

      let response = firstTurn(memoryAnswer);

      currentTurn++;

      return msg.reply("Cool, I'll remember that for you.");
      return msg.reply("Cool, I'll remember that for you.");
    });

    // First turn, get user choice and open a door
    function firstTurn(userChoice) {
      // Number between 1 & 3 taken by bot
      let userChoice = 1;

      // Choose a remaining door that doesn't have the car behind it
      let openDoor =  Math.floor(Math.random() * 3);
      while(openDoor == userChoice || openDoor == carDoor){
        openDoor = Math.floor(Math.random() * 3);
      };

      return
    }

    function secondTurn(userChoice) {
      //
      let response ="Now would you like to switch from the door you originally picked?";

      // If user says yes, then choose the other door
      if (switchChoice === true) {

      }
    }

    // Open the door
    function openTheDoor() {
      // Open the door...
      openDoors[userChoice] = true;
      // ...and see what's inside
      let outcome = doors[userChoice];
    }

}
