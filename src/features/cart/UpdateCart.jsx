/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import { decItemQuantity, incItemQuantity } from "./cartSlice"
import Button from "../../ui/Button"

export default function UpdateCart({ pizzaId, currentQuantity }) {
    const dispatch = useDispatch()

    return (
        <div className="flex items-center gap-3 md:gap-3">
            <Button
                type="round"
                onClick={() => dispatch(decItemQuantity(pizzaId))}
            >
                -
            </Button>
            <span className="text-sm font-bold">{currentQuantity}</span>
            <Button
                type="round"
                onClick={() => dispatch(incItemQuantity(pizzaId))}
            >
                +
            </Button>
        </div>
    )
}
