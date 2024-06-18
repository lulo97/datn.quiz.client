import { Button } from "@/components/ui/button";
import { ExamPdfProps } from "../Utils";
import { ModalFindQuiz } from "../ModalFindQuiz/ModalFindQuiz";

export function Header(props: ExamPdfProps) {
    const { handleDownload } = props;
    return (
        <div>
            <div className="flex justify-between gap-1">
                <ModalFindQuiz {...props} />
                <Button onClick={handleDownload}>Tải file</Button>
            </div>
        </div>
    );
}
