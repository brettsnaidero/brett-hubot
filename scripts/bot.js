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
    let openDoor = '';

    // Start game
    robot.respond(/Start/, function(res) {
      inGame = true;
      if (currentTurn == 0) {
        currentTurn = 1;
      };

      // Put the car behind a random door
      carDoor = (Math.floor(Math.random() * 3) + 1) - 1;
      doors[carDoor] = 'A new car!';

      // Put goats behind the remaining doors
      let i = 0;
      while (i < 3) {
        if (i != carDoor) {
          doors[i] = 'An old goat!';
        };
        i++;
      };

      // Separate array for which doors are open
      openDoors = [
        false,
        false,
        false
      ];

      return res.reply(
        "Welcome to the Monty Hall game! " +
        "In front of you, you see three closed doors. " +
        "Behind two of them are old goats, but behind one of them is a brand spanking new car! " +
        "All you need to do is choose the correct door to win that car. " +
        "Alrighty, choose a door between 1 and 3 (Format: 'Door #'). " +
        "http://brettsnaidero.com/assets/Uploads/doors/0-doors.png"
      );
    });


    // First turn, get user choice and open one of the other doors
    function firstTurn(userChoice) {
      // Choose a remaining door that doesn't have the car behind it
      openDoor = (Math.floor(Math.random() * 3) + 1) - 1;

      while (openDoor == userChoice || openDoor == carDoor) {
        openDoor = (Math.floor(Math.random() * 3) + 1) - 1;
      };
      openDoors[openDoor] = true;
    };

    robot.respond(/Door (.*)/i, function(msg) {
      let memoryAnswer = msg.match[1];

      memoryAnswer = parseInt(memoryAnswer);

      chosenDoor = (memoryAnswer - 1);

      if (memoryAnswer === 1 || memoryAnswer === 2 || memoryAnswer === 3) {
        firstTurn(chosenDoor);

        currentTurn++;

        return msg.reply(
          "Excellent choice! The host then proceeds to open door number " +
          (openDoor + 1) +
          ". There's a goat behind the door! " +
          "So the car is either behind your chosen door, or the other remaining closed door. " +
          "She offers you a choice: you can choose to stick with your original choice, or swap your choice to the remaining unclosed door. " +
          "Would you like to switch? (Format: 'Switch Yes/No') " +
          "http://brettsnaidero.com/assets/Uploads/doors/2-doors-" + memoryAnswer + "-" + (openDoor + 1) + ".png"
        );
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

      return msg.reply(
        switchedMessage +
        " Now let's open your door! Type 'Open' to find out if you've won. " +
        "http://brettsnaidero.com/assets/Uploads/doors/2-doors-" + (chosenDoor + 1) + "-" + (openDoor + 1) + ".png"
      );
    });




    // Open the door
    function openTheDoor() {
      // Open the door...
      openDoors[chosenDoor] = true;
      // ...and see what's inside
      if ( doors[chosenDoor] == 'An old goat!') {
        let response = "It's a goat! You lost, I'm sorry. http://brettsnaidero.com/assets/Uploads/doors/4-doors-" + (chosenDoor + 1) + "-" + carDoor +".png";
        return response;
        numLoss++; // Update losses
      } else {
        let response = "It's a neeeewwww car! You won, congratulations! http://brettsnaidero.com/assets/Uploads/doors/4-doors-" + (chosenDoor + 1) + "-" + carDoor +".png";
        return response;
        numWin++; // Update wins
      }
    };

    robot.hear(/Open/, function(msg) {
      let response = openTheDoor();

      currentTurn++;

      return msg.reply( response );

      clearScores();
    });


    // Exit the game
    robot.hear(/Exit/, function(msg) {
      return msg.reply( "Exited game." );

      clearScores();
    });

    function clearScores() {
      inGame = false;
      doors = [];
      carDoor = 0;
      openDoors = [];
      currentTurn = 0;
      chosenDoor = '';
      openDoor = '';
    }


    // Show stats

}
