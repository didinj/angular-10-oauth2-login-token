import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['../app.component.scss']
})
export class SecureComponent implements OnInit {

  message = '';
  isLoadingResults = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.authService.secured()
      .subscribe((data: any) => {
        this.message = data;
        console.log(data);
        this.isLoadingResults = false;
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => console.log('Logout'));
  }

}
