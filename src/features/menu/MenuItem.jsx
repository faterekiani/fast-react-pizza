/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { formatCurrency } from "../../utils/helpers"
import { addItem, getCurrentQuantityById } from "../cart/cartSlice"
import DeleteButton from "../cart/DeleteButton"
import UpdateCart from "../cart/UpdateCart"

function MenuItem({ pizza }) {
    const dispatch = useDispatch()

    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

    // deleteButton shows up for each order that selcted
    const currentQuantity = useSelector(getCurrentQuantityById(id))
    const isInCart = currentQuantity > 0

    function handleAddItem() {
        const newItem = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        }
        dispatch(addItem(newItem))
    }

    return (
        <li className="flex gap-4 py-2">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
            />
            <div className="flex grow flex-col pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm capitalize italic text-stone-500">
                    {ingredients.join(", ")}
                </p>
                <div className="mt-auto flex items-center justify-between text-sm">
                    {!soldOut ? (
                        <p>{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="font-medium uppercase text-stone-500">
                            Sold out
                        </p>
                    )}

                    {isInCart && (
                        <div className="flex items-center justify-between gap-2">
                            <UpdateCart
                                pizzaId={id}
                                currentQuantity={currentQuantity}
                            />
                            <DeleteButton pizzaId={id} />
                        </div>
                    )}

                    {!soldOut && !isInCart && (
                        <Button type="small" onClick={handleAddItem}>
                            Add to cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    )
}

export default MenuItem
