import { Component } from '@angular/core';
const ipcRenderer = require('electron').ipcRenderer;

@Component({
  moduleId: module.id,
  selector: 'my-character',
  templateUrl: 'character.component.html',
})

export class CharacterComponent {

  public abilityScores: Object[] = [
    {title: "Str", description: "Strength"},
    {title: "Con", description: "Constitution"},
    {title: "Dex", description: "Dexterity"},
    {title: "Int", description: "Intelligence"},
    {title: "Wis", description: "Wisdom"},
    {title: "Cha", description: "Charisma"}
  ];

  public defenses: Object[] = [
    {title: "AC", description: "Armor class"},
    {title: "Fort", description: "Fortitude"},
    {title: "Ref", description: "Reflex"},
    {title: "Will", description: "Will"}
  ];

  public characterHeader: Object[] = [
    {title: "Character Name", column: "col-md-3"},
    {title: "Level", column: "col-md-1"},
    {title: "Race", column: "col-md-3"},
    {title: "Gender", column: "col-md-2"},
    {title: "Alignment", column: "col-md-3"},
    {title: "Class", column: "col-md-4"},
    {title: "Paragon", column: "col-md-4"},
    {title: "Destiny", column: "col-md-4"}
  ];

  constructor() {
    ipcRenderer.on("reply", (event, arg) => {
      console.log("Reply was " + arg);
    });
  }

  public test(): void {
    console.log("Getestet");
    ipcRenderer.send("message", "tested");
  }

}
