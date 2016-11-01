import { Input, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'card',
  templateUrl: 'card.component.html'
})
export class CardComponent {
  @Input()
  private _name: string
  public level: string

  constructor() {
  }

  set card(card: Card) {
    this._name = card.name
  }

  set name(newName: string) {
    this._name = newName;
  }

  get name() {
    return this._name;
  }
}

export interface Card {
  name: string
}