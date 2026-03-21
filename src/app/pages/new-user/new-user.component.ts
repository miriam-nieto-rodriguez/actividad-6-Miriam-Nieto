import { Component, inject, input, signal } from '@angular/core';
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
  _id = input<string>()
  title: string = "Registrar"
  user = signal<IUser | undefined>(undefined)


  constructor() {
    this.userForm = new FormGroup({
      nombre: new FormControl('', [
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

    }, [])
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }

  async ngOnInit() {
    if (this._id()) {
      this.title = "Actualizar"

      this.user.set(await this.userServices.getById(this._id()))

      this.userForm.patchValue({
        _id: this.user()?._id,
        nombre: this.user()?.first_name,
        apellido: this.user()?.last_name,
        email: this.user()?.email,
        imagen: this.user()?.image
      })
  }
}

  async getDataForm(){
  if (this._id()){
    try {
      console.log (this.userForm.value)
      const response = await this.userServices.updateUser(this.userForm.value, this._id())

      if (response._id){
        toast.success(`Usuario ${response.first_name} actualizado correctamente`)
        this.router.navigate(['/home'])
      }

    }catch (error){
      console.log (error)
      toast.error ('Error al actualizar usuario')
     
    }
  } else {

    try {
      let response = await this.userServices.createUser(this.userForm.value)
      if (response) {
        toast.success('Usuario creado correctamente')
        console.log('Respuesta:', response)
        this.router.navigate(['/home'])
      }
      this.userForm.reset()
  
    } catch (error) {
      console.error(error)
      toast.error('Error al crear usuario')
    }
  }

}

}
