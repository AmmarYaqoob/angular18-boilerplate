import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/user.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.api.endpoint}auth`;

    constructor(private http: HttpClient) { }

    login(payload: User) {
        return this.http.post<Response>(`${this.apiUrl}/login`, payload).toPromise();
    }
    signup(payload: User) {
        return this.http.post<Response>(`${this.apiUrl}/signup`, payload).toPromise();
    }
    logout(User_ID: User) {
        return this.http.get<Response>(`${this.apiUrl}/logout?User_ID=${User_ID}`).toPromise();
    }
}