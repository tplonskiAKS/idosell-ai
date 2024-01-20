import { useEffect, useState } from "react";

const AI = () => {
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
                        <h1 className="text-2xl">This is Tools page</h1>
                    </div> :
                    <div className="">
                        <h1 className="text-2xl">Sign up to see this page.</h1>
                    </div>
            }
        </>

    )
}

export default AI;