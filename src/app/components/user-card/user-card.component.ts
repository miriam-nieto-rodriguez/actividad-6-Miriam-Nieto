import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { IUser } from '../../interface/iuser.interface';
import { RouterLink } from "@angular/router";
import { UserServices } from '../../services/user-services';
import Swal from 'sweetalert2';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  myUser = input<IUser>()
  userServices = inject(UserServices)
  @Output() deleteEmit: EventEmitter<boolean> = new EventEmitter()


  async deleteUsuario(_id: string | undefined) {
    const result = await Swal.fire({
      title: `¿Seguro que quieres eliminar al usuario ${this.myUser()?.first_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      try {
        const response = await this.userServices.deleteById(_id)
        if (response._id) {
          toast.warning(`Usuario con nombre ${response.first_name} ha sido eliminado`)
          this.deleteEmit.emit(true)
        }

      } catch (error) {
        console.error(error)
        toast.error ('Error al eliminar usuario')
      }

    }

  }
}


