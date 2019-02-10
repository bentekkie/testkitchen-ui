import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import {Router} from "@angular/router"
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    content = "login component"

  constructor(private apiService : ApiService,private router: Router) { 
  }

  ngOnInit() {
  }
  
  login(data){
    this.apiService.login(data.username,data.password).then(valid => {
      if(valid){
        this.router.navigate(['/create-recipe'])
      }
    })
  }
  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
