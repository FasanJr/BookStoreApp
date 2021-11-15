import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<User>();
  form!: FormGroup;
  model: any = {}
  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    console.log(`login ${this.form.value}`);
    if (this.form.valid) {
      this.loggedIn.emit(
        {
          username: this.form.value.username,
          password: this.form.value.password
        } as User

      );
    }
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
