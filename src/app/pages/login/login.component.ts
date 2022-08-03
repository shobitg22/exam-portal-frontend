import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData ={
    userName:"",
    password:""
  }

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    this.loginService.genrateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);
        this.loginService.login(data.jwtToken)

        this.loginService.getCurrentUser().subscribe(
          (user)=>{
            console.log(user)
            this.loginService.setUser(user)

            if(this.loginService.getUserRole()=='ADMIN')
            {
              this.loginService.loginStatusSubject.next(true);
              //redirect to admin
              this.router.navigate(['admin'])
              //window.location.href="/admin";
            }
            else if(this.loginService.getUserRole()=='NORMAL')
            {
              this.loginService.loginStatusSubject.next(true);
              //redirect to NORMAL
              this.router.navigate(['user-dashboard'])
              //window.location.href="/user-dashboard";
            }
            else{
              this.loginService.logout();
              window.location.reload()
            }
          },
          (error)=>{
            console.log(error)
            Swal.fire({
              title: 'Error!',
              text: 'Principal Usercannot be fetched',
              icon: 'error',
              confirmButtonText: 'Ok'
            })

          }
        )



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

}
