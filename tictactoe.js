//Store the players turn
let currentPlayer = "x";

//Check Status of Game, whether the game is finished or still in play
let gameStatus = "Game On";

//Fetch all Box elements
const boxes = document.getElementsByClassName("box");

//For Loop to loop through every element
      for (let i = 0; i < boxes.length; i++) {
        //event listener for every box;
          boxes[i].addEventListener("click", function() {
        //Sees if the box has 'X' or 'O' in it, and checks to see if game is still running
          if (boxes[i].innerHTML.trim() == "" && gameStatus == "Game On") {
        //Whatever box is selected, adds an 'X' or 'O' depending on current player's turn
              boxes[i].innerHTML = currentPlayer;

      //Switch Player Turn
      currentPlayer = currentPlayer == "x" ? "o" : "x";

      //After First Player makes their turn, this switches the text display to the next Player's turn
      document.getElementById(
        "player"
      ).innerHTML = currentPlayer.toUpperCase();

      //Check 3 matching 'X's or 'O's in their spaces whether it be a Column, Row, or Diagonally
      if (
        boxes[0].innerHTML == boxes[1].innerHTML &&
        boxes[1].innerHTML == boxes[2].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        displayWinner(0, 1, 2);
      } else if (
        boxes[3].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[5].innerHTML &&
        boxes[3].innerHTML.trim() != ""
      ) {
        displayWinner(3, 4, 5);
      } else if (
        boxes[6].innerHTML == boxes[7].innerHTML &&
        boxes[7].innerHTML == boxes[8].innerHTML &&
        boxes[6].innerHTML.trim() != ""
      ) {
        displayWinner(6, 7, 8);
      } else if (
        boxes[0].innerHTML == boxes[3].innerHTML &&
        boxes[3].innerHTML == boxes[6].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        displayWinner(0, 3, 6);
      } else if (
        boxes[1].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[7].innerHTML &&
        boxes[1].innerHTML.trim() != ""
      ) {
        displayWinner(1, 4, 7);
      } else if (
        boxes[2].innerHTML == boxes[5].innerHTML &&
        boxes[5].innerHTML == boxes[8].innerHTML &&
        boxes[2].innerHTML.trim() != ""
      ) {
        displayWinner(2, 5, 8);
      } else if (
        boxes[0].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[8].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        displayWinner(0, 4, 8);
      } else if (
        boxes[2].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[6].innerHTML &&
        boxes[2].innerHTML.trim() != ""
      ) {
        displayWinner(2, 4, 6);
      }
    }
  });
}

//Reset Game
document.getElementById("reset").addEventListener("click", function() {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
        boxes[i].style.backgroundColor = "#dee9ec";
        boxes[i].style.color = "black";
      }
      currentPlayer = "x";
      document.getElementById("message").style.display = "none";
      document.getElementById("player").innerHTML = "X";
      gameStatus = "Game On";
});

//Show Winner
function displayWinner(x, y, z) {
      boxes[x].style.background = "#0d8b70";
      boxes[x].style.color = "white";
      boxes[y].style.background = "#0d8b70";
      boxes[y].style.color = "white";
      boxes[z].style.background = "#0d8b70";
      boxes[z].style.color = "white";
      document.getElementById("winner").innerHTML =
        currentPlayer == "x" ? "O" : "X";
      document.getElementById("message").style.display = "block";
      gameStatus = "Game Over";
}