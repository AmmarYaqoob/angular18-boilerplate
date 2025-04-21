import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Response } from '../interfaces/response.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = `${environment.api.endpoint}users`;

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<Response>(`${this.apiUrl}`).toPromise();
    }
    getbyid(ID: number) {
        return this.http.get<Response>(`${this.apiUrl}/${ID}`).toPromise();
    }
    add(MemberObj: User) {
        return this.http.post<Response>(`${this.apiUrl}/`, MemberObj).toPromise();
    }
    update(MemberObj: User) {
        return this.http.put<Response>(`${this.apiUrl}`, MemberObj).toPromise();
    }
    delete(ID: Number) {
        return this.http.delete<Response>(`${this.apiUrl}/${ID}`).toPromise();
    }
}