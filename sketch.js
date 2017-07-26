var button1;
var button2;
var button3;
var button4;
var choice = [];
var menuCounter = 1;
var color1;
var color2;

function setup() {
    createCanvas(720, 400);
    color2 = color(255, 0, 0);
    color1 = color(255, 183, 0);
    button1 = new Bubble(130, 150, color1);
    button2 = new Bubble(550, 150, color2);

    button3 = new Bubble(130, 150, color1);
    button4 = new Bubble(550, 150, color2);
}

function draw() {
    background(255);
    if (menuCounter == 1) {
        menu();
    } else if (menuCounter == 2) {
        menu2();
    }else{
      noCanvas();
      noLoop();
      menu3();
    }
}

function Bubble(x, y, col, str) {
    this.str = 0;
    this.x = x;
    this.y = y;
    this.col = col;
    this.str = str;
    this.r = 48;

    this.display = function () {
        fill(this.col);
        ellipse(this.x, this.y, this.r, this.r);
    }

    this.hover = function (xx, yy) {
        return (dist(xx, yy, this.x, this.y) < this.r);
    }

    this.report = function (xx, yy) {
        text('val=' + this.str, xx, yy);
    }

    this.clicked = function (pick) {
        if (pick === 'O') {
            this.str = 'O';
        } else if (pick === 'X') {
            this.str = 'X';
        } else {
            this.str = pick;
        }
        choice.push(this.str);
        console.log(choice);
        if (this.hover(mouseX, mouseY)) {
            this.col = color(227, 70, 27);
            menuCounter++;
        }
    }
}

function menu() {

    button1.display();
    button2.display();

    textSize(25);
    fill(color1);
    textAlign(RIGHT);
    text("PLAY-", 70, 30);
    textAlign(CENTER);
    text("ER-", 70, 50);
    textAlign(LEFT);
    textSize(30);
    text("O", 70, 80);

    textSize(25);
    fill(color2);
    textAlign(RIGHT);
    text("PLAY-", 500, 30);
    textAlign(CENTER);
    text("ER-", 500, 50);
    textAlign(LEFT);
    textSize(30);
    text("X", 500, 80);

}

function menu2() {

    button3.display();
    button4.display();
    //button3.clicked("multiPlay");
    //button4.clicked("singlePlay");

    textSize(20);
    fill(color1);
    textAlign(RIGHT);
    text("SELECT-", 100, 30);
    textAlign(CENTER);
    text("MULTI-", 100, 50);
    textAlign(LEFT);
    text("PLAYER", 100, 80);

    textSize(20);
    fill(color2);
    textAlign(RIGHT);
    text("SELECT-", 500, 30);
    textAlign(CENTER);
    text("SINGLE-", 500, 50);
    textAlign(LEFT);
    text("PLAYER", 500, 80);
}

