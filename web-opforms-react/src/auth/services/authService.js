import axios from "axios";
var VITE_BASE = 'https://lab.onesaitplatform.com';
export const loginUser = async ({ username, password }) => {
    let httpLoginOptions = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic b25lc2FpdHBsYXRmb3JtOm9uZXNhaXRwbGF0Zm9ybQ=='
        }
    }

    let body = new URLSearchParams();
    body.set('username', username);
    body.set('grant_type', 'password');
    body.set('password', password);
    try {
        return await axios.post(VITE_BASE + "/auth/realms/onesaitplatform/protocol/openid-connect/token", body.toString(),httpLoginOptions);
    } catch (error) {
        throw error;
    }
}