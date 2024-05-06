import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

export default function Header() {
    return (
        <div className="flex gap-5">
            <HeaderLeft />
            <HeaderRight />
        </div>
    );
}
