import { useSelector } from "react-redux";
import { RootState } from "../store/store";
export default function () {
    const { data: user } = useSelector((store: RootState) => store.auth)
    if (user && Object.entries(user).length > 0) {
        return true;
    }
    return false;
}