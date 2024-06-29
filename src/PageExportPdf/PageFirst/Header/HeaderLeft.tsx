import { PageProps } from "@/PageExportPdf2/Utils";

export function HeaderLeft(props: PageProps) {
    if (!props.quiz) return <div>Đang tải</div>;
    const totalQuestions = props.quiz.Questions.length;
    const totalPages = Math.ceil(totalQuestions / 6);
    const formattedPages = totalPages.toString().padStart(2, "0");
    return (
        <div className="flex items-center flex-col">
            <div className="font-semibold uppercase">
                Hệ thống trắc nghiệm QuizQuest
            </div>
            <div className="text-sm">Đề thi có {formattedPages} trang</div>
        </div>
    );
}
