import { AuthService } from './service/auth.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'crud-clientes';
  info: any;
  admin = false;
  user = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn$ = false;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    console.log(this.isLoggedIn$);
  }


  logout(): void {
    this.authService.logout();
  }

}
