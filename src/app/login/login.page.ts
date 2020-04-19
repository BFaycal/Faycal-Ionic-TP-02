import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import User from '../models/User';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    id = '';
    mdp = '';

    user: User;
    loading = false;
    error: string;

    constructor( private loginService: LoginService, private router: Router) { }

    ngOnInit() {

    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    login() {
        this.loading = true;
        this.error = null;

        this.loginService.login(this.id, this.mdp)
            .subscribe(
                users => {
                    this.user = users;
                    setTimeout(() => {
                            this.router.navigate(['home']);
                        },
                        1000);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }, () => {
                    this.loading = false;
                });
    }

}
