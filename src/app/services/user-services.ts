import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IUserResponse } from '../interface/iuser.interface';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private httpClient = inject(HttpClient)
  private apiUrl: string = "https://peticiones.online/api/users"

  getAll (): Promise<IUserResponse>{
    return lastValueFrom(this.httpClient.get<IUserResponse>(this.apiUrl))
  }

  getById (_id: string | undefined): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.apiUrl}/${_id}`))
  }

  createUser(user: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.apiUrl, user))
  }

  deleteById(_id:string | undefined): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.apiUrl}/${_id}`))
  }

  updateUser (user: IUser, _id: string | undefined): Promise<IUser>{
    return lastValueFrom(this.httpClient.put<IUser>(`${this.apiUrl}/${_id}`, user))
  }

}
