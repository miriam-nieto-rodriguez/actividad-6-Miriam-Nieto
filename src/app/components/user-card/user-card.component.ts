import { Component, input } from '@angular/core';
import { IUser } from '../../interface/iuser.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  myUser = input<IUser>()


  onDelete(){
    
  }

}
