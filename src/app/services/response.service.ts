import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private apiUrl = 'http://localhost:8080/plan';

  constructor(private http: HttpClient) { }

  saveResponse(response: string) {
    return this.http.post(this.apiUrl, { text: response });
  }
}
