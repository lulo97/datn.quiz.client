import { HeaderBottom } from "./HeaderBottom";
import { HeaderLeft } from "./HeaderLeft";
import { HeaderRight } from "./HeaderRight";
import { PageProps } from "@/PageExportPdf2/Utils";

export function Header(props: PageProps) {
    return (
        <div>
            <div className="flex justify-evenly">
                <HeaderLeft {...props} />
                <HeaderRight {...props} />
            </div>
            <HeaderBottom />
        </div>
    );
}
