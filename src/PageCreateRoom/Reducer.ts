import dayjs, { Dayjs } from "dayjs";
import { Action, ActionType } from "./Action";
import {
    RoomDetail,
    convertDayjsToNumber,
    convertNumberToDate,
    convertNumberToDayjs,
} from "./Utils";

export function reducer(state: RoomDetail, action: Action): RoomDetail {
    switch (action.type) {
        case ActionType.ChangeCapacity: {
            const Capacity = action.payload;
            return { ...state, Capacity: Capacity };
        }
        case ActionType.ChangeTimeDMY: {
            const TimeDMY: number = action.payload;
            return { ...state, TimeDMY: TimeDMY };
        }
        case ActionType.ChangeStartTimeHMS: {
            const StartTimeHMS: number = action.payload;
            let StartTime: number = state.StartTime;
            if (state.TimeDMY && StartTimeHMS) {
                StartTime = combineDayjs(state.TimeDMY, StartTimeHMS);
            }
            return {
                ...state,
                StartTimeHMS: StartTimeHMS,
                StartTime: StartTime,
            };
        }
        case ActionType.ChangeStartQuizTimeHMS: {
            const StartQuizTimeHMS: number = action.payload;
            let StartQuizTime: number = state.StartQuizTime;
            let EndTime = state.EndTime;
            if (state.TimeDMY && StartQuizTimeHMS) {
                StartQuizTime = combineDayjs(state.TimeDMY, StartQuizTimeHMS);
            }
            if (state.TimeDMY && StartQuizTimeHMS && state.Quiz.Time?.Value) {
                const EndTimeHMS =
                    StartQuizTimeHMS +
                    minuteToMilisecond(state.Quiz.Time.Value);
                EndTime = combineDayjs(state.TimeDMY, EndTimeHMS);
            }
            return {
                ...state,
                StartQuizTimeHMS: StartQuizTimeHMS,
                EndTime: EndTime,
                StartQuizTime: StartQuizTime,
            };
        }

        case ActionType.ChangeName: {
            const Name = action.payload;
            return { ...state, Name: Name };
        }
        case ActionType.ChangeQuiz: {
            const Quiz = action.payload;
            return { ...state, Quiz: Quiz };
        }
        case ActionType.ChangeUserId: {
            const UserId = action.payload;
            return { ...state, UserId: UserId };
        }
        case ActionType.ChangePassword: {
            const Password = action.payload;
            return { ...state, Password: Password };
        }
        case ActionType.ChangePasswordConfirm: {
            const PasswordConfirm = action.payload;
            return { ...state, PasswordConfirm: PasswordConfirm };
        }
        case ActionType.ChangePasswordAllow: {
            return { ...state, PasswordAllow: !state.PasswordAllow };
        }
        default: {
            return state;
        }
    }
}

function minuteToMilisecond(minute: number) {
    return minute * 60 * 1000;
}

function combineDayjs(TimeDMY: number, TimeHMS: number) {
    const TimeDMY_Dayjs: Dayjs = convertNumberToDayjs(TimeDMY);
    const TimeHMS_Dayjs: Dayjs = convertNumberToDayjs(TimeHMS);
    const output: Dayjs = TimeDMY_Dayjs.set("hour", TimeHMS_Dayjs.hour())
        .set("minute", TimeHMS_Dayjs.minute())
        .set("second", TimeHMS_Dayjs.second())
        .set("millisecond", TimeHMS_Dayjs.millisecond());
    return convertDayjsToNumber(output);
}
