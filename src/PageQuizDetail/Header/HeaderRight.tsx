import HeaderRightInformation from "./HeaderRightInformation";
import HeaderRightRating from "./HeaderRightRating";

export default function HeaderRight() {
    return (
        <div className="w-1/3 flex flex-col gap-3">
            <HeaderRightInformation />
            <HeaderRightRating />
        </div>
    );
}