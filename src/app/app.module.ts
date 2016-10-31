import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";


import { CharacterModule } from './character/character.module';

@NgModule({
  imports: [BrowserModule, FormsModule, CharacterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
