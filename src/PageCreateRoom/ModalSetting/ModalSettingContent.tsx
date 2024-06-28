import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MyDatePicker } from "./MyDatePicker";
import { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import {
    CreateRoomProps,
    convertDayjsToNumber,
    convertNumberToDayjs,
} from "../Utils";
import { ActionType } from "../Action";
import { CustomCSSProperties } from "@/Utils";

export function ModalSettingContent(props: CreateRoomProps) {
    const { state, dispatch } = props;

    function handleChangeName(Name: string) {
        dispatch({ type: ActionType.ChangeName, payload: Name });
    }

    function handleChangeCapacity(Capacity: number) {
        dispatch({ type: ActionType.ChangeCapacity, payload: Capacity });
    }

    function handleChangePassword(Password: string) {
        dispatch({ type: ActionType.ChangePassword, payload: Password });
    }

    function handleChangePasswordConfirm(Password: string) {
        dispatch({ type: ActionType.ChangePasswordConfirm, payload: Password });
    }

    function handleChangePasswordAllow() {
        dispatch({ type: ActionType.ChangePasswordAllow, payload: null });
    }

    function handleChangeStartTimeHMS(e: Dayjs) {
        dispatch({
            type: ActionType.ChangeStartTimeHMS,
            payload: convertDayjsToNumber(e),
        });
    }

    function handleChangeStartQuizTimeHMS(e: Dayjs) {
        dispatch({
            type: ActionType.ChangeStartQuizTimeHMS,
            payload: convertDayjsToNumber(e),
        });
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5">
                <div className="w-1/2">
                    <Label>Tên phòng</Label>
                    <Input
                        placeholder="Phòng thi..."
                        value={state.Name ? state.Name : ""}
                        onChange={(event) =>
                            handleChangeName(event.currentTarget.value)
                        }
                    />
                </div>
                <div className="w-1/2">
                    <Label>Số người tối đa</Label>{" "}
                    <Input
                        type="number"
                        placeholder="Số người...."
                        value={state.Capacity ? state.Capacity : ""}
                        onChange={(event) =>
                            handleChangeCapacity(
                                Number(event.currentTarget.value)
                            )
                        }
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <Label>Mật khẩu truy cập</Label>
                    <div className="flex items-center gap-3">
                        <Label>Bật cài đặt mật khẩu</Label>
                        <Checkbox
                            checked={state.PasswordAllow}
                            onClick={handleChangePasswordAllow}
                        />
                    </div>
                </div>
                <Input
                    disabled={!state.PasswordAllow}
                    type="text"
                    style={
                        {
                            WebkitTextSecurity: "disc",
                        } as CustomCSSProperties
                    }
                    placeholder="Mật khẩu..."
                    value={state.Password ? state.Password : ""}
                    onChange={(event) =>
                        handleChangePassword(event.currentTarget.value)
                    }
                />
            </div>
            <div>
                <Label>Xác nhận mật khẩu</Label>
                <Input
                    disabled={!state.PasswordAllow}
                    type="text"
                    style={
                        {
                            WebkitTextSecurity: "disc",
                        } as CustomCSSProperties
                    }
                    placeholder="Mật khẩu..."
                    value={state.PasswordConfirm ? state.PasswordConfirm : ""}
                    onChange={(event) =>
                        handleChangePasswordConfirm(event.currentTarget.value)
                    }
                />
            </div>

            <div className="flex flex-row justify-between items-end">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-between gap-1">
                        <Label>Ngày tạo phòng</Label>
                        <MyDatePicker state={state} dispatch={dispatch} />
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                        <Label>Giờ vào phòng</Label>
                        <TimePicker
                            disabled={state.TimeDMY ? false : true}
                            className="h-full"
                            value={convertNumberToDayjs(state.StartTimeHMS)}
                            onChange={(e) => handleChangeStartTimeHMS(e)}
                        />
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                        <Label>Giờ làm bài</Label>
                        <TimePicker
                            disabled={state.TimeDMY ? false : true}
                            className="h-full"
                            onChange={(e) => handleChangeStartQuizTimeHMS(e)}
                            value={convertNumberToDayjs(state.StartQuizTimeHMS)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
