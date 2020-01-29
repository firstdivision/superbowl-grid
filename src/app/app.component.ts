import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  //players = ['ATB', 'BLB', 'JNB']


  name = 'Superbowl Grid Gen';
  squaresFilled = 0;
  fillAttempts = 0;
  playerIndex = 0;
  squares: any;
  players:  Array<Player> = [];
  pickDelay = 100;
  isFilling = false;
  stopFilling = false;
  newPlayerName = "";

  constructor(){
    this.InitizlizeArray();
  }

  InitizlizeArray(){
     var rows = 10
     var cols = 10
     this.squares = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => "")
    );

/*
    this.players = [
    {name: "ATB", spots: 0},
    {name: "BLB", spots: 0},
    {name: "JNB", spots: 0},
    ];
*/
    this.playerIndex = Math.floor(Math.random() * 3);
  }

  async FillSquares(){
    this.isFilling = true;
    this.InitizlizeArray();
    this.squaresFilled = 0;
    this.fillAttempts = 0;

    console.log("about to enter loop...");
    for (var i = 0; i < 100000; i++)
    {
      //console.log("Filling square try#" + i);
      this.FillRandomSquare();

      await this.Delay(this.pickDelay);

      if(this.squaresFilled == 100 || this.stopFilling) {
        this.isFilling = false;
        this.stopFilling = false;
        break;
      }
    }
  }

  FillRandomSquare()
  {
    this.fillAttempts ++;

    if(this.playerIndex > this.players.length - 1)
      {
        this.playerIndex = 0;
      }
      
    let r1 = Math.random();
    let r2 = Math.random();

    let rand1 = Math.floor(r1 * 10);
    let rand2 = Math.floor(r2 * 10);

    let square = this.squares[rand1][rand2];
    let player = this.players[this.playerIndex];

    if (square == "" && player)
    {
      console.log("Filling " + rand1 + "," + rand2 + " with " + player);
      this.squares[rand1][rand2] = player.name;
      player.spots ++;
      this.squaresFilled ++;

      this.playerIndex++;
    }
    else  
    {
      //console.log("Cell occupied");
    }  
  }

  RemovePlayer(index){
    this.players.splice(index, 1);
  }

  AddPlayer(){
    this.players.push({name: this.newPlayerName, spots: 0});
    this.newPlayerName = "";
  }

  GetRandomPlayer(){
    var rand = this.players[Math.floor(Math.random() * this.players.length)];

    return "";//rand;

  }

  Delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}

export class Player{
  name = "";
  spots = 0
}
