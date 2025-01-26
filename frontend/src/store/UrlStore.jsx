import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

function generateHeaders() {
    const token = localStorage.getItem("authToken");
    const headers = {};
    if (token) {
        headers.Authorization = "Bearer " + token;
    }
    return headers;
}

class UrlsStore {

    urls = [];

    constructor() {
        makeAutoObservable(this);
        this.loadUrls();
    }

    async loadUrls() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_HOST}/api/url/list`, { 
                headers: generateHeaders() 
            });

            const urls = response.data?.urls;

            if (urls) {
                runInAction(() => {
                    this.urls = urls;
                });
            }
        } catch (err) {
            runInAction(() => {
                //
            });
        }
    }

    clearUrls() {
        this.urls = [];
    }

    async addUrl(url) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST}/api/url/add`, {
                UrlFull: url,
                creationDate: new Date().toISOString()
            }, { 
                headers: generateHeaders() 
            });

            const result = response.data;
            
            if (result.id) {
                runInAction(() => {
                    this.urls.push(result);
                });
                
                return {
                    short: result.urlShort
                };
            }
        } catch (err) {
            return {
                error: err.response.data?.error
            };
        }

        return false;
    }

}
let urlsStore = new UrlsStore();

export {
    urlsStore
};
