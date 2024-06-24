import { Label } from "@/components/ui/label";
import { RoomDetail } from "../Utils";
import { QuizCardDetail } from "./QuizCardDetailed";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SORT } from "@/Utils";

export function Header(room: RoomDetail) {
    const navigate = useNavigate();
    function handlePlayQuiz() {
        navigate(
            `/QuizPlayTime/${room.Quiz.QuizId}/${SORT.TIME_DEFAULT}/${room.RoomId}`
        );
    }
    return (
        <div className="flex flex-col justify-between gap-5 min-h-fit h-[80vh]">
            <div className="flex justify-between items-start gap-2">
                <div className="h-full w-1/2 flex flex-col justify-end border rounded-lg py-1 px-3">
                    <div className="flex items-center gap-2 text-nowrap">
                        <Label>Tên phòng:</Label>
                        <div>{room.Name}</div>
                    </div>
                    <div className="flex items-center gap-2 text-nowrap">
                        <Label>Thời gian làm bài: </Label>
                        <div>{room.Quiz.Time?.Value} phút</div>
                    </div>
                    <div className="flex items-center gap-2 text-nowrap">
                        <Label>Số lượng người chơi: </Label>
                        <div>{room.Capacity}</div>
                    </div>
                </div>

                <div className="border rounded-lg py-1 px-3 w-1/2 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2 text-nowrap">
                        <Label>Ngày mở phòng:</Label>
                        <div>{room.StartTime.toString().split(" ")[0]}</div>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-nowrap">
                        <Label>Thời gian bắt đầu phòng:</Label>
                        <div>
                            {
                                room.StartTime.toString()
                                    .split(" ")[1]
                                    .split(".")[0]
                            }
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-nowrap">
                        <Label>Thời gian kết thúc phòng: </Label>
                        <div>
                            {" "}
                            {
                                room.EndTime.toString()
                                    .split(" ")[1]
                                    .split(".")[0]
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-fit border rounded-xl bg-gray-200 p-1">
                <QuizCardDetail {...room} />
            </div>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                    <Label>Chủ phòng:</Label>
                    <div className="hover:underline">{room.User.Fullname}</div>
                </div>
                <Button onClick={handlePlayQuiz}>Làm bài</Button>
            </div>
        </div>
    );
}
