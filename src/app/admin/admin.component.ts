import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  constructor(private userService: UserService){
    this.userService.$roleBehaviour.subscribe((res:string)=>{
      console.log(res)
    })
    this.userService.$roleSubject.subscribe((res)=>console.log(res))
  }

  name:string=''
  gender:string='Male'
  subType:string='Yearly'
  status:string='Active'

  CreateNewUser(){
    this.userService.CreateUser(this.name,this.gender,this.subType,this.status)
    console.log(this.userService.users)
  }



  //interceptors part
  http=inject(HttpClient)
  getUsers(){
    this.http.get('https://projectapi.gerasim.in/api/UserApp/GetAllUsers').subscribe((res:any)=>{
      console.log(res)
    })
  }

  ngOnInit(): void {
      this.getUsers()
  }

}
