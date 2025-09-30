import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, effect, ElementRef, input, Signal, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../material.import';
import { AlertComponent } from '../alert/alert.component';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [JsonPipe, FormsModule, ...MATERIAL_IMPORTS, CommonModule, AlertComponent],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export class SignalsComponent {
  courseName=signal('Angular');    //writable signal which cannot be changed diractly

  courseDuration=signal<string>('2 months')   //strongly typed

  cityList=signal<string[]>(['Mumbai','Nagpur','Pune']);  //array signal

  stateList : Signal<string[]> = signal<string[]>(['Uttarakhand','Odissa','Punjab']);  //defining the datatype of array signal

  constructor(private http:HttpClient){                 //accessing signal

    effect(()=>{
      console.log('Effect Called',this.fName()+' '+this.mName())           //effect when value of signal changes
    })

    const course_name=this.courseName(); //we acccess signal as a method
    this.cityNameViewChild()?.nativeElement
    
    debugger

    //toSignal==>convert observable into signal
    const userList=toSignal(this.http.get(''),{initialValue:[]})
  }

  changeCourseName(){
    this.courseName.set('Signal value changed') 
  }

  changeCityList(){
    this.cityList.set(['Thane','Ghaziabad','Pune'])
  }

  studentObj=signal<any>({name:'mukesh',age:23,Subject:'Maths'})

  changeStudentObj(){
    this.studentObj.set({name:'Ram',age:22,Subject:'Science'})
  }

  cityName: string='';

  addCity(){
    this.cityList.update(oldCityList=>([...oldCityList,this.cityName]))
  }

  employeeObj=signal<any>({empId:11,empName:'',empCity:'',empPincode:'',empState:''})
  employeeData = this.employeeObj();

  submit(form: any){
    if(form.valid){
      alert("form submitted")
    }
    else{
      alert("please fill all the fields")
    }
  }
  //to change value in form field wise
  changeEmpIdValue(event:any){
    const value=event.target.value
    this.employeeObj.update(oldObj=>({...oldObj,empId:value}))
  }
  //generic way to change value for every filed in the form
  changeFormValue(keyName:string, event:any){
    const value=event.target.value
    this.employeeObj.update(oldObj=>({...oldObj,[keyName]:value}))
  }

  //computed signal
  fName=signal('')
  mName=signal('')
  lName=signal('')

  fullName =computed(()=>this.fName()+' '+this.mName()+' '+this.lName())

  changeFName(event:any){
    this.fName.set(event.target.value)
  }
  changeLName(event:any){
    this.lName.set(event.target.value)
  }
  changeMName(event:any){
    this.mName.set(event.target.value)
  }

    cityNameViewChild= viewChild<ElementRef<HTMLInputElement>>('')
}
