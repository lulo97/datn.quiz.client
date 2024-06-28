import { Room } from "@/InterfacesDatabase";
import { getObjectId, getUUID } from "@/Utils";
import { Action } from "./Action";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { getInitalState as getInitalQuiz } from "@/PageCreateQuiz/Utils";
import dayjs, { Dayjs } from "dayjs";
import { minutesToMilliseconds } from "date-fns";

export interface CreateRoomDetail extends Omit<Room, "CreatedAt" | "QuizId"> {
    Quiz: QuizDetail;
    PasswordAllow: boolean;
    PasswordConfirm: string;
    TimeDMY: number;
    StartTimeHMS: number;
    StartQuizTimeHMS: number;
}

export function getInitalState(): CreateRoomDetail {
    return {
        RoomId: getUUID(),
        Quiz: getInitalQuiz(),
        UserId: "",
        Password: "",
        PasswordConfirm: "",
        PasswordAllow: false,
        Name: "",
        StartTime: -1,
        StartQuizTime: -1,
        EndTime: -1,
        TimeDMY: -1,
        StartTimeHMS: -1,
        StartQuizTimeHMS: -1,
        Capacity: 10,
    };
}

export interface CreateRoomProps {
    state: CreateRoomDetail;
    dispatch: React.Dispatch<Action>;
}

export function getErrors(state: CreateRoomDetail): string[] {
    const errors: string[] = [];
    if (!state.RoomId) {
        errors.push("Mã phòng trống!");
    }
    if (!state.UserId) {
        errors.push("Mã người tạo phòng trống!");
    }
    if (!state.Name) {
        errors.push("Tên phòng trống!");
    }
    if (!state.StartTime || state.StartTime == -1) {
        errors.push("Giờ bắt đầu vào phòng trống!");
    }
    if (!state.StartQuizTime || state.StartQuizTime == -1) {
        errors.push("Giờ bắt đầu làm bài trống!");
    }
    if (!state.EndTime || state.EndTime == -1) {
        errors.push("Giờ kết thúc phòng trống!");
    }
    if (state.StartTime + minutesToMilliseconds(1) >= state.StartQuizTime) {
        errors.push("Giờ làm đề phải lớn hơn giờ tạo phòng ít nhất 1 phút!");
    }
    if (!state.Capacity || state.Capacity <= 0) {
        errors.push("Số người tối đa không hợp lệ!");
    }
    if (state.PasswordAllow == true && !state.Password) {
        errors.push("Mật khẩu trống!");
    }
    if (
        state.PasswordAllow == true &&
        state.Password != state.PasswordConfirm
    ) {
        errors.push("Mật khẩu xác nhận không khớp!");
    }
    if (!state.Quiz.Questions.length) {
        errors.push("Đề thi trống!");
    }
    return errors;
}

// Convert Date object to Unix timestamp (milliseconds)
export function convertDateToNumber(timeDate: Date): number {
    return timeDate.getTime();
}

// Convert Unix timestamp (milliseconds) to Date object
export function convertNumberToDate(timeNumber: number): Date {
    return new Date(timeNumber);
}

// Convert Dayjs object to Unix timestamp (milliseconds)
export function convertDayjsToNumber(timeDayjs: Dayjs): number {
    return timeDayjs.valueOf();
}

// Convert Unix timestamp (milliseconds) to Dayjs object
export function convertNumberToDayjs(timeNumber: number): Dayjs {
    return dayjs(timeNumber);
}

export function getRecords(state: CreateRoomDetail): Omit<Room, "CreatedAt"> {
    const record = {
        RoomId: state.RoomId,
        QuizId: state.Quiz.QuizId,
        UserId: state.UserId,
        Name: state.Name,
        StartTime: state.StartTime,
        StartQuizTime: state.StartQuizTime,
        EndTime: state.EndTime,
        Capacity: state.Capacity,
        Password: state.PasswordAllow ? state.Password : null,
    };
    return record;
}

export function numberToDateStringHSM(timeNumber: number): string {
    if (timeNumber == -1) return "NULL";
    return dayjs(timeNumber).format("HH:mm:ss");
}

export function numberToDateStringYMD(timeNumber: number): string {
    if (timeNumber == -1) return "NULL";
    return dayjs(timeNumber).format("YYYY/MM/DD");
}
