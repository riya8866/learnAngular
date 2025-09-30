import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material.import';
import { FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formvalidation',
  standalone: true,
  imports: [...MATERIAL_IMPORTS, FormsModule, CommonModule],
  templateUrl: './formvalidation.component.html',
  styleUrl: './formvalidation.component.css'
})
export class FormvalidationComponent {
  user={
    first:'',
    last:'',
    city:'',
    username:'',
    state:'',
    zip:'',
    terms:false
  }

  submit(form: any){
    if(form.valid){
      alert("form submitted")
    }
    else{
      alert("please fill all the fields")
    }
  }
}
