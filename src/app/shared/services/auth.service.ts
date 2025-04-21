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

    Login(payload: User) {
        return this.http.post<Response>(`${this.apiUrl}/login`, payload).toPromise();
    }
    Signup(payload: User) {
        return this.http.post<Response>(`${this.apiUrl}/signup`, payload).toPromise();
    }
    Logout(ID: User) {
        return this.http.get<Response>(`${this.apiUrl}/logout?ID=${ID}`).toPromise();
    }
    ForgetPassword(Email: string) {
        return this.http.get<Response>(`${this.apiUrl}/forgetpassword?Email=${Email}`).toPromise();
    }
}