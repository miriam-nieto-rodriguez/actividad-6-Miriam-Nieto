import { Component, inject, signal } from '@angular/core';
import { UserServices } from '../../services/user-services';
import { IUser, IUserResponse } from '../../interface/iuser.interface';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userServices = inject(UserServices)
  arrUsers = signal<IUser[]>([])

  async ngOnInit() {
    try{
      let response: IUserResponse = await this.userServices.getAll()
      this.arrUsers.set(response.results)
    
    }catch(error) {
      console.error(error)
    }
  }
}
