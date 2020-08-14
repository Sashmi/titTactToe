const ticTacToe = new TicTacToe();
ticTacToe.start();

function TicTacToe(){
   const board = new Board();
   const humanplayer = new  Humanplayer(board);
   const computerplayer = new Computerplayer(board);
   let count=0;
  this.start = function(){
    const config = {childList:true};
    const observer = new MutationObserver(()=>takeTurn());
    board.positions.forEach((i) => observer.observe(i,config));
    takeTurn();
  }

  function takeTurn(){
   if(board.checkWinner()){
    return winner;
    }

     if(count%2===0){
       humanplayer.takeTurn();
     }
     else{
       computerplayer.takeTurn();
     }
    count++;
  }
}

function Board(){
  this.positions = Array.from(document.querySelectorAll('.col'));

 this.checkWinner = function(){
    let winner = false;
    const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    const positions = this.positions;

  winningCombinations.forEach((winningCombo) =>{
      const pos_0 = positions[winningCombo[0]].innerText;
      const pos_1 = positions[winningCombo[1]].innerText;
      const pos_2 = positions[winningCombo[2]].innerText;
      const isWinningCombo = pos_0!=='' &&
        pos_0 === pos_1 && pos_1 === pos_2;

     if(isWinningCombo){
      winner = true;
      winningCombo.forEach((index)=>{
        positions[index].className += 'winner';
      })
    }
    });
    return winner;
  }

}
function Humanplayer(board){
   this.takeTurn = function(){
     board.positions
        .forEach(i => i.addEventListener('click',handleTurnTaken));
   }

   function handleTurnTaken(event){
     event.target.innerText = 'X';
     board.positions
        .forEach(i => i.removeEventListener('click',handleTurnTaken));
   }
}
function Computerplayer(board){
   this.takeTurn = function(){
     const availablePos =
       board.positions.filter((p) => p.innerText==='');
    const move = Math.floor(Math.random()*availablePos.length);
    availablePos[move].innerText = 'O';
   }
}
