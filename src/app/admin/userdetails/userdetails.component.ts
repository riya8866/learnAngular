import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { Users } from '../../Models/Users';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',

})
export class UserdetailsComponent {
  constructor(private userService: UserService){

  }
  userList=this.userService.GetAllUsers()

  ShowUserDetails(user:Users){
    this.userService.OnShowDetails(user)
  }
}
