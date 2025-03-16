import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Response } from '../interfaces/response.interface';
import { Roles } from '../interfaces/roles.interface';

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    private apiUrl = `${environment.api.endpoint}roles`;

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<Response>(`${this.apiUrl}`).toPromise();
    }
    getbyid(ID: number) {
        return this.http.get<Response>(`${this.apiUrl}/${ID}`).toPromise();
    }
    add(Obj: Roles) {
        return this.http.post<Response>(`${this.apiUrl}`, Obj).toPromise();
    }
    update(Obj: Roles) {
        return this.http.put<Response>(`${this.apiUrl}`, Obj).toPromise();
    }
    delete(ID: Number) {
        return this.http.delete<Response>(`${this.apiUrl}/${ID}`).toPromise();
    }
}