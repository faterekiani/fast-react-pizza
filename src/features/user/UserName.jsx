import { useSelector } from "react-redux"

export default function UserName() {
    const userName = useSelector((state) => state.user.userName)
    return (
        <div className="hidden text-sm font-semibold md:block">{userName}</div>
    )
}
