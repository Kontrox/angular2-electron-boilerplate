import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { CharacterComponent } from "./character.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [CharacterComponent],
  bootstrap: [CharacterComponent]
})
export class CharacterModule {}
