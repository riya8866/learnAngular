import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './unsubscribe.component.html',
  styleUrl: './unsubscribe.component.css'
})
export class UnsubscribeComponent implements OnInit, OnDestroy{
userList:any[]=[]
usersList:any[]=[]
userList3:any[]=[]
userList4:any[]=[]
postList:any[]=[]


http=inject(HttpClient)
//way-1==>when there is only 1 subscription
subscription!:Subscription
//use below function for way-1
getUsers1(){
  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>this.usersList=res)
}


//way-2==>when there are multiple subscription
subscriptionList:Subscription[]=[]
getUsers2(){

  this.subscriptionList.push(this.http.get('https://jsonplaceholder.typicode.com/users')
  .subscribe((res:any)=>this.userList=res)
)}
getPosts(){
   this.subscriptionList.push(this.http.get('https://jsonplaceholder.typicode.com/posts')
  .subscribe((res:any)=>this.postList=res)
)}


//way-3 ==>takeuntill
subTakeUntil!:Subject<void>
getUsers3(){
  this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
    takeUntil(this.subTakeUntil)
  )
  .subscribe((res:any)=>this.userList3=res)
}

//way-4 ==>take
getUsers4(){
  this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
    take(1)            //telling how many timesto subscribe
  )
  .subscribe((res:any)=>this.userList4=res)
}

//way-5==>async pipe
userList$=new Observable<any[]>

ngOnInit(): void {

  //way-5
  this.userList$=this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');

    this.getUsers1()
    this.getUsers2()
    this.getPosts()
}

//to clear the subscription
ngOnDestroy(): void {
  //for way-1
    this.subscription.unsubscribe()

    //for way-2
    this.subscriptionList.forEach(sub=>sub.unsubscribe())

    //for way-3
  this.subTakeUntil.next()
}

}
