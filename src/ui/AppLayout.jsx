import { Outlet, useNavigation } from "react-router-dom"
import Header from "./Header"
import Loader from "./Loader"
import CartOverview from "../features/cart/CartOverview"

export default function AppLayout() {
    // Loader
    const navigation = useNavigation()
    const isLoading = navigation.state === "loading"

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-stone-100">
            {isLoading && <Loader />}
            <Header />

            <div className="overflow-scroll">
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>

            <CartOverview />
        </div>
    )
}