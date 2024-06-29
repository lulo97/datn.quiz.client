import { Body } from "./Body/Body";
import { Footer } from "./Footer/Footer";
import { PageProps } from "../Utils";

export function PageOther(props: PageProps) {
    const { PageIdx, questions, MaxPage } = props;
    if (!questions) return <div>Đang tải!</div>

    return (
        <div
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            className="flex flex-col px-5 py-4 w-[21cm] h-[29.7cm] bg-white  text-[12]"
        >
            <Body questions={questions} />
            <Footer MaxPage={MaxPage} PageIdx={PageIdx} />
        </div>
    );
}
