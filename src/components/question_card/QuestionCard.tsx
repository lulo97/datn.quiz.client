import { getAnswerStyleBG, VITE_SERVER_PATH } from "@/Utils";
import { Card, CardHeader, CardContent } from "../ui/card";
import {
    getQuestionsWithSelectedAnswers,
    IQuestionsWithSelectedAnswers,
} from "./Utils";
import { Checkbox } from "../ui/checkbox";
import { PlayDetail } from "@/PageQuizResultTime/Utils";

interface Props {
    QuestionsWithSelectedAnswers: IQuestionsWithSelectedAnswers;
    Idx: number;
}

export function QuestionCards(playdetail: PlayDetail) {
    const QuestionsWithSelectedAnswers =
        getQuestionsWithSelectedAnswers(playdetail);
    return (
        <div className="flex flex-col gap-3">
            {QuestionsWithSelectedAnswers.map((ele, idx) => (
                <QuestionCard
                    key={ele.QuestionId}
                    QuestionsWithSelectedAnswers={ele}
                    Idx={idx}
                />
            ))}
        </div>
    );
}

function QuestionCard(props: Props) {
    const { QuestionsWithSelectedAnswers, Idx } = props;
    return (
        <div className="flex flex-col gap-5 ">
            <Card>
                <CardHeader>
                    <div className="flex gap-1 items-center">
                        <div className="font-semibold">Câu {Idx + 1}:</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html:
                                    QuestionsWithSelectedAnswers.Content || "",
                            }}
                        ></div>
                    </div>
                </CardHeader>
                <CardContent className="flex gap-5">
                    <div className="w-full overflow-y-auto h-fit max-h-56 flex flex-col gap-3 p-2 border rounded-lg">
                        {QuestionsWithSelectedAnswers.Answers.map((ele) => {
                            const CorrectClass = getAnswerStyleBG(
                                ele.IsCorrect
                            );
                            const isChecked =
                                QuestionsWithSelectedAnswers.SelectedAnswers.includes(
                                    ele.AnswerId
                                );
                            return (
                                <div
                                    key={ele.AnswerId}
                                    className={`${CorrectClass} flex items-center gap-5 border px-3 py-1 rounded-lg`}
                                >
                                    <Checkbox checked={isChecked} />
                                    <p>{ele.Content}</p>
                                </div>
                            );
                        })}
                        <div>
                            <div className="font-semibold">Giải thích: </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        QuestionsWithSelectedAnswers.Explanation ||
                                        "",
                                }}
                            ></div>
                        </div>
                    </div>
                    {(QuestionsWithSelectedAnswers.ImageUrl ||
                        QuestionsWithSelectedAnswers.AudioUrl) && (
                        <div className="w-1/3 flex flex-col gap-1 justify-between">
                            {QuestionsWithSelectedAnswers.ImageUrl && (
                                <img
                                    className="object-contain rounded-lg max-h-40"
                                    src={
                                        VITE_SERVER_PATH +
                                        QuestionsWithSelectedAnswers.ImageUrl
                                    }
                                ></img>
                            )}
                            {QuestionsWithSelectedAnswers.AudioUrl && (
                                <audio controls className="w-full">
                                    <source
                                        type="audio/ogg"
                                        src={
                                            VITE_SERVER_PATH +
                                            QuestionsWithSelectedAnswers.AudioUrl
                                        }
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
