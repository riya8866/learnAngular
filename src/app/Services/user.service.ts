import { EventEmitter, Injectable } from "@angular/core"
import {Users} from "../Models/Users"
import { LoggerService } from "./logger.service"

import { BehaviorSubject, Subject, Observable, shareReplay } from "rxjs"
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn:'root'
})
export class UserService{


    private userDetails=new Map<number, Observable<any>>()
    
    //without caching
    // getUserById(id: number){
    //     return this.http.get('https://jsonplaceholder.typicode.com/users/'+id)
    // }

    //for caching==>used in subject behaviour
     getUserById(id: number):any|undefined{
        if(!this.userDetails.has(id)){
            const userDataObs= this.http.get('https://jsonplaceholder.typicode.com/users/'+id).pipe(
            shareReplay(1)
        )
        this.userDetails.set(id,userDataObs)
        }
        this.userDetails.get(id)
    }


    $courseDuration=new BehaviorSubject<string>('2 months')

    //behaviour subject
    $roleBehaviour=new BehaviorSubject<string>('')
    //subject
    $roleSubject=new Subject<string>()

    users: Users[] = [
        new Users('Steve Smith','Male','Monthly','Active'),
        new Users('John Doe','Male','Yearly','Inactive'),
        new Users('Mark Jane','Male','Quaterly','Active')
    ]

    constructor(private logger: LoggerService, private http:HttpClient){

    }

    OnUserDetailsClicked: EventEmitter<Users>= new EventEmitter<Users>();

    OnShowDetails(user:Users){
        this.OnUserDetailsClicked.emit(user)
    }

    GetAllUsers(){
        return this.users
    }

    CreateUser(name:string, gender:string,subType:string,status:string){
        let user=new Users(name,gender,subType,status)
        this.users.push(user)
        this.logger.LogMessage(name,status)
    }
}