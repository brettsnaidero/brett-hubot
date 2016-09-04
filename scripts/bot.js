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

    let chosenDoor = '';

    // Start game
    robot.hear(/Start/, function(res) {
      // New game, set variables
      // function newGame() {
        // Put the car behind a random door
        carDoor = Math.floor(Math.random() * 3) + 1;

        carDoor = (carDoor - 1);

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

      return res.send( 'Welcome to the Monty Hall game! In front of you, you see three closed doors. Behind two of them are old goats, but behind one of them is a brand spanking new car! All you need to do is choose the correct door to win that car. Alrighty, choose a door between 1 and 3 (Format: "Door #").' );
    });


    // First turn, get user choice and open a door
    function firstTurn(userChoice) {
      // Choose a remaining door that doesn't have the car behind it
      let openDoor =  Math.floor(Math.random() * 3);

      while(openDoor == userChoice || openDoor == carDoor){
        openDoor = Math.floor(Math.random() * 3);
      };
      openDoors[openDoor] = true;
    };

    robot.respond(/Door (.*)/i, function(msg) {
      let memoryAnswer = msg.match[1];

      chosenDoor = memoryAnswer;

      // // Convert to number
      switch (memoryAnswer) {
        case 'One':
          memoryAnswer = 1;
          break;
        case 'Two':
          memoryAnswer = 2;
          break;
        case 'Three':
          memoryAnswer = 3;
          break;
        default:
          break;
      }
      memoryAnswer = parseInt(memoryAnswer);

      if (memoryAnswer === 1 || memoryAnswer === 2 || memoryAnswer === 3) {
        firstTurn(memoryAnswer - 1);
        currentTurn++;
        return msg.reply( "Excellent choice! The host then proceeds to open door number " + (openDoor + 1) + ". There's a goat behind the door! So the car is either behind your chosen door, or the other remaining closed door. She offers you a choice: you can choose to stick with your original choice, or swap your choice to the remaining unclosed door. Would you like to switch? (Format: 'Switch Yes/No')"  );
      } else {
        return msg.reply( "Sorry, didn't understand that." );
      }

    });





    function secondTurn(switchYesNo) {
      // If user says yes, then choose the other closed door
      if (switchYesNo === true) {
        openDoors.forEach((item, number) => {
          if (item === false && number !== chosenDoor) {
            chosenDoor = number;
          }
        });
        switchedMessage = "Successfully switched to door " + (chosenDoor + 1) + "!";
      } else {
        switchedMessage = "Stayed put!";
      }

      return switchedMessage;
    };

    robot.respond(/Switch (.*)/i, function(msg) {
      let memoryAnswer = msg.match[1];

      let switchYesNo = '';
      if (memoryAnswer === 'Yes') {
        switchYesNo = true;
      } else {
        switchYesNo = false;
      }

      let response = secondTurn(switchYesNo);

      currentTurn++;

      return msg.reply( switchedMessage + " Now let's open your door! Type 'Open' to find out if you've won." );
    });




    // Open the door
    function openTheDoor() {
      // Open the door...
      openDoors[chosenDoor - 1] = true;
      // ...and see what's inside
      if ( doors[chosenDoor - 1] == 'An old goat!') {
        return "It's a goat! You lost, I'm sorry.";
      } else {
        return "It's a neeeewwww car! You won, congratulations!";
      }
    };

    robot.hear(/Open/, function(msg) {
      let response = openTheDoor();

      currentTurn++;

      return msg.reply( response + " Thanks for playing!" );
    });

}
