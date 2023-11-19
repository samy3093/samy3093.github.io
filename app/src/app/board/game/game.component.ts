import { Component, OnInit } from '@angular/core';

interface Mole {
  id: number;
  active: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  moles: Mole[] = [];
  score: number = 0;

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.moles = Array.from({ length: 9 }, (_, index) => ({ id: index, active: false }));
    this.startGame();
  }

  startGame(): void {
    setInterval(() => {
      this.showRandomMole();
    }, 1000);
  }

  showRandomMole(): void {
    const randomIndex = Math.floor(Math.random() * this.moles.length);
    this.moles[randomIndex].active = true;

    setTimeout(() => {
      this.moles[randomIndex].active = false;
    }, 800);
  }

  onMoleClick(mole: Mole): void {
    if (mole.active) {
      mole.active = false;
      this.score++;
    }
  }
}
