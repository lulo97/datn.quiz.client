import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { QuizDetail } from "@/PageRoomMonitor/Utils";
import { VITE_SERVER_PATH, getAnswerStyleBG } from "@/Utils";

export function Content(quiz: QuizDetail) {
    return (
        <div>
            <Card className="bg-gray-200">
                <CardHeader className="flex flex-col gap-3">
                    {quiz.Questions.map((ele, idx) => (
                        <QuestionCard
                            key={ele.QuestionId}
                            Question={ele}
                            Idx={idx}
                        />
                    ))}
                </CardHeader>
            </Card>
        </div>
    );
}

interface Props {
    Question: QuestionDetail;
    Idx: number;
}

function QuestionCard(props: Props) {
    const { Question, Idx } = props;
    return (
        <div className="flex flex-col gap-5 ">
            <Card>
                <CardHeader>
                    <div className="flex gap-1 items-center">
                        <div className="font-semibold">Câu {Idx + 1}:</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: Question.Content || "",
                            }}
                        ></div>
                    </div>
                </CardHeader>
                <CardContent className="flex gap-5">
                    <div className="w-full h-fit flex flex-col gap-3 p-2 border rounded-l-lg">
                        {Question.Answers.map((ele) => {
                            const CorrectClass = getAnswerStyleBG(
                                ele.IsCorrect
                            );
                            return (
                                <div
                                    key={ele.AnswerId}
                                    className={`${CorrectClass} flex items-center gap-5 border px-3 py-1 rounded-lg`}
                                >
                                    <Checkbox />
                                    <p>{ele.Content}</p>
                                </div>
                            );
                        })}
                        <div className="gap-1">
                            <div className="font-semibold">Giải thích: </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: Question.Explanation || "",
                                }}
                            ></div>
                        </div>
                    </div>

                    {(Question.ImageUrl || Question.AudioUrl) && (
                        <div className="w-1/3 flex flex-col gap-1 justify-between">
                            {Question.ImageUrl && (
                                <img
                                    className="object-contain rounded-lg"
                                    src={VITE_SERVER_PATH + Question.ImageUrl}
                                ></img>
                            )}

                            {Question.AudioUrl && (
                                <audio controls className="w-full">
                                    <source
                                        type="audio/ogg"
                                        src={Question.AudioUrl}
                                    ></source>
                                </audio>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
