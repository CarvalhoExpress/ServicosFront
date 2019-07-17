import {User} from '../models/user.model';

export class Security {
    public static set(user: User, token: string) {
        const data = JSON.stringify(user);

        localStorage.setItem('application-user', btoa(data));
        localStorage.setItem('application-token', token);
    }

    public static setUser(user: User) {
        const data = JSON.stringify(user);
        localStorage.setItem('application-user', btoa(data));
    }

    public static setToken(token: string) {
        localStorage.setItem('application-token', token);
    }

    public static getUser(): User {
        const data = localStorage.getItem('application-user');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }

    public static getToken(): string {
        const data = localStorage.getItem('application-token');
        if (data) {
            return data;
        } else {
            return null;
        }
    }

    public static hasToken(): boolean {
        if (this.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    public static IsAdmin(): boolean {
        const user = this.getUser();
        if (user != null) {
            return user.document === 'Administrador';
        }
        return false;
    }

    public static clear() {
        localStorage.removeItem('application-user');
        localStorage.removeItem('application-token');
    }
}
