import { CardParentClass } from "@/Utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { useRef, useState } from "react";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { createSubQuizzes } from "./Utils";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { toast } from "react-toastify";

export function ExportPdf() {
    const [Quizs, setQuizs] = useState<QuizDetail[] | null>(null); // Ensure Quiz is null initially
    const componentRefs = useRef<HTMLDivElement[]>([]);

    async function fetchData(Quiz: QuizDetail) {
        //2bdc18c9-279a-4532-b2a4-7edc8be6a7a5
        const Quizs = createSubQuizzes(
            {
                ...Quiz,
                Questions: [].concat(...Array(6).fill(Quiz.Questions)),
            },
            6
        );
        setQuizs(Quizs);
    }

    const handleDownload = async () => {
        if (!componentRefs.current.length) {
            toast.warning("Hãy thêm file!")
            return;
        }

        const pdf = new jsPDF(undefined, undefined, undefined, true);
        for (let i = 0; i < componentRefs.current.length; i++) {
            const dataUrl = await toPng(componentRefs.current[i]);

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
                        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
                    } else {
                        pdf.addPage();
                        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
                    }
                    resolve();
                };
            });
        }
        pdf.save("my-component.pdf");
    };

    return (
            <Card className="flex-1">
                <CardHeader>
                    <Header
                        fetchData={fetchData}
                        handleDownload={handleDownload}
                        Quizs={Quizs}
                        componentRefs={componentRefs}
                    />
                </CardHeader>
                <CardContent className="min-h-60">
                    {!Quizs && <div>Hãy thêm đề</div>}
                    {Quizs && (
                        <Content
                            handleDownload={handleDownload}
                            Quizs={Quizs}
                            componentRefs={componentRefs}
                            fetchData={fetchData}
                        />
                    )}
                </CardContent>
            </Card>
    );
}
