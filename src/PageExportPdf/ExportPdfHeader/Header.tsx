import { Button } from "@/components/ui/button";
import { ModalFindQuiz } from "../ModalFindQuiz/ModalFindQuiz";
import { ExamPdfProps } from "../Utils";
import { toast } from "react-toastify";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export function Header(props: ExamPdfProps) {
    const { pagesRef } = props;
    const handleDownload = async () => {
        if (!pagesRef.current.length) {
            toast.warning("Hãy thêm file!");
            return;
        }

        const pdf = new jsPDF(undefined, undefined, undefined, true);
        for (let i = 0; i < pagesRef.current.length; i++) {
            const dataUrl = await toPng(pagesRef.current[i]);

            const img = new Image();
            img.src = dataUrl;
            await new Promise<void>((resolve) => {
                img.onload = () => {
                    const imgWidth = img.width;
                    const imgHeight = img.height;

                    // Calculate the dimensions to fit the image within the page
                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();

                    const ratio = Math.min(
                        pageWidth / imgWidth,
                        pageHeight / imgHeight
                    );

                    const pdfWidth = imgWidth * ratio + 1;
                    const pdfHeight = imgHeight * ratio;

                    if (i === 0) {
                        pdf.addImage(
                            dataUrl,
                            "PNG",
                            0,
                            0,
                            pdfWidth,
                            pdfHeight,
                            undefined,
                            "FAST"
                        );
                    } else {
                        pdf.addPage();
                        pdf.addImage(
                            dataUrl,
                            "PNG",
                            0,
                            0,
                            pdfWidth,
                            pdfHeight,
                            undefined,
                            "FAST"
                        );
                    }
                    resolve();
                };
            });
        }
        pdf.save("my-component.pdf");
    };
    return (
        <div>
            <div className="flex justify-between gap-1">
                <ModalFindQuiz {...props} />
                <Button onClick={handleDownload}>Tải file</Button>
            </div>
        </div>
    );
}
