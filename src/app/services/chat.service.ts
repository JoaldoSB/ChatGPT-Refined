import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  private apiKey = '';//falta colocar a chave da API ChatGPT

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.apiKey}`
  });

  private maxTokens = 2000;
  private temperature = 0.7;

  constructor(private http: HttpClient) { }

  public sendMessage(message: string): Observable<any> {
    const data = {
      prompt: message,
      max_tokens: this.maxTokens,
      temperature: this.temperature
    };
    return this.http.post(`${this.apiUrl}`, data, { headers: this.headers });
  }
}
