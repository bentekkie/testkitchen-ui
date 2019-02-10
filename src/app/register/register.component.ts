import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { ApiService } from "../api.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  register(data) {
    if (data.password === data.passwordrepeat) {
      this.apiService.register(data.username, data.password).then(valid => {
        if (valid) {
          this.router.navigate(["/login"]);
        }
      });
    }
  }
}
