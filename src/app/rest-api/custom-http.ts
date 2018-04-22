import { Observable } from 'rxjs/Observable';
import { KeycloakApiService } from '../keycloak/keycloak-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CustomHttp {

  private apiBaseUrl = `Your API Endpoint`;

  constructor(public httpClient: HttpClient, public keycloakAPi: KeycloakApiService) { }

  get<T>(url: string): Observable<T> {
    return this.keycloakAPi.updateToken()
      .map(token => this.createHeaders(token))
      .flatMap(headers => this.httpClient.get<T>(this.getUrl(url), { headers }));
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.keycloakAPi.updateToken()
      .map(token => this.createHeaders(token))
      .flatMap(headers => this.httpClient.put<T>(this.getUrl(url), data, { headers }));
  }

  private getUrl(url: string) {
    return `${this.apiBaseUrl}${url}`;
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }
}
