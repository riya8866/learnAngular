import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../material.import';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
//import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-reactiveforms',
  standalone: true,
  imports: [ReactiveFormsModule, ...MATERIAL_IMPORTS, CommonModule],
  templateUrl: './reactiveforms.component.html',
  styleUrl: './reactiveforms.component.css',
})
export class ReactiveformsComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  //passwordMismatch=false
  searches:FormGroup;
 

  constructor() {

    this.searches=new FormGroup({
       searchControl:new FormControl('')
    })


    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      confirmPassword: new FormControl(''),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z0-9_,]+$'),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{6}$'),
      ]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    }, { validators: this.passwordMatchValidator }); // group-level validator
  }

  submit() {
    this.submitted = true;

    if (this.userForm.valid) {
      alert('Form submitted');
    } else {
      alert('Please fill all the fields');
      this.userForm.markAllAsTouched();
    }
  }

   // Group-level validator to check password match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  ngOnInit(): void {
    //dynamically reacting when value gets changed==> we can access the changed value in the input box
    this.userForm.controls['firstName'].valueChanges.subscribe(
      (res: string) => {
        console.log('firstName value : ' + res);
      }
    );

    this.userForm.valueChanges.subscribe((res: any) => {
      debugger;
      console.log('values are : ' + res);
    });

    // Initially disable confirmPassword
    this.userForm.controls['confirmPassword'].disable();
    // Subscribe to password changes
    this.userForm.controls['password'].valueChanges.subscribe(
      (passwordValue: string) => {
        if (passwordValue && passwordValue.trim() !== '') {
          // Enable confirmPassword if password has some value
          this.userForm.controls['confirmPassword'].enable();
          // Add required validator dynamically
          this.userForm.controls['confirmPassword'].setValidators([
            Validators.required,
          ]);
          this.userForm.controls['confirmPassword'].updateValueAndValidity();
        } else {
          // If password is empty, disable confirmPassword again
          this.userForm.controls['confirmPassword'].disable();
          this.userForm.controls['confirmPassword'].clearValidators();
          this.userForm.controls['confirmPassword'].updateValueAndValidity();
        }
      }
    );

    this.userForm.statusChanges.subscribe((res: any) => {
      debugger;
      console.log('values are : ' + res);
    });


    // combineLatest([this.userForm.controls['password'].valueChanges, this.userForm.controls['confirmPassword'].valueChanges])
    // .subscribe(([pass,confirmpass])=>{
    //   this.passwordMismatch= pass && confirmpass && pass!=confirmpass
    // })

    // Enable confirmPassword when user types in password
    this.userForm.controls['password'].valueChanges.subscribe((passwordValue: string) => {
      if (passwordValue && passwordValue.trim() !== '') {
        this.userForm.controls['confirmPassword'].enable();
        this.userForm.controls['confirmPassword'].setValidators([Validators.required]);
      } else {
        this.userForm.controls['confirmPassword'].disable();
        this.userForm.controls['confirmPassword'].clearValidators();
        this.userForm.controls['confirmPassword'].setValue(''); // reset confirmPassword
      }

       // Re-run group validator
    this.userForm.updateValueAndValidity({ onlySelf: false, emitEvent: false });
 
    });

     
  // Watch confirmPassword changes
  this.userForm.controls['confirmPassword'].valueChanges.subscribe(() => {
    // Re-run group validator
    this.userForm.updateValueAndValidity({ onlySelf: false, emitEvent: false });
  });
  
  

//debounce search==>wait for user to type then call api
  this.searches.controls['searchControl'].valueChanges.pipe(
    debounceTime(1000)           //giving user 1 second to type
  ).subscribe((search:string)=>{
    console.log("search changes: "+search)
  })

  }
}
