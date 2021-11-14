"use strict"
let computer = false
const gameSpace = document.querySelectorAll('.game-space');
let divWinner = document.querySelector(".winner");
let turn = 1;
let x = [];
let o = [];


let player = event => {

    event.preventDefault();
    document.querySelector(".none").classList.remove("none");
    const start = document.querySelector(".start");
    const audio = document.querySelector(".audio");

    start.classList.add("none");
    audio.play();
    audio.volume = 0.50;


    const playerOne = document.querySelector(".playerOne");



    ((playerOne === event.target) ? computer = true : null);

}
let print = (event, valuePrint) => {
    event.classList.add(`${valuePrint}`);
    if (valuePrint.includes('x')) {
        let pacMan = document.createElement('div')
        pacMan.classList.add('pac-man');
        event.appendChild(pacMan)
        pacMan.innerHTML = `<audio src="./audio/pacman_chomp.wav" autoplay=true ></audio>`
    } else if (valuePrint.includes('o')) {
        event.innerHTML = '<div class="ghost"><div class="eyes "></div><div class="pet"></div></div><audio src="./audio/pacman_ghost.wav" autoplay=true >'
    }

}

let printWinner = (winner = null, nobadyWin = "") => {
    turn = null;
    divWinner.classList.remove('none');
    let showingWinner = document.createElement('div');
    showingWinner.classList.add('showing-winner')
    showingWinner.classList.add(`${winner}`)
    showingWinner.innerHTML = `${nobadyWin}`;
    divWinner.appendChild(showingWinner)
    if (winner === 'x') {

        showingWinner.innerHTML = `<p>${nobadyWin}</p> <div class="pac-man no-index"><audio src="./audio/pacman_eatghost.wav" autoplay=true ></div>`
    } else if (winner === 'o') {
        showingWinner.innerHTML = `<p>${nobadyWin} <div class="ghost no-index"><div class="eyes "></div><div class="pet"></div></div><audio src="./audio/pacman_death.wav" autoplay=true >`
    }
}




let reset = () => {
    turn = 1;
    x = [];
    o = [];
    gameSpace.forEach(e => {
        e.classList.remove('x')
        e.classList.remove('o')
        e.innerHTML = '';
    })
    divWinner.classList.add('none');
    let deleteWinner = document.querySelector('.showing-winner')
    divWinner.removeChild(deleteWinner)



}

const gameLogic = (event) => {

    let testOX = /[o,x]/.test(event.target.attributes.class.value);

    if (computer === true && testOX === false && turn === 1) {

        print(event.target, "x");
        x.push(parseInt(event.target.attributes.id.value));
        winner(x) ? printWinner("x", "WINNER") : computerTurn();

    }
    else if (computer === false && turn === 1 && testOX === false) {

        print(event.target, "x");
        x.push(parseInt(event.target.attributes.id.value));
        winner(x) ? printWinner("x", "WINNER") : turn += 1;

    }
    else if (computer === false && turn === 2 && testOX === false) {
        print(event.target, "o");
        o.push(parseInt(event.target.attributes.id.value));
        winner(o) ? printWinner("o", "WINNER") : turn -= 1;

    }
}

const winner = (arr) => {

    if (arr.includes(0) && arr.includes(1) && arr.includes(2) || arr.includes(3) && arr.includes(4) && arr.includes(5) || arr.includes(6) && arr.includes(7) && arr.includes(8)) {

        return true
    } else if (arr.includes(0) && arr.includes(3) && arr.includes(6) || arr.includes(1) && arr.includes(4) && arr.includes(7) || arr.includes(2) && arr.includes(5) && arr.includes(8)) {

        return true
    } else if (arr.includes(0) && arr.includes(4) && arr.includes(8) || arr.includes(2) && arr.includes(4) && arr.includes(6)) {

        return true
    } else if ((x.length + o.length) >= gameSpace.length) {

        printWinner("hola", "NADIE GANO")
    }

    return false

}


let computerTurn = () => {

    for (let i = 0; i < gameSpace.length; i++) {
        let random = Math.floor((Math.random() * gameSpace.length - 0) + 0);
        let randomBoxValue = gameSpace[random];

        if ((/[o,x]/.test(randomBoxValue.attributes.class.value)) === false) {
            print(randomBoxValue, "o");
            o.push(parseInt(randomBoxValue.attributes.id.value));
            winner(o) ? printWinner("o", "WINNER") : null;

            return
        }
    }


}






