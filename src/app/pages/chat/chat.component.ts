import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public message!: string;
  public response!: string;
  public isLoading: boolean = false;

  constructor(private chatService: ChatService) {

  }

  public sendMessage() {
    this.isLoading = true;
    this.chatService.sendMessage(this.message).subscribe(
      (response: any) => {
        const choices = response.choices;
        if (choices && choices.length > 0) {
          this.response = choices[0].text;
          this.isLoading = false;
        } else {
          this.response = 'Não foi possível gerar uma resposta.';
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
