import { Component, inject, input, signal } from '@angular/core';
import { UserServices } from '../../services/user-services';
import { IUser } from '../../interface/iuser.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  _id = input<string>()
  userServices = inject(UserServices)
  user = signal<IUser | null>(null)  
  route = inject(ActivatedRoute)

  async ngOnInit (){
   
    const _id = this.route.snapshot.params['_id']
    this.user.set (await this.userServices.getById(_id))

  }

  eliminarUsuario(){

  }




}
