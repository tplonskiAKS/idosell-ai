import axios from 'axios';
import { AuthIdoSell } from './AuthIdoSell';

export class IdoSell {
    private auth: AuthIdoSell;
    private defaultHeaders: Record<string, string>;

    constructor() {
        this.auth = new AuthIdoSell();
        this.defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }

    public async getDescriptions(): Promise<void> {
        const token = await this.auth.getToken();

        const body = {
            "authenticate": {
                "userLogin": "oauth_authorization",
                "authenticateKey": token
            },
            "params": {
                "productsIdents": [
                    {
                        "productIdentType": "id",
                        "identValue": "226974"
                    }]
            }
        }

        await axios.post('https://winylownia.iai-shop.com/api/?gate=products/getDescriptions/192/json', body, {
            headers: this.defaultHeaders
        });
    }

    public async setDescription(productId: number, description: string): Promise<void> {
        const token = await this.auth.getToken();

        const body = {
            "authenticate": {
                "userLogin": "oauth_authorization",
                "authenticateKey": token
            },
            "params": {
                "products": [{
                    "productIdent":
                    {
                        "productIdentType": "id",
                        "identValue": `${productId}`
                    },
                    "productDescriptionsLangData": [{
                        "langId": 'pol',
                        "productLongDescription": description
                    }]
                }]
            }
        }

        await axios.post('https://winylownia.iai-shop.com/api/?gate=products/updateDescriptions/192/json', body, {
            headers: this.defaultHeaders
        });
    }
}