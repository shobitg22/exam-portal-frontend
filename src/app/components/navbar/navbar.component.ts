import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user:any=null;
  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.loginService.isLoggedIn();
    this.user=this.loginService.getUser();

    //subscibed to subject created in login service
    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.loginService.isLoggedIn();
      this.user=this.loginService.getUser();
    })
  }
  logout(){
    this.loginService.logout();
    window.location.reload();
  }
  getUsername():String{
    return this.loginService.getUser().userName
  }

}
