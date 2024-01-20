import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row"
                }}
            >
                <Sidebar />
                <div className="w-full flex flex-col">
                    <Navbar />
                    <div
                        style={{
                            width: "100%"
                        }}
                    >
                        <main className="">{children}</main>
                    </div>
                </div>
            </div>
        </div>
    )
}