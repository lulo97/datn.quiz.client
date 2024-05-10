import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CardParentClass, initialAnswer } from "@/Utils";
import { Answer, CreateQuestionData } from "@/Interfaces";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { AnswersStateController } from "./Content/AnswersManipulate";

export function CreateQuestion() {
    const [answers, setAnswers] = useState<Answer[]>([
        initialAnswer(),
        initialAnswer(),
        initialAnswer(),
        initialAnswer(),
    ]);

    const [question, setQuestion] = useState<string>("");

    useEffect(
        function () {
            console.log(answers);
            console.log(question);
        },
        [answers, question]
    );

    const asc = new AnswersStateController(answers, setAnswers);

    const data: CreateQuestionData = {
        answers: answers,
        setAnswers: setAnswers,

        question: question,
        setQuestion: setQuestion,

        addAnswer: asc.addAnswer,
        deleteAnswer: asc.deleteAnswer,
        updateAnswerContent: asc.updateAnswerContent,
        updateAnswerCorrect: asc.updateAnswerCorrect,
    };

    return (
        <div className={CardParentClass}>
            <Card>
                <CardHeader>
                    <Header {...data} />
                </CardHeader>
                <CardContent>
                    <Content {...data} />
                </CardContent>
                <CardFooter>
                    <Footer {...data} />
                </CardFooter>
            </Card>
        </div>
    );
}
