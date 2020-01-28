import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  //players = ['ATB', 'BLB', 'JNB']


  players: any;

  name = 'Superbowl Grid Gen';

  squaresFilled = 0;
  fillAttempts = 0;

  playerIndex = 0;

  squares: any;

  constructor(){
    this.InitizlizeArray();
  }

  InitizlizeArray(){
     var rows = 10
     var cols = 10
     this.squares = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => "")
    );

    this.players = [
    {name: "ATB", spots: 0},
    {name: "BLB", spots: 0},
    {name: "JNB", spots: 0},
    ];

    this.playerIndex = Math.floor(Math.random() * 3);
  }

  FillSquares(){
    this.InitizlizeArray();
    this.squaresFilled = 0;
    this.fillAttempts = 0

    console.log("about to enter loop...");
    for (var i = 0; i < 100000; i++)
    {
      //console.log("Filling square try#" + i);
      this.FillRandomSquare();

      if(this.squaresFilled == 100) break;
    }
  }

  FillRandomSquare()
  {
    this.fillAttempts ++;
    let r1 = Math.random();
    let r2 = Math.random();

    let rand1 = Math.floor(r1 * 10);
    let rand2 = Math.floor(r2 * 10);

    let square = this.squares[rand1][rand2];
    let player = this.players[this.playerIndex];

    if (square == "")
    {
      console.log("Filling " + rand1 + "," + rand2 + " with " + player);
      this.squares[rand1][rand2] = player.name;
      player.spots ++;
      this.squaresFilled ++;

      this.playerIndex++;
      if(this.playerIndex > this.players.length - 1)
      {
        this.playerIndex = 0;
      }
    }
    else  
    {
      //console.log("Cell occupied");
    }  
  }

  GetRandomPlayer(){
    var rand = this.players[Math.floor(Math.random() * this.players.length)];

    return "";//rand;

  }
}
