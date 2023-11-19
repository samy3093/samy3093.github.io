import { Component, OnInit } from '@angular/core';

interface Card {
  id: number;
  value: string;
  flipped: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  cards: Card[] = [];
  selectedCards: Card[] = [];
  moves: number = 0;

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const allCards: Card[] = [];

    // Duplicate values to create matching pairs
    for (let i = 0; i < values.length; i++) {
      allCards.push({ id: i * 2, value: values[i], flipped: false });
      allCards.push({ id: i * 2 + 1, value: values[i], flipped: false });
    }

    // Shuffle the cards
    this.cards = this.shuffleArray(allCards);
  }

  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  onCardClick(card: Card): void {
    if (card.flipped || this.selectedCards.length === 2) {
      return;
    }

    card.flipped = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      this.moves++;
      setTimeout(() => {
        this.checkForMatch();
      }, 1000);
    }
  }

  checkForMatch(): void {
    const [card1, card2] = this.selectedCards;

    if (card1.value === card2.value) {
      card1.flipped = true;
      card2.flipped = true;
    } else {
      card1.flipped = false;
      card2.flipped = false;
    }

    this.selectedCards = [];

    // Check for game completion
    if (this.cards.every(card => card.flipped)) {
      alert(`Congratulations! You won in ${this.moves} moves.`);
      this.initializeGame();
      this.moves = 0;
    }
  }
}
