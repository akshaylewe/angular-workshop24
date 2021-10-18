import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'Registration Form';
  
  passwordValidator: ValidatorFn = (control: AbstractControl):
    ValidationErrors | null => {
    const password = control.get('password');  
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? 
    {
      passwordMatch: true
    } : null;  
  };  
  regForm: FormGroup;
  
  constructor (private fb: FormBuilder, private http: HttpClient){
  }  
  ngOnInit(){
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })  

    this.regForm.valueChanges.subscribe()
    
  }  
  response = ''
  passwordError = false
  private _url = 'http://localhost:3000/users'
  user: Observable<any>
  register(event: any, data: any){
    event.preventDefault(); 
    this.passwordError=false
    return this.http.post(this._url, data, { responseType: 'text' as const}).subscribe(   
      res=>{console.log(res)
        this.regForm.reset();
        alert("Your Registration Completed Successfully");
        
        this.response = res
       
      }  
    )  
  }  

  get name(){
    return this.regForm.get('name')
  }  

  get email(){
    return this.regForm.get('email')
  }  

  get password(){
    return this.regForm.get('password')
  }  

  get confirmPassword(){
    return this.regForm.get('confirmPassword')
  }  
}  


