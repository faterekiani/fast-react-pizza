/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
export default function Button({ children, disabled, to, type, onClick }) {
    const base =
        "inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide duration-300 text-stone-900 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"

    const styles = {
        primary: base + " sm:px-6 sm:py-4 px-4 py-3",
        small: base + " px-4 py-2 text-xs md:py-2.5 md:px-5",
        round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
        secondary:
            "inline-block text-sm rounded-full border-2 border-stone-300  font-semibold uppercase tracking-wide text-stone-600 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-4 px-4 py-3",
    }
    if (to)
        return (
            <Link to={to} className={styles[type]}>
                {children}
            </Link>
        )

    if (onClick)
        return (
            <button
                onClick={onClick}
                className={styles[type]}
                disabled={disabled}
            >
                {children}
            </button>
        )
    return (
        <button className={styles[type]} disabled={disabled}>
            {children}
        </button>
    )
}
