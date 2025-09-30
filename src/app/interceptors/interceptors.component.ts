import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-interceptors',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './interceptors.component.html',
  styleUrl: './interceptors.component.css'
})
export class InterceptorsComponent {

  loginObj:any={
    username:'',
    password:''
  }
  router=inject(Router)
  http=inject(HttpClient)

  apiLoginObj:any={
    EmailId:'',
    Password:''
  }

  // onLogin(){
  //   if(this.loginObj.username=='admin' && this.loginObj.password=='123456'){
  //     this.router.navigateByUrl('admin')
  //   }else{
  //     alert("wrong credentials")
  //   }
  // }

  onLogin(){
    this.http.post('https://projectapi.gerasim.in/api/UserApp/login',this.apiLoginObj).subscribe((res:any)=>{
      localStorage.setItem('angular19User',res.data.userId)
      localStorage.setItem('angular19Token',res.data.token)   //this is the key name we are givingto store the token
      this.router.navigateByUrl('admin')
    },error=>{
      alert('Wrong Credentials')
    })
  }
}
