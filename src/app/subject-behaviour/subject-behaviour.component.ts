import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../Services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-behaviour',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subject-behaviour.component.html',
  styleUrl: './subject-behaviour.component.css'
})
export class SubjectBehaviourComponent implements OnInit{

  studentName$= new Subject()

  rollNo$= new Subject<number>()

  //subject will not emit anything, just a normal subject
  taketill=new Subject<void>()

  //another way to define subject
  courseName$: Subject<string>=new Subject<string>


  //subject behaviour topis==> injection done from user service for better understanding
  userService=inject(UserService)     // subscribed in ngOnInit





  constructor(){
    
    setTimeout(() => {
      this.studentName$.next('Mohit')
      this.rollNo$.next(4)
      this.taketill.next()
      this.userService.$courseDuration.next('2 months + 1 week')
    }, 4000);
  }

  ngOnInit(){

    this.userService.$courseDuration.subscribe(res=>{console.log(res)})

    this.studentName$.subscribe(name=>{
      console.log(name)
    })

    this.rollNo$.subscribe(no=>{
      console.log(no)
    })    
  }

  onRoleChanged(event:any){
    this.userService.$roleBehaviour.next(event.target.value)
    this.userService.$roleSubject.next(event.target.value)
  }

  //caching
   userId: number=0

   getUser(){
  this.userService.getUserById(this.userId).subscribe((res:any)=>console.log(res))
 }

}
