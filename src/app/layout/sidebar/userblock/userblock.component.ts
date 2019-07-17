import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {

    public user: User;

    constructor(public userblockService: UserblockService) {
    }

    ngOnInit() {
        this.user = Security.getUser();
        if (this.user != null) {
            this.user.picture = 'assets/img/user/01.jpg';
        }
    }

    userBlockIsVisible() {
        return Security.hasToken();
    }

}
