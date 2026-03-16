import { Component, input } from '@angular/core';
import { IUser } from '../../interface/iuser.interface';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  myUser = input<IUser>()

  onView (){

  }

  onUpdate(){

  }

  onDelete(){
    
  }

}
