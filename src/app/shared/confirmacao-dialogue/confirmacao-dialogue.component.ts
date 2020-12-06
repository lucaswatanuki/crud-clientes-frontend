import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmacao-dialogue',
  templateUrl: './confirmacao-dialogue.component.html',
  styleUrls: ['./confirmacao-dialogue.component.scss']
})
export class ConfirmacaoDialogueComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmacaoDialogueComponent>) { }

  public mensagem: string;

}
