import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Response } from '../interfaces/response.interface';
import { Member } from '../interfaces/member.interface';

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    private apiUrl = `${environment.api.endpoint}members`;

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<Response>(`${this.apiUrl}`).toPromise();
    }
    getbyid(User_ID: number) {
        return this.http.get<Response>(`${this.apiUrl}/${User_ID}`).toPromise();
    }
    add(MemberObj: Member) {
        return this.http.post<Response>(`${this.apiUrl}/`, MemberObj).toPromise();
    }
    update(MemberObj: Member) {
        return this.http.put<Response>(`${this.apiUrl}/`, MemberObj).toPromise();
    }
    delete(ID: Number) {
        return this.http.delete<Response>(`${this.apiUrl}/${ID}`).toPromise();
    }
}