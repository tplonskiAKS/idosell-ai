import { useEffect, useState } from "react";
import Login from "../pages/login";



const AITool = () => {
    const [token, setToken] = useState("");

    useEffect(async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://34.116.133.168:3000/auth', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status !== 200) {
            return setToken(null);
        } else {
            return setToken(token);
        }
    }, []);

    if (token) {
        return (
            <h1 className="text-center text-3xl mt-60">You're logged in - Welcome!</h1>
        )
    } else {
        return (<Login />)
    }
}

export default AITool;