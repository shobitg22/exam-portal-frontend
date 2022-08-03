import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  constructor(private userService:UserService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.user.userName=="" || this.user.userName==null){
      this.snack.open("username cannot be null","ok",{
        duration:3000
      })
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire({
          title: 'Success!',
          text: 'User Registered Succesfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['login'])
      },
      (error)=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Something Went wrong',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
      )
  }


clear(registerForm:NgForm){
  registerForm.resetForm()
}



}
