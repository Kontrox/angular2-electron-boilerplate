import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { CardComponent } from './card.component'
import { PowersComponent } from './powers.component'

@NgModule({
    declarations: [CardComponent, PowersComponent],
    exports: [PowersComponent]
}) export class PowersModule { }