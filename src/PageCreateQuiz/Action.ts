export enum ActionType {
    Reset,
    ChangeName,
    ChangeDescription,
    ChangeImageUrl,
    ChangeImageFile,
    ChangeTime,
    ToggleIsPublic,
    ChangeEducationLevel,
    ChangeSubject,
    AddQuestion,
    DeleteQuestion,
    ChangeQuestion,
    SetCurrentUser,
    ReorderQuestions,
}

export interface Action {
    type: ActionType;
    payload: any;
}
