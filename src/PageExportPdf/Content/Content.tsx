import { ExamPdf } from "../ExamPdf/ExamPdf";
import { ExamPdfProps } from "../Utils";

export function Content(props: ExamPdfProps) {
    return (
        <div className="border p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-center">
                <ExamPdf {...props} />
            </div>
        </div>
    );
}
