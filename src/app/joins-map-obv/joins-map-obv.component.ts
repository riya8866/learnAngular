import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  concatMap,
  exhaustMap,
  forkJoin,
  mergeMap,
  of,
  Subject,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-joins-map-obv',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './joins-map-obv.component.html',
  styleUrl: './joins-map-obv.component.css',
})
export class JoinsMapObvComponent {
  stateData$ = of(['MP', 'MH,Goa']);
  cityData$ = of(['Pune', 'Kanpur', 'Solapur']);

  searchControl: FormControl = new FormControl('I am reactive');

  loginClick$ = new Subject<void>();

  constructor(private http: HttpClient) {
    forkJoin([this.cityData$, this.stateData$]).subscribe((res: any) => {
      console.log(res);
    });

    const $user = this.http.get('https://jsonplaceholder.typicode.com/users');
    const $post = this.http.get('https://jsonplaceholder.typicode.com/posts');

    forkJoin($post, $user).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    //in fork join, subscribe will run only when both observables are positive
    // otherwise it will go in error block

    //multiple calls are triggering whenever user types a new character in search box.
    this.searchControl.valueChanges.subscribe((search: string) => {
      this.http
        .get('https://dummyjson.com/products/search?q=' + search)
        .subscribe((res: any) => {
          console.log('USER RES ' + res);
        });
    });
    //previous api call should get canceled when new character is typed.
    //so we use switch map
    this.searchControl.valueChanges
      .pipe(
        switchMap((search: string) =>
          this.http.get('https://dummyjson.com/products/search?q=' + search)
        )
      )
      .subscribe((res: any) => {
        console.log(res);
      });

    //merge map
    //for nested api calls
    //it considers all the observables if they are positive(they run parallel)
    this.searchControl.valueChanges
      .pipe(
        mergeMap((search: string) =>
          this.http.get('https://dummyjson.com/products/search?q=' + search)
        )
      )
      .subscribe((res: any) => {
        console.log(res);
      });

    //concatMap
    //for nested api calls
    //it runs observable one by one. first it completes first call then only move to next call
    this.searchControl.valueChanges
      .pipe(
        concatMap((search: string) =>
          this.http.get('https://dummyjson.com/products/search?q=' + search)
        )
      )
      .subscribe((res: any) => {
        console.log(res);
      });

    //exhaustMap
    //if user triggered one api call, it should not be allowed to trigger another call
    //for example, if user clicked login button, it should not be able to call it again until he/she completes that api

    this.loginClick$.pipe(
      exhaustMap(() => {
        return this.http.get('https://jsonplaceholder.typicode.com/users');
      })
    );
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  onBtnClicked() {
    this.loginClick$.next();
  }

  //when user is clicking, api call is triggered again and again
  //   onLogin(){
  //  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>{console.log(res)})
  //   }
}
