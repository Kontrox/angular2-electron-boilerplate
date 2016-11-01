import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule }   from '@angular/router';


import { CharacterModule } from './character/character.module';
import { PowersModule } from "./powers/powers.module";
import { AppComponent, pages, def} from "./app.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PowersModule,
    CharacterModule,
    RouterModule.forRoot([{ path: '', pathMatch: 'full', redirectTo: def }].concat(pages))
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
}) export class AppModule { }
