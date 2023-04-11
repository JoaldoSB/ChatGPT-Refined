import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = '';//chve API
  private apiKey = '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';

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.apiKey}`
  });

  private maxTokens = 300;
  private temperature = 0.7;

  constructor(private http: HttpClient) { }

  public sendMessage(message: string): Observable<any> {
    const data = {
      prompt: message,
      max_tokens: this.maxTokens,
      temperature: this.temperature
    };
    return this.http.post<any>(`${this.apiUrl}`, data, { headers: this.headers });
  }
}

