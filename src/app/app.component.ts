import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Your Test Kitchen';
  loggedIn = false
  
  constructor(private apiService : ApiService,private router: Router){
    this.updateLoginStatus()
  }
  
  updateLoginStatus(){
    this.apiService.isLoggedIn().then(res => {
      this.loggedIn = res
    })
  }
  
  
  login(data){
    this.apiService.login(data.username,data.password).then(valid => {
      if(valid){
        this.router.navigate(['/home'])
        document.getElementById('id02').style.display='none';
        document.getElementById('id01').style.display='none';
        this.updateLoginStatus()
      } else {
        window.alert("Incorrect username or password. Try again.");
      } 
    })
  }
  
  logout(){
    this.apiService.logout().then(() => {
      this.updateLoginStatus()
      this.router.navigate(['/home'])
    })
  }
  
  register(data) {
    console.log(data);
    if (data.password === data.passwordrepeat) {
      this.apiService.register(data.username, data.password).then(valid => {
        if (valid) {
          this.router.navigate(["/home"]);
          this.login(data);
        }  else {
        window.alert("Invalid registration. Try again.");
      } 
      });
    }
  }
}
