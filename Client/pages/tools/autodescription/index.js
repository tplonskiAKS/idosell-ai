import { useEffect, useState } from "react";
import Login from "../../login";



const AITool = () => {
    const [token, setToken] = useState("");

    const [state, setState] = useState({
        productIds: ""
    });

    const handleIdsChange = (e) => {
        const copy = { ...state }
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    const submitIdsChange = async (e) => {
        const res = await fetch('http://localhost:3000/autodescription/handle-product-ids', {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }


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

    const [file, setFile] = useState();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!file) return

        try {
            const data = new FormData()
            data.set('file_asset', file)

            const res = await fetch('http://34.116.133.168:3000/autodescription/asset', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (!res.ok) throw new Error(await res.text())
        } catch (e) {
            console.error(e)
        }
    }
    if (token) {
        return (
            <>
                <div className="px-20 py-20 flex-col">
                    <form onSubmit={submitIdsChange} onsubmit="return false">
                        <textarea name="productIds" id="productIds" rows="6" class="w-[90vh] px-0 text-sm border-solid text-gray-900 border-2 focus:ring-0 dark:placeholder-gray-400" placeholder="Put offer IDs here..." onChange={handleIdsChange}></textarea>

                        <div className="py-10">
                            <button type="button" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded" onClick={submitIdsChange}>Submit</button>
                        </div>
                    </form>
                </div>

                <div className="px-20">
                    <form onSubmit={onSubmit} className="">
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => setFile(e.target.files?.[0])}
                        />
                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </>
        )
    } else {
        return (<Login />)
    }
}

export default AITool;