"use strict"
let computer = false;
const gameSpace = document.querySelectorAll(".game-space");
let divWinner = document.querySelector(".winner");
let turn = 1;
let pacMan = [];
let ghost = [];

/* add css class with display none to the player number selection page and remove it from the game board. select the number of players
*@param event{object}
*/

let player = event => {
    const start = document.querySelector(".start");
    const none = document.querySelector(".none");
    const playerOne = document.querySelector(".playerOne");

    none.classList.remove("none");
    start.classList.add("none");

    ((playerOne === event.target) ? computer = true : null);
    event.preventDefault();
}

/* print pacman or ghost elements in DOM
*@param event{object}, valuePrint{string}
*/

let print = (event, valuePrint) => {
    event.classList.add(`${valuePrint}`);
    if (valuePrint.includes("x")) {
        let pacMan = document.createElement("div");
        pacMan.classList.add("pac-man");
        event.appendChild(pacMan);
        pacMan.innerHTML = `<audio src="./audio/pacman_chomp.aac" autoplay=true ></audio>`;

    } else if (valuePrint.includes("o")) {
        event.innerHTML = `<div class="ghost"><div class="eyes "></div><div class="pet"></div></div><audio src="./audio/pacman_ghost.aac" autoplay=true >`;
    }

}


/* create random value on computer turn to simulate opponent
@return if the box is empty
*/


let computerTurn = () => {


    for (let i = 0; i < gameSpace.length; i++) {

        let random = Math.floor((Math.random() * gameSpace.length) + 0);
        let randomBoxValue = gameSpace[random];

        if ((/[o,x]/.test(randomBoxValue.attributes.class.value)) === false) {

            print(randomBoxValue, "o");
            ghost.push(parseInt(randomBoxValue.attributes.id.value));
            winner(ghost) ? printWinner("o", "WINNER") : null;

            return;
        }
    }


}
/* click event function that evaluates whose turn it is, if the player won
*@param event{object}
*/
const gameLogic = (event) => {

    let testOX = /[o,x]/.test(event.target.attributes.class.value);

    if (computer === true && testOX === false && turn === 1) {

        print(event.target, "x");
        pacMan.push(parseInt(event.target.attributes.id.value));
        winner(pacMan) ? printWinner("x", "WINNER") : computerTurn();

    }
    else if (computer === false && turn === 1 && testOX === false) {

        print(event.target, "x");
        pacMan.push(parseInt(event.target.attributes.id.value));
        winner(pacMan) ? printWinner("x", "WINNER") : turn++;

    }
    else if (computer === false && turn === 2 && testOX === false) {
        print(event.target, "o");
        ghost.push(parseInt(event.target.attributes.id.value));
        winner(ghost) ? printWinner("o", "WINNER") : turn--;

    }
}

/* function of an event that resets the entire game board*/
let reset = () => {
    turn = 1;
    pacMan = [];
    ghost = [];
    gameSpace.forEach(e => {
        e.classList.remove("x");
        e.classList.remove("o");
        e.innerHTML = "";
    })
    divWinner.classList.add("none");
    let deleteWinner = document.querySelector(".showing-winner");
    divWinner.removeChild(deleteWinner);

}

/* print the winner"s screen
*@param winner{string}, statement{string}
*/
let printWinner = (winner, statement) => {
    let showingWinner = document.createElement("div");
    turn = null;
    divWinner.classList.remove("none");

    showingWinner.classList.add("showing-winner");
    showingWinner.classList.add(`${winner}`);
    showingWinner.innerHTML = `${statement}`;


    if (winner === "x") {

        showingWinner.innerHTML = `<p>${statement}</p> <div class="pac-man no-index"><audio src="./audio/pacman_eatghost.aac" autoplay=true ></div>`;
    } else if (winner === "o") {
        showingWinner.innerHTML = `<p>${statement} <div class="ghost no-index"><div class="eyes "></div><div class="pet"></div></div><audio src="./audio/pacman_death.aac" autoplay=true >`;
    }

    divWinner.appendChild(showingWinner);
}
/* evaluate whether or not there is a winner
*@param arr{array of numbers}
@return true/false
*/
const winner = (arr) => {

    if (arr.includes(0) && arr.includes(1) && arr.includes(2) || arr.includes(3) && arr.includes(4) && arr.includes(5) || arr.includes(6) && arr.includes(7) && arr.includes(8)) {

        return true;
    } else if (arr.includes(0) && arr.includes(3) && arr.includes(6) || arr.includes(1) && arr.includes(4) && arr.includes(7) || arr.includes(2) && arr.includes(5) && arr.includes(8)) {

        return true;
    } else if (arr.includes(0) && arr.includes(4) && arr.includes(8) || arr.includes(2) && arr.includes(4) && arr.includes(6)) {

        return true;
    } else if ((pacMan.length + ghost.length) >= gameSpace.length) {

        printWinner("no-winner", "NADIE GANO");
    }

    return false;

}









