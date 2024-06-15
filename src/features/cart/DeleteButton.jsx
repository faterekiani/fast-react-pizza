/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import { deleteItem } from "./cartSlice"
import Button from "../../ui/Button"

export default function DeleteButton({ pizzaId }) {
    const dispatch = useDispatch()
    return (
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
            Delete
        </Button>
    )
}
