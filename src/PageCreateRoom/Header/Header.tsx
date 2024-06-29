import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModalSetting } from "../ModalSetting/ModalSetting";
import { ModalFindQuiz } from "./ModalFindQuiz";
import {
    CreateRoomProps,
    getErrors,
    getRecords,
    numberToDateStringHSM,
    numberToDateStringYMD,
} from "../Utils";
import { QuizCardDetail } from "./QuizCardDetailed";
import { ActionType } from "../Action";
import { toast } from "react-toastify";
import { createOne } from "../../api/Room";
import { useNavigate } from "react-router-dom";

export function Header(props: CreateRoomProps) {
    const navigate = useNavigate();
    const { state, dispatch } = props;

    function handleChangeName(Name: string) {
        dispatch({ type: ActionType.ChangeName, payload: Name });
    }

    async function handleCreate() {
        const errors = getErrors(state);
        for (let i = 0; i < errors.length; i++) {
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    toast.warning(errors[i]);
                    resolve();
                }, 100 * i);
            });
        }
        if (errors.length === 0) {
            try {
                const record = getRecords(state);
                await createOne(record);
                toast.success("Tạo phòng thành công!");
                navigate(`/quan-tri-phong/${record.RoomId}`);
            } catch (error) {
                toast.success("Tạo phòng thất bại!");
                console.error(error);
            }
        }
    }

    return (
        <div className="flex flex-col justify-between gap-5 min-h-[80vh]">
            <div className="h-full flex justify-between gap-2">
                <div className="w-full flex flex-col gap-1 border rounded-md px-3">
                    <Label className="mt-2">Tên phòng</Label>
                    <Input
                        placeholder="Phòng thi..."
                        value={state.Name || ""}
                        onChange={(event) =>
                            handleChangeName(event.currentTarget.value)
                        }
                    />
                    <div className="flex w-full justify-between my-2">
                        <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                            <Label>Thời gian mở làm bài: </Label>
                            <div>
                                {numberToDateStringHSM(state.StartQuizTime)}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                            <Label>Số người tối đa: </Label>
                            <div>{state.Capacity || ""}</div>
                        </div>
                    </div>
                </div>

                <div className="border rounded-md px-3 flex flex-col justify-evenly">
                    <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                        <Label>Ngày mở phòng:</Label>
                        <div>{numberToDateStringYMD(state.StartTime)}</div>
                    </div>
                    <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                        <Label>Thời gian bắt đầu phòng:</Label>
                        <div>{numberToDateStringHSM(state.StartTime)}</div>
                    </div>
                    <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                        <Label>Thời gian kết thúc phòng: </Label>
                        <div>{numberToDateStringHSM(state.EndTime)}</div>
                    </div>
                </div>
            </div>

            <div className="h-full border rounded-md bg-gray-200 shadow p-1">
                <QuizCardDetail state={state} dispatch={dispatch} />
            </div>

            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-5">
                    <ModalSetting state={state} dispatch={dispatch} />
                    <ModalFindQuiz state={state} dispatch={dispatch} />
                </div>
                <Button onClick={handleCreate}>Tạo phòng</Button>
            </div>
        </div>
    );
}
