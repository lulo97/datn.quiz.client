import { getAnswerStyle, getObjectId } from "@/Utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { PencilLine, X } from "lucide-react";

const data = [
    {
        content: "Con nào bơi nhanh nhất",
        answers: [
            { id: getObjectId(), content: "Con chó", correct: false },
            { id: getObjectId(), content: "Con mèo", correct: false },
            { id: getObjectId(), content: "Con cá", correct: true },
            { id: getObjectId(), content: "Con hổ", correct: false },
        ],
    },
    {
        content: "Ai là người đại diện cho giải Nobel hóa học",
        answers: [
            { id: getObjectId(), content: "Marie Curie", correct: false },
            { id: getObjectId(), content: "Albert Einstein", correct: false },
            { id: getObjectId(), content: "Linus Pauling", correct: true },
            {
                id: getObjectId(),
                content: "Dorothy Crowfoot Hodgkin",
                correct: false,
            },
        ],
    },
    {
        content: "Nhà thơ tiêu biểu của thơ ca Việt Nam",
        answers: [
            { id: getObjectId(), content: "Nguyễn Bỉnh Khiêm", correct: false },
            { id: getObjectId(), content: "Tô Hoài", correct: false },
            { id: getObjectId(), content: "Nguyễn Du", correct: false },
            { id: getObjectId(), content: "Hoàng Cầm", correct: true },
            { id: getObjectId(), content: "Xuân Quỳnh", correct: true },
        ],
    },
];

interface QuestionProps {
    content: string;
    answers: { id: string; content: string; correct: boolean }[];
}

function Question(props: QuestionProps) {
    const { content, answers } = props;
    return (
        <div className="mb-1 flex flex-row justify-between border rounded-lg p-2">
            <div>
                <Label className="font-medium">{content}</Label>
                <div className="flex flex-col">
                    {answers.map((ele) => {
                        return (
                            <Label
                                key={ele.id}
                                className={getAnswerStyle(ele.correct)}
                            >
                                {ele.content}
                            </Label>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <Button className="bg-blue-500"><PencilLine /></Button>
                <Button className="bg-red-500"><X /></Button>
            </div>
        </div>
    );
}

export function Right() {
    return (
        <div className="w-1/2">
            <Card>
                <CardHeader className="overflow-y-scroll max-h-[350px]">
                    {data.map((ele) => (
                        <Question key={ele.answers.toString()} {...ele} />
                    ))}
                </CardHeader>
            </Card>
        </div>
    );
}
