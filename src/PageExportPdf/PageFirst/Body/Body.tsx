import { BodyQuestionNoImage } from "./BodyQuestionNoImage";
import { BodyQuestion } from "./BodyQuestion";
import { PageProps } from "@/PageExportPdf2/Utils";

export function Body(props: PageProps) {
    if (!props.questions) return <div>Đang tải!</div>
    return (
        <div className="flex-grow justify-between flex flex-col mt-2 gap-4">
            {props.questions.map((Question, Idx) => {
                if (Question.ImageUrl ? true : false) {
                    return (
                        <div key={Idx}>
                            <BodyQuestion Question={Question} Idx={Idx} />
                        </div>
                    );
                }
                return (
                    <div key={Idx}>
                        <BodyQuestionNoImage Question={Question} Idx={Idx} />
                    </div>
                );
            })}
        </div>
    );
}
