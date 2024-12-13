import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Superviseur } from '../models/Superviseur';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginModel  | null>;
  public currentUser: Observable<LoginModel | null>;
  private apiUrl = 'http://localhost:8080/api/auth'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginModel | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginModel | null {
    return this.currentUserSubject.value;
  }

  async login(credentials: { username: string; password: string }): Promise<boolean> {
    try {
        const user = await this.http.post<LoginModel>(`${this.apiUrl}/login`, credentials)
        .toPromise();
      
      if (user && user.data && user.data.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error('Identifiants incorrects');
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }


}
