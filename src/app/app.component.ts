import { Component } from '@angular/core';

import { CharacterComponent } from './character/character.component';
import { PowersComponent } from "./powers/powers.component";

export const def = 'char'
export const pages: any = [
    {
        name: 'Character',
        path: 'char',
        component: CharacterComponent
    },
    {
        name: 'Powers',
        path: 'pow',
        component: PowersComponent
    }
]

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
}) export class AppComponent {
    public pages = pages
}