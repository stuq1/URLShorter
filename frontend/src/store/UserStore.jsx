import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class UserStore {

    token = null;
    userIsAuth = false;

    constructor() {
        makeAutoObservable(this);
        this.loadToken();
    }

    async signin(username = "admin", password = "password") {
        try {
            const response = await axios.post("http://localhost:5081/api/auth/login", {
                username,
                password
            });

            const json = response.data;
            const token = json.token;

            if (token) {
                runInAction(() => {
                    this.token = token;
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
            const response = await axios.post("http://localhost:5081/api/auth/signup", {
                username,
                password
            });

            const json = response.data;
            const token = json.token;

            if (token) {
                runInAction(() => {
                    this.token = token;
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
            const response = await axios.post("http://localhost:5081/api/auth/validate", {}, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            if (response.data.valid) {
                runInAction(() => {
                    this.token = token;
                    this.userIsAuth = true;
                });
            } else {
                this.logout();
            }
        } catch (err) {
            this.logout();
        }
    }

}
let userStore = new UserStore();

export {
    userStore
};
