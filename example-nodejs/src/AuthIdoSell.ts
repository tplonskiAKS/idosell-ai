import axios from "axios";
import { DateTime } from "luxon";
import dotenv from 'dotenv';

dotenv.config();

export class AuthIdoSell {
    private clientId = process.env.CLIENT_ID;
    private clientSecret = process.env.CLIENT_SECRET;
    private token: string | null;
    private tokenGenerationTime: DateTime | null;

    constructor() {
        this.tokenGenerationTime = null;
        this.token = null;
    }

    public async getToken(): Promise<string> {
        if (!this.token || !this.tokenGenerationTime) {
            console.log('[LOG] Refreshing token.')
            await this.refreshToken();
        }

        const expirationTime = 3200;

        const now = DateTime.now();

        if (!this.token || !this.tokenGenerationTime) {
            throw new Error('[ERROR] Token or Token Generation Time is undefined.');
        }

        const tokenGenerationTimeDifference = now.valueOf() - this.tokenGenerationTime.valueOf();
    
        if (tokenGenerationTimeDifference > expirationTime) {
            console.log('[LOG] Refreshing token.')
            await this.refreshToken();
        }

            return this.token;
    }

    private async refreshToken(): Promise<void> {
        const auth = 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64');

        const body = {
            "scope[]": "api-pa",
            "grant_type": "client_credentials"
        };

        const headers = {
            "Authorization": auth,
            "Content-Type": "application/x-www-form-urlencoded"
        }

        const { data } = await axios.post('https://winylownia.iai-shop.com/panel/action/authorize/access_token', body, {
            headers
        });

        this.tokenGenerationTime = DateTime.now();
        this.token = data?.access_token;
    }
}