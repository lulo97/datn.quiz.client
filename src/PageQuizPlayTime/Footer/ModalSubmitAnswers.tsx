import {
    LocalPlaying,
    PlayTime,
    PlayTimeProps,
    caculateScore,
    getSelectedQuestions,
} from "../Utils";

export function ModalSubmitAnswers(props: PlayTimeProps) {
    const { state, dispatch } = props;

    let localPlaying: PlayTime = state;

    const storedData = localStorage.getItem(LocalPlaying);
    if (storedData != null) {
        localPlaying = JSON.parse(storedData);
    }
    const Response = localPlaying.Response;

    const UserResponseDetail = getSelectedQuestions(Response);
    if (!UserResponseDetail) return <div>Đang tải</div>;

    const Score = caculateScore(UserResponseDetail)

    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <label className="block text-lg font-semibold  mb-2">
                Các đáp án đã chọn:
            </label>
            {Score}
            <div>
                {UserResponseDetail.map((ele, idx) => (
                    <div
                        key={ele.QuestionId}
                        className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                        <div className="flex gap-1">
                            <div className="font-semibold">Câu {idx + 1}:</div>
                            <div
                                className="mb-2 text-gray-800"
                                dangerouslySetInnerHTML={{
                                    __html: ele.Content || "",
                                }}
                            ></div>
                        </div>
                        <div className="list-disc pl-5">
                            {ele.Answers.length == 0 && (
                                <li className="text-red-500">
                                    Chưa chọn đáp án
                                </li>
                            )}
                            {ele.Answers.map((answer) => (
                                <li key={answer.AnswerId} className="mb-1">
                                    {answer.Content}
                                </li>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
