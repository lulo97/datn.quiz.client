import { Body } from "./Body/Body";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { PageProps } from "../Utils";

export function PageFirst(props: PageProps) {
    return (
        <div
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            className="flex flex-col px-5 py-4 w-[21cm] h-[29.7cm] bg-white  text-[12]"
        >
            <Header {...props} />
            <Body {...props} />
            <Footer{...props} />
        </div>
    );
}
