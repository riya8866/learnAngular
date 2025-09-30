import { Injectable } from "@angular/core";


@Injectable({ 
  providedIn:'root'
})
export class SubscribeService{
    OnSubscribeClicked(type: string){
    //ADD USER TO DATABASE

    //SEND EMAIL WITH SUBSCRIPTION DETAILS

    //ALLOW USER TO ACCESS SERVICES

    alert('Thank you for your '+type+' subsribing. You can access the window now.')
  }
}