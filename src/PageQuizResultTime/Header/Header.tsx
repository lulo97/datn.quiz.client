import { PlayDetail } from "../Utils";
import { HeaderLeft } from "./HeaderLeft";
import { HeaderRight } from "./HeaderRight";

export function Header(data: PlayDetail) {
    return (
        <div className="flex gap-5">
            <HeaderLeft {...data} />
            <HeaderRight {...data} />
        </div>
    );
}
