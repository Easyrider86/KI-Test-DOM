import { NgModule } from '@angular/core';

import { OpenAIComponent } from './openai.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OpenAIComponent
  ],
  imports: [
    FormsModule,
    MatCardModule
  ],
  exports: [OpenAIComponent, FormsModule],
  providers: [],
  bootstrap: []
})
export class OpenAIModule { }