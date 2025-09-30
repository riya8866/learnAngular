import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class JsonApiService{
 
    constructor(private http:HttpClient){}


   


    //to get parts of the object in api
    getJsonUser(){
        return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
            tap(userLists=>{debugger}),
            map((userList:any)=>userList.map((user:any)=>{
                return{id:user.id, name: user.name}
            })),tap(user=>{debugger})
        )
    }
    //tap operator is used to get all the api data along with altered data(optional) 
    //there are two option of using if, one before map function with will return whole api
    //second option is after map, it gives all the array together but with altered array data


    getSingleUserJson(){
        return this.http.get('https://jsonplaceholder.typicode.com/users/2').pipe(
            map(((userData:any)=>userData.address))
        )
    }
}