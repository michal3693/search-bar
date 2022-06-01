import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  public getJsonData() {
    return this.httpClient.get<string[]>('/assets/data.json');
  }
}
