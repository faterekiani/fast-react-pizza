import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { createOrder } from "../../services/apiRestaurant"
import { useSelector } from "react-redux"
import Button from "../../ui/Button"
import EmptyCart from "../cart/EmptyCart"
import store from "../../store"
import { clearCart, getTotalCartPrice } from "../cart/cartSlice"
import { formatCurrency } from "../../utils/helpers"
import { useState } from "react"

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    )

function CreateOrder() {
    //computing prority price in order
    const [withPriority, setWithPriority] = useState(false)

    const username = useSelector((state) => state.user.userName)
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    const formErrors = useActionData()

    const cart = useSelector((state) => state.cart.cart)

    const totalCartPrice = useSelector(getTotalCartPrice)
    const totalPriority = withPriority ? totalCartPrice * 0.2 : 0
    const totalPriceWhithPriority = totalCartPrice + totalPriority

    if (!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Lets go!
            </h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        type="text"
                        name="customer"
                        defaultValue={username}
                        className="input grow"
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            type="tel"
                            name="phone"
                            className="input w-full"
                            required
                        />
                        <div className="px-6 pt-2 text-xs text-red-500">
                            {formErrors?.phone && <p>{formErrors.phone}</p>}
                        </div>
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="text"
                            name="address"
                            required
                        />
                    </div>
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="size-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <input type="hidden" name="cart" value={JSON.stringify(cart)} />
                <div>
                    <Button disabled={isSubmitting} type="primary">
                        {isSubmitting
                            ? "placing order..."
                            : `Order now (${formatCurrency(totalPriceWhithPriority)})`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    // new order
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "true",
    }
    const errors = {}
    if (!isValidPhone(order.phone))
        errors.phone = "Please give us your correct phone number."
    if (Object.keys(errors).length > 0) return errors

    const newOrder = await createOrder(order)

    // for clear cartOverview in order page
    store.dispatch(clearCart())

    return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