function menu3() {
    $('body').append(
    "<h1>TicTacToe!</h1>"+
    "<div id = 'row1'>"+
      "<button id='one'></button>"+
      "<button id='two'></button>"+
      "<button id='three'></button>"+
    "</div>"+
    "<div id = 'row'>"+
      "<button id='four'></button>"+
      "<button id='five'></button>"+
      "<button id='six'></button>"+
    "</div>"+
    "<div id = 'row3'>"+
      "<button id='seven'></button>"+
      "<button id='eight'></button>"+
      "<button id='nine'></button>"+
       "</div>");

  function TicTacToe(){
    var self = this;
    /*Universal aspects that are included in single and multiplayer*/
    self.board = [0,1,2,
                  3,4,5,
                  6,7,8];
    self.counter = 0;
    self.winCondition = function (player){
     if (   (self.board[0] == player && self.board[1] == player && self.board[2] == player) ||
            (self.board[3] == player && self.board[4] == player && self.board[5] == player) ||
            (self.board[6] == player && self.board[7] == player && self.board[8] == player) ||
            (self.board[0] == player && self.board[3] == player && self.board[6] == player) ||
            (self.board[1] == player && self.board[4] == player && self.board[7] == player) ||
            (self.board[2] == player && self.board[5] == player && self.board[8] == player) ||
            (self.board[0] == player && self.board[4] == player && self.board[8] == player) ||
            (self.board[2] == player && self.board[4] == player && self.board[6] == player)){
            return true;
        } else {
            return false;
        }
    }
    self.reset = function(){
        console.log("We're re-starting the game now...");
        $("#one").replaceWith("<button id=one></button>");
        $("#two").replaceWith("<button id=two></button>");
        $("#three").replaceWith("<button id=three></button>");
        $("#four").replaceWith("<button id=four></button>");
        $("#five").replaceWith("<button id=five></button>");
        $("#six").replaceWith("<button id=six></button>");
        $("#seven").replaceWith("<button id=seven></button>");
        $("#eight").replaceWith("<button id=eight></button>");
        $("#nine").replaceWith("<button id=nine></button>");
        self.board = [0,1,2,
                      3,4,5,
                      6,7,8];
        self.counter = 0;
      }/*Reset Game*/

    /*Functionality so we can insert Xs and Os onclick*/
    self.Computer = function(huPlayer,aiPlayer){
      console.log(aiPlayer);


      var bestSpot = minmax(self.board,aiPlayer);

      function minmax(newBoard,player){
      //call to check available spaces;
      function emptySpaces(board){
        return  board.filter(function(s){
          return s!= "O" && s!= "X";
        })
      }
      //board emptySpaces update;
      var availableSpots = emptySpaces(newBoard);

      //base case;
      if (self.winCondition(huPlayer)){
         return {score:-10};
      }
      else if (self.winCondition(aiPlayer)){
        return {score:10};
      }
      else if (availableSpots.length === 0){
        return {score:0};
      }
      var moves = [];

      //Keep going until there are no moves left aka availableSpots;
      for(var i = 0; i < availableSpots.length; i++){
        var move = {};
        move.index = newBoard[availableSpots[i]];
        //Fill each i scenario with unique i move for player;
        newBoard[availableSpots[i]] = player;
        if(player == aiPlayer){
          var result = minmax(newBoard,huPlayer);
          move.score = result.score;
        }
        else{
          var result = minmax(newBoard, aiPlayer);
          move.score = result.score;
        }

        newBoard[availableSpots[i]] = move.index;

        moves.push(move);

      }//every scenario i for loop;
      var bestMove;
      if(player === aiPlayer){
        var bestScore = -10000;
        for(var i = 0; i < moves.length;i++){
          if(moves[i].score > bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }else{
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
          if(moves[i].score < bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
      return moves[bestMove];
    }//close minmax

    //write code that updates optimal move into realTime board now;
    self.board[bestSpot.index] = aiPlayer;//make play
    console.log(bestSpot);
    self.counter++;//count turn
    computer();//graphic part

    function computer(){
      var relation = {0:"one",1:"two",2:"three",
                      3:"four",4:"five",5:"six",
                      6:"seven",7:"eight",8:"nine"};
      var holdId = relation[bestSpot.index];
      var elementid = "#"+holdId;
      $(elementid).replaceWith("<button class='replaceX' id = " + holdId +  "> " + aiPlayer + "</button>");

      }
  }//close self.Computer

    self.playerTurn = function(elementid,holdId,singlePlayer){
      var player1;
      var player2;

      if(choice[0]==='O'){
        player1 = 'O';
        player2 = 'X';
      }else{
          player1 = 'X';
          player2 = 'O';
      }
      function player(choice){
        $(elementid).replaceWith("<button class='replace"+choice+ "'" + "+ id = " + holdId +  ">" + choice + "</button>");
       }
        function play(player){
          if(elementid === '#one'){
            self.board[0] = player;
          }
          if(elementid == "#two"){
            self.board[1] = player;
          }
          if(elementid == "#three"){
            self.board[2] = player;
          }
          if(elementid == "#four"){
            self.board[3] = player;
          }
          if(elementid == "#five"){
            self.board[4] = player;
          }
          if(elementid == "#six"){
            self.board[5] = player;
          }
          if(elementid == "#seven"){
            self.board[6] = player;
          }
          if(elementid == "#eight"){
            self.board[7] = player;
          }
          if(elementid == "#nine"){
            self.board[8] = player;
          }
        }
        //O always goes first no matter what because of this part;
    if(self.counter % 2 === 0) {
        play(player1);
        player(player1);
    }else if(self.counter % 2 ===1){
      play(player2);
      player(player2);
    }
    /*counter->move player turn*/
    console.log(self.counter);
    console.log(self.board);
    self.counter++;
    }/*END self.playerTurn*/

  }/*END of TicTacToe object*/
  /*---------------------Start of object Manipulation-----------------------*/
  var game = new TicTacToe();//create TicTacToe
    start();
    function start(){
      if(choice[1]==='singlePlay'){
        var singlePlayer = true;
      }else if(choice[1]==='multiPlay'){
        var singlePlayer = false;
      }

    //single v.multiplayer;
      var elementid;
      var holdId;

      $("button").click(function(){
      elementid = "#"+this.id;
      holdId = this.id;
      game.playerTurn(elementid,holdId,singlePlayer);
      if(singlePlayer){
        if(choice[0]==='O'){
          game.Computer(choice[0],'X');
        }else{
          game.Computer(choice[0],'O');
        }
      }

      //check if somone won;
      if(game.winCondition('X')){
        alert('X wins the game!')
        game.reset();
        start();
      }else if(game.winCondition('O')){
        alert('O wins the game!');
        game.reset();
        start();
      }else if(game.counter===8){
            alert('Draw');
            game.reset();
            start();
          }
      });//close click event


    }//close start
}

function mousePressed() {
    if (menuCounter == 1) {
        if (button1.hover(mouseX, mouseY)) {
            button1.clicked('O');
        }
        if (button2.hover(mouseX, mouseY)) {
            button2.clicked('X');
        }
    } else if (menuCounter == 2) {
        if (button3.hover(mouseX, mouseY)) {
            button3.clicked('multiPlay');
        }
        if (button4.hover(mouseX, mouseY)) {
            button4.clicked('singlePlay');
        }
    }

}
