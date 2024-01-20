import { useEffect, useState } from "react";

const Settings = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            return setToken(true);
        } else {
            return setToken(false);
        }
    }, []);

    return (

        <>
            {
                token ?
                    <div className="">
                        <h1 className="text-2xl">This is SETTINGS page</h1>
                    </div> :
                    <div className="">
                        <h1 className="text-center text-4xl mt-6">You have no permissions to see this page.</h1>
                        <p className="text-center text-2xl bottom mt-6">Please go to the&nbsp;<a className="text-indigo-500 underline" href="http://localhost:8000/login">LOGIN</a>&nbsp;page.</p>
                    </div>
            }
        </>
    )
}

export default Settings;