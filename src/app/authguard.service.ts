import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthguardService implements CanActivate  {

    constructor(private authService: AuthService, private router: Router) { }

canActivate() {
        if (this.isAuthenticated()) {
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    }

isAuthenticated() {
    const uid = localStorage.getItem("value");
    if (uid) {
        return true;
    }
    console.log("Hello");
    return false;
    }

    }
