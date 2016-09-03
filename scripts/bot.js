module.exports = function(robot) {

    // Hi
    robot.hear(/(Hello|Hi|Help)/, function(res) {
      return res.send("Hi! I'm a Monty Hall problem simulator! Say 'Start' to begin a new game.");
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
    let carDoor = 0;
    let openDoors = [];


    // Start game
    robot.hear(/Start/, function(res) {
      // New game, set variables
      // function newGame() {
        // Put the car behind a random door
        carDoor = Math.floor(Math.random() * 3) + 1;
        doors[carDoor] = 'A new car!';

        // Put goats behind the remaining doors
        let i = 0;
        while (i < 4) {
          if (i != carDoor) {
            doors[i] = 'An old goat!';
          };
          i++;
        };

        // // Separate array for which doors are open
        openDoors = [
          false,
          false,
          false
        ];
      // }

      return res.send( 'Alrighty, pick a door between 1 and 3 (Format: "Door #").' );
    });

    robot.respond(/Door (.*)/i, function(msg) {
      let memoryAnswer = msg.match[1];

      let response = firstTurn(memoryAnswer);

      currentTurn++;

      return msg.reply( response );
    });

    // First turn, get user choice and open a door
    function firstTurn(userChoice) {
      // Choose a remaining door that doesn't have the car behind it
      let openDoor =  Math.floor(Math.random() * 3);
      while(openDoor == userChoice || openDoor == carDoor){
        openDoor = Math.floor(Math.random() * 3);
      };

      return 'hey';
    };

    function secondTurn(userChoice) {
      //
      let response = "Now would you like to switch from the door you originally picked?";

      // If user says yes, then choose the other door
      if (switchChoice === true) {

      };
    };

    // Open the door
    function openTheDoor() {
      // Open the door...
      openDoors[userChoice] = true;
      // ...and see what's inside
      let outcome = doors[userChoice];
    };

}
