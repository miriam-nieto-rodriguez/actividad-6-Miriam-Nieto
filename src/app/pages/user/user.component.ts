import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { UserServices } from '../../services/user-services';
import { IUser } from '../../interface/iuser.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { toast } from 'ngx-sonner';

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
  router = inject(Router)

  ngOnInit() {
    this.cargarContenido()

  }

  async cargarContenido() {
    try {
      this.user.set(await this.userServices.getById(this._id()))

    } catch (error) {
      console.error(error)
    }

  }


  async eliminarUsuario(_id: string | undefined) {
    const result = await Swal.fire({
      title: `¿Seguro que quieres eliminar al usuario ${this.user()?.first_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      try {
        const response = await this.userServices.deleteById(_id)
        if (response._id) {
          toast.error(`Usuario con nombre ${response.first_name} ha sido eliminado`)

          this.router.navigate(['/home'])
        }

      } catch (error) {
        console.error(error)
        toast.error('Error al eliminar usuario')
      }
    }

  }

}





