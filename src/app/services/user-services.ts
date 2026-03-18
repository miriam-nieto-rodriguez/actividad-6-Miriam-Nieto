import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IUserResponse } from '../interface/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private httpClient = inject(HttpClient)
  private apiUrl: string = "https://peticiones.online/api/users"

  getAll (): Promise<IUserResponse>{
    return lastValueFrom(this.httpClient.get<IUserResponse>(this.apiUrl))
  }

  getById (_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.apiUrl}/${_id}`))
  }

}
