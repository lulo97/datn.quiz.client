import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useRef } from "react";
import { Header } from "./ExportPdfHeader/Header";
import { Content } from "./ExportPdfContent/Content";

export function ExportPdf() {
    const [quiz, setQuiz] = useState<QuizDetail>();
    const pagesRef = useRef<HTMLDivElement[]>([]);
    return (
        <Card className="min-h-[80vh]">
            <CardHeader>
                <Header quiz={quiz} setQuiz={setQuiz} pagesRef={pagesRef} />
            </CardHeader>
            <CardContent>
                <Content quiz={quiz} setQuiz={setQuiz} pagesRef={pagesRef} />
            </CardContent>
        </Card>
    );
}
