import { PageProps } from "@/PageExportPdf2/Utils";

export function HeaderRight(props: PageProps) {
    if (!props.quiz) return <div>Đang tải</div>;
    return (
        <div className="flex items-center flex-col">
            <div className="font-semibold">{props.quiz.Name}</div>
            <div className="flex items-center flex-col text-sm">
                <div className="uppercase">
                    Môn học: {props.quiz.Subject?.Name}
                </div>
                <div>Trình độ: {props.quiz.EducationLevel?.Name}</div>
                <div>Thời gian làm bài {props.quiz.Time?.Value} phút</div>
            </div>
        </div>
    );
}
