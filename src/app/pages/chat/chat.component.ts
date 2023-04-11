import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public message: string = '';
  public response: string[] = [];
  public customResponseHeaders: string[] = [
    'Descrição do Plano de Negócio:',
  //  'Visão do Plano de Negócio:'
    // 'Missão do plano de negócio:',
    // 'Metas de Curto Prazo:',
    // 'Metas de Longo Prazo:',
    // 'Objetivos:',
    // 'Estratégia de Mercado:',
    // 'Projeções Financeiras:',
    // 'Tendências do Setor:',
    // 'Público-Alvo:',
    // 'Fatores Econômicos:',
    // 'potencial de Mercado:'
  ];
  public isLoading: boolean = false;

  constructor(
    private chatService: ChatService,
    private responseService: ResponseService) { }

    public sendMessage(message: string) {
      this.isLoading = true;
      const questions = [
        `crie uma descrição do plano de negócio do(a) meu(minha) ${ message }`,
      //  `crie visão do plano de negócio do(a) meu(minha) ${ message }`
      //   `crie missão do plano de negócio do(a) meu(minha) ${ message }`,
      //   `crie metas de curto prazo do(a) meu(minha) ${ message }`,
      //   `crie metas de longo prazo do(a) meu(minha) ${ message }`,
      //   `crie objetivos do plano de negócio do(a) meu(minha) ${ message }`,
      //   `crie estratégia de mercado do(a) meu(minha) ${ message }`,
      //   `crie projeções financeiras do(a) meu(minha) ${ message }`,
      //   `Quais as tendências do setor de ${ message }`,
      //   `análise público-alvo do(a) meu(minha) ${ message }`,
      //   `quais fatores econômicos irão influenciar no(a) meu(minha) ${ message }`,
      //    `Veja o potencial de mercado do plano de negócio do(a) meu(minha) ${ message }`
      //
    ];
      let currentQuestionIndex = 0;
      const processResponse = (response: any) => {
        const choices = response.choices;
        if (choices && choices.length > 0) {
          choices.forEach((choice: { text: any; }) => {
            const text = choice.text;
            this.response.push(text);
            this.responseService.saveResponse(text).subscribe(
              (response: any) => {
                console.log('Response saved successfully');
              },
              (error: any) => {
                console.error('Failed to save response', error);
              }
            );
          });
          this.isLoading = false;
          currentQuestionIndex++;
          if (currentQuestionIndex < questions.length) {
            const nextQuestion = questions[currentQuestionIndex];
            this.chatService.sendMessage(nextQuestion.trim()).subscribe(
              (response: any) => processResponse(response),
              (error: any) => {
                console.error('Failed to get response', error);
                this.isLoading = false;
              }
            );
          }
        } else {
          this.response.push('Unable to generate a response.');
        }
      };
      const initialQuestion = questions[currentQuestionIndex];
      this.chatService.sendMessage(initialQuestion.trim()).subscribe(
        (response: any) => processResponse(response),
        (error: any) => {
          console.error('Failed to get response', error);
          this.isLoading = false;
        }
      );
      this.message = '';
    }

}
