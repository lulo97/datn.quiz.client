export enum ActionType {
    ChangeQuiz,
    ChangeName,
    ChangeTimeDMY,
    ChangeStartQuizTimeHMS,
    ChangeStartTimeHMS,
    ChangeCapacity,
    ChangeUserId,
    ChangePasswordAllow,
    ChangePassword,
    ChangePasswordConfirm,
}

export interface Action {
    type: ActionType;
    payload: any;
}
