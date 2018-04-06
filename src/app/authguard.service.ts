import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthguardService implements CanActivate  {


    constructor(private authService: AuthService, private router: Router) { }


    canActivate() {
        if (this.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['login']);
        return false;        
    }


    isAuthenticated() {
    let uid = localStorage.getItem('value');
    if (uid) {
        return true;
    }
    return false;
    }

    }




