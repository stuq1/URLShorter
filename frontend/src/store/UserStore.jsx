import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class UserStore {

    token = null;
    userIsAuth = false;
    username = null;

    constructor() {
        makeAutoObservable(this);
        this.loadToken();
    }

    async signin(username, password) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST}/api/auth/signin`, {
                username,
                password
            });

            const json = response.data;
            const token = json.token;

            if (json.token) {
                runInAction(() => {
                    this.token = json.token;
                    this.username = json.username;
                    this.userIsAuth = true;
                    this.saveToken(token);
                });
                return true;
            }
        } catch (err) {
            runInAction(() => {
                this.userIsAuth = false;
            });
        }
        
        return false;
    }

    async signup(username, password) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST}/api/auth/signup`, {
                username,
                password
            });

            const json = response.data;
            const token = json.token;

            if (json.token) {
                runInAction(() => {
                    this.token = json.token;
                    this.username = json.username;
                    this.userIsAuth = true;
                    this.saveToken(token);
                });
                return true;
            }
        } catch (err) {
            runInAction(() => {
                this.userIsAuth = false;
            });
        }
        
        return false;
    }

    logout() {
        this.token = null;
        this.userIsAuth = false;
        this.username = null;
        this.removeToken();
    }

    saveToken(token) {
        localStorage.setItem("authToken", token);
    }

    loadToken() {
        const token = localStorage.getItem("authToken");
        if (token) {
            this.validateToken(token);
        }
    }

    removeToken() {
        localStorage.removeItem("authToken");
    }

    async validateToken(token) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST}/api/auth/validate`, {}, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            if (response.data.valid) {
                runInAction(() => {
                    this.token = token;
                    this.username = response.data.username;
                    this.userIsAuth = true;
                });
                return true;
            } else {
                this.logout();
            }
        } catch (err) {
            this.logout();
        }
        
        return false;
    }

}
let userStore = new UserStore();

export {
    userStore
};
