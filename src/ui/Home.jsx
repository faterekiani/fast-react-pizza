import { useSelector } from "react-redux"
import CreateUser from "../features/user/CreateUser"
import Button from "./Button"

function Home() {
    // read data from redux store
    const username = useSelector((state) => state.user.userName)
    return (
        <div className="my-10 text-center">
            <h1 className="px4 mb-8 text-xl font-semibold text-stone-700 md:text-3xl">
                The best pizza.
                <br />
                <span className="text-yellow-500">
                    Straight out of the oven, straight to you.
                </span>
            </h1>
            {username ? (
                <Button to="/menu" type="primary">
                    lets ordering, {username}
                </Button>
            ) : (
                <CreateUser />
            )}
        </div>
    )
}

export default Home
