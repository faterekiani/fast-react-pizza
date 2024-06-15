import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Menu, { loader as menuLoader } from "./features/menu/Menu"
import Order, { loader as OrderLoader } from "./features/order/Order"
import Home from "./ui/Home"
import Cart from "./features/cart/Cart"
import CreateOrder, {
    action as CreateOrderAction,
} from "./features/order/CreateOrder"
import AppLayout from "./ui/AppLayout"
import Error from "./ui/Error"

export default function App() {
    const router = createBrowserRouter([
        {
            // appLayout as a parent route
            element: <AppLayout />,
            errorElement: <Error />,
            children: [
                { path: "/", element: <Home /> },
                {
                    path: "/menu",
                    element: <Menu />,
                    loader: menuLoader,
                    errorElement: <Error />,
                },
                { path: "/cart", element: <Cart /> },
                {
                    path: "/order/new",
                    element: <CreateOrder />,
                    action: CreateOrderAction,

                    errorElement: <Error />,
                },
                {
                    path: "/order/:orderId",
                    element: <Order />,
                    loader: OrderLoader,
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}
