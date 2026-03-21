import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServices } from '../../services/user-services';
import { IUser } from '../../interface/iuser.interface';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent {
  userForm: FormGroup;
  userServices = inject(UserServices)
  router = inject(Router)

  constructor() {
    this.userForm = new FormGroup({
      nombre: new FormControl ('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w+\@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/)
      ]),
      imagen: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\//)
      ])

    })
  }

  checkControl (controlName:string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }


  async getDataForm(){
    let user: IUser = this.userForm.value
    
    try {
      let response = await this.userServices.createUser(user)
      if (response){
        toast.success('Usuario creado correctamente')
        console.log ('Respuesta:', response)
        this.router.navigate(['/home'])
      }
    } catch (error){
      console.error (error)
      toast.error ('Error al crear usuario')
    }
  }

}
