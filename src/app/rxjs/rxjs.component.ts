import { Component, inject } from '@angular/core';
import { filter, from, interval, map, Observable, of, take, timer } from 'rxjs';
import { JsonApiService } from '../Services/jsonapi.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent {

  //of operator
  cityList$ = of(['Mumbai','Pune','Thane'])    //emit string[]

  //from operator
  cityList2$ = from(['Mumbai','Pune','Thane'])    //emit string==>single instance one by one


  //interval operator
  //used for example, if we want to fetch api after every 5 min to show updated data in dashboard
  //myInterval$= interval(1000)           //emit observable of type number
  //more presice than setTimeout


  //timer operator
  timer$=timer(5000)         //executed only once

  timeInterval$=interval(5000)
  myInterval$=interval(1000);  

  noList$=from([11,12,13,14,15,16,17,18])

  rollNoList$=of([11,12,13,14,15,16,17,18])

  jsonapiService=inject(JsonApiService)

  searchControl = new FormControl('');

  constructor(){

    //to keep record of when user type in search box
    this.searchControl.valueChanges
  .pipe(
      filter((text: string | null) => !!text && text.length > 3), // only when > 3 chars
        map((text: string | null) => text!.toLowerCase())
  )
  .subscribe((value:any) => console.log('User searched:', value));

 //use of map and interval to get output every 2 sec(even number)
    this.timeInterval$.pipe(
      filter((time: number)=>time%2==0)
    ).subscribe(number=>console.log(number))


//to call single user
this.jsonapiService.getSingleUserJson().subscribe((res:any)=>{
  console.log(res)
})


    //filter some parts of each object in json api
    this.jsonapiService.getJsonUser().subscribe((res:any)=>{
      console.log(res)
    })

    //filter from list made with from
    this.noList$.pipe(
      filter(num=>num%2==0)
    ).subscribe((res:number)=>{
      console.log('filtered from')
      console.log(res)
    })

    //filter from list made with of
    this.rollNoList$.pipe(

      map(result=>result.filter(num=>num%2==0)))
    .subscribe((res:number[])=>{
      console.log('filtered from')
      console.log(res)
    })

    //next operator
    const myObs$= new Observable(value=>{
      value.next("Hello from observable")
    })

    myObs$.subscribe(message=>{
      //debugger
      console.log(message)
    })

    this.cityList$.subscribe((result:string[])=>{
   // debugger
    console.log(result)
  })

  this.cityList2$.subscribe((result:string)=>{
   // debugger
    console.log(result)
  })

  this.myInterval$.subscribe((res:number)=>{
   // debugger
    console.log('Interval '+res)
  })

 this.timer$.subscribe((res:number)=>{
   // debugger
    console.log('Timer Executed'+res)
  })

    interval(300000).subscribe(() => {
      this.fetchData();
    });

    // If you want to stop after 20 times
    interval(300000).pipe(
      take(20)  // limits to 20 emissions
    ).subscribe(() => {
      this.fetchData();
    });
  }

  fetchData() {
    console.log("Fetching API data...");
    // your API call logic
  }


  }

  

