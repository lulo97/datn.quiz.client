import Header from "./Header/Header";
import Content from "./Content/Content";
import { CardParentClass } from "@/Utils";

export default function Homepage() {
    return (
        <div className={`${CardParentClass} flex flex-col gap-2`}>
            <Header />
            <Content />
        </div>
    );
}
