import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

 constructor(private apiService : ApiService,private router: Router) { 
  }

  ngOnInit() {
  }

  login(data){
    this.apiService.login(data.username,data.password).then(valid => {
      if(valid){
        this.router.navigate(['/home'])
        document.getElementById('id02').style.display='none';
        document.getElementById('id01').style.display='none';
      } else {
        window.alert("Incorrect username or password. Try again.");
      } 
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
