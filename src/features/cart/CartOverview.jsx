import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice"
import { formatCurrency } from "../../utils/helpers"

function CartOverview() {
    const pizzaQuantity = useSelector(getTotalCartQuantity)
    const pizzaTotalPrice = useSelector(getTotalCartPrice)

    if (!pizzaQuantity) return null

    return (
        <div className="flex items-center justify-between space-x-4 bg-stone-800 p-4 uppercase text-stone-200 sm:space-x-6">
            <p className="text-stone-300">
                <span>{pizzaQuantity} pizzas</span>
                <span> {formatCurrency(pizzaTotalPrice)} </span>
            </p>
            <Link to="/Cart">Open cart &rarr;</Link>
        </div>
    )
}

export default CartOverview
