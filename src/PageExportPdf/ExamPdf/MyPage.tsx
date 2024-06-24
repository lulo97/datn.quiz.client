import { Body } from "./Body/Body";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { PageProps } from "../Utils";

export function MyPage(props: PageProps) {
    const { PageIdx, FirstPage, Quiz, MaxPage } = props;
    return (
        <div
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            className="flex flex-col px-5 py-4 w-[21cm] h-[29.7cm] bg-white  text-[12]"
        >
            {FirstPage && <Header {...Quiz} />}
            <Body {...Quiz} />
            <Footer MaxPage={MaxPage} PageIdx={PageIdx} />
        </div>
    );
}
