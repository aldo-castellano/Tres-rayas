
let computer = false
const gameSpace = document.querySelectorAll('.game-space')
let turn = 1;
let x = [];
let o = [];

let player = event => {

    event.preventDefault()

    document.querySelector(".none").classList.remove("none");
    document.querySelector(".start").classList.add("none");
    const playerOne = document.querySelector(".playerOne");

    ((playerOne === event.target) ? computer = true : null);

}
let print = (event, valuePrint) => {

    event.classList.add(`${valuePrint}`);

}

let printWiner = (winner) => {
    turn = null;
    console.log(`gano ${winner}`);
    // window.addEventListener('click', () => {
    //     gameSpace.forEach(e => {
    //         e.classList.remove('x')
    //         e.classList.remove('o')
    //     })
    // })
}

const gameLogic = (event) => {

    let testOX = /[o,x]/.test(event.target.attributes.class.value);

    if (computer === true && testOX === false) {

        print(event.target, "x");
        x.push(parseInt(event.target.attributes.id.value));
        winner(x) ? printWiner("x") : computerTurn();


    }
    else if (computer === false && turn === 1 && testOX === false) {

        print(event.target, "x");
        x.push(parseInt(event.target.attributes.id.value));
        winner(x) ? printWiner("x") : turn += 1;;


    }
    else if (turn === 2 && testOX === false) {
        print(event.target, "o");
        o.push(parseInt(event.target.attributes.id.value));
        winner(o) ? printWiner("o") : turn -= 1;



    }
}

const winner = (arr) => {


    if (arr.includes(0) && arr.includes(1) && arr.includes(2) || arr.includes(3) && arr.includes(4) && arr.includes(5) || arr.includes(6) && arr.includes(7) && arr.includes(8)) {

        return true
    } else if (arr.includes(0) && arr.includes(3) && arr.includes(6) || arr.includes(1) && arr.includes(4) && arr.includes(7) || arr.includes(2) && arr.includes(5) && arr.includes(8)) {

        return true
    } else if (arr.includes(0) && arr.includes(4) && arr.includes(8) || arr.includes(2) && arr.includes(4) && arr.includes(6)) {

        return true
    }
    return false

}


let computerTurn = () => {

    for (let i = 0; i < gameSpace.length; i++) {
        let random = Math.floor((Math.random() * gameSpace.length - 1) + 0);
        let randomBoxValue = gameSpace[random];

        if ((/[o,x]/.test(randomBoxValue.attributes.class.value)) === false) {
            print(randomBoxValue, "o");
            o.push(parseInt(randomBoxValue.attributes.id.value));
            winner(o) ? printWiner("o") : null;
            return
        }
    }


}



