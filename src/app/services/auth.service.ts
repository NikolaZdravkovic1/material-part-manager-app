import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = "https://part-manager-app-default-rtdb.europe-west1.firebasedatabase.app/";
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.autoLogin();
  }

  login(globalId: string, password: string) {
    return this.http.get(`${this.baseUrl}/login.json`, {
      params: { globalId }  // Assuming globalId is unique, filtering users by globalId
    }).pipe(
      catchError(error => {
        return throwError(() => new Error('Invalid credentials or network error'));
      }),
      switchMap((users: any) => {
        // First, check if the response is not null or undefined
        if (!users) {
          return throwError(() => new Error('No users found'));
        }
        
        // Now find the user by globalId
        const userKey = Object.keys(users).find(key => users[key].globalId === globalId);
        
        if (!userKey) {
          return throwError(() => new Error('Invalid globalId'));
        }

        const user = users[userKey];

        if (user.password === password) {
          // Successful login
          this.userSubject.next(user);
          return of(user);
        } else {
          return throwError(() => new Error('Invalid password'));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  autoLogin() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userSubject.next(JSON.parse(userData));
    }
  }
}