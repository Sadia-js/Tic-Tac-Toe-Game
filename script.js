let body = document.querySelector('.page0');
let boxes = document.querySelectorAll('.box');
let msgCont = document.querySelector('.msg-cont');
let msg = document.querySelector('#msg');
let startBtn = document.querySelector('#start-btn');
let restartBtn = document.querySelector('#restart-btn');
let exitBtn = document.querySelector('#exit-btn');
let turnX = true; // playerX, playerO
let page0 = true; //purple
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let restartBox = () => {
    turnX = true;
    enableBoxes();
    msgCont.classList.add('hide');
};

let exitBox = () => {
    if(page0){ //purple
        body.classList.add('body'); // add blue
        body.classList.remove('page0'); 
        page0 = false; // blue
    }
    // else{
    //     body.classList.remove('body'); 
    //     body.classList.add('page0'); // add purple
    //     page0 = true; //purple
    // }
    msgCont.classList.remove('hide');
};

let startBox = () => {
    if(page0 === false){ // blue
        body.classList.add('page0'); // add purple
        body.classList.remove('body');
        page0 = true;
    }
    // else{
    //     body.classList.add('body'); // add blue
    //     body.classList.remove('page0');
    //     page0 = false;
    // }
    msgCont.classList.add('hide');
};

let enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = '';
    }
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turnX){
            //playerX
            box.innerText = 'X';
            box.classList.add('x');
            box.classList.remove('y');
            turnX = false;
        }
        else{
            //playerO
            box.innerText = 'O';
            box.classList.add('y');
            box.classList.remove('x');
            turnX = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

let disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

let showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is the "Player-${winner}"`;
    msgCont.classList.remove('hide');
    disableBoxes();
};

let checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val !== '' && pos2Val !== '' && pos3Val !== ''){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

startBtn.addEventListener('click', startBox);
restartBtn.addEventListener('click', restartBox);
exitBtn.addEventListener('click', exitBox);
