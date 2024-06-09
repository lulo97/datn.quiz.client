import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BACKEND_URL, VITE_SERVER_PATH, getAnswerStyleBG } from "@/Utils";
import { IQWSA, PlayDetail, getQWSA } from "../Utils";

export function Content(data: PlayDetail) {
    const QWSAs = getQWSA(data);
    return (
        <div>
            <Card className="bg-gray-200">
                <CardHeader className="flex flex-col gap-3">
                    {QWSAs.map((ele, idx) => (
                        <QuestionCard
                            key={ele.QuestionId}
                            QWSA={ele}
                            Idx={idx}
                        />
                    ))}
                </CardHeader>
            </Card>
        </div>
    );
}

interface Props {
    QWSA: IQWSA;
    Idx: number;
}

function QuestionCard(props: Props) {
    const { QWSA, Idx } = props;
    const API_URL = BACKEND_URL + "public/Image/DummyImage.png";
    return (
        <div className="flex flex-col gap-5 ">
            <Card>
                <CardHeader>
                    <div className="flex gap-1 items-center">
                        <div className="font-semibold">Câu {Idx + 1}:</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: QWSA.Content || "",
                            }}
                        ></div>
                    </div>
                </CardHeader>
                <CardContent className="flex gap-5">
                    <div className="w-full overflow-y-auto h-fit max-h-56 flex flex-col gap-3 p-2 border rounded-lg">
                        {QWSA.Answers.map((ele) => {
                            const CorrectClass = getAnswerStyleBG(
                                ele.IsCorrect
                            );
                            const isChecked = QWSA.SelectedAnswers.includes(
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
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Giải thích: </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: QWSA.Explanation || "",
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col gap-1 justify-between">
                        <img
                            className="object-contain rounded-lg max-h-40"
                            src={
                                QWSA.ImageUrl
                                    ? VITE_SERVER_PATH + QWSA.ImageUrl
                                    : API_URL
                            }
                        ></img>
                        <audio controls className="w-full">
                            <source
                                type="audio/ogg"
                                src={QWSA.AudioUrl || ""}
                            ></source>
                        </audio>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
