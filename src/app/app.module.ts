import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";


import { PowersModule } from "./powers/powers.module";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, FormsModule, PowersModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
}) export class AppModule {}
