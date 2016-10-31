import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { CardComponent } from './card.component'

@NgModule({
    declarations: [CardComponent],
    exports: [CardComponent]
}) export class PowersModule { }