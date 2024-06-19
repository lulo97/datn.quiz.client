import { UserResponseDetail } from "../Utils/Utils";
import { getAnswerStyleBG } from "@/Utils";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
    userResponseDetail: UserResponseDetail;
}

function toBool(input: any) {
    return input.toString() == "1" || input.toString() == true;
}

export function QuestionCards(props: Props) {
    const { userResponseDetail } = props;
    return (
        <div className="overflow-y-scroll w-full ml-10 my-1 flex flex-col gap-2">
            {userResponseDetail.Response.map((ele, Idx) => {
                return (
                    <div key={Idx} className="">
                        <div className="flex gap-1">
                            <div className="font-semibold">Câu {Idx + 1}:</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: ele.Content || "",
                                }}
                            ></div>
                        </div>
                        <div className="flex flex-col gap-1">
                            {ele.Answers.map((ans, ans_i) => {
                                const CorrectClass = getAnswerStyleBG(
                                    ans.IsCorrect
                                );

                                return (
                                    <div
                                        key={ans_i}
                                        className={`${CorrectClass} px-1 rounded-lg flex items-center gap-1`}
                                    >
                                        <Checkbox checked={ans.UserChoice} />
                                        <p>{ans.Content}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
