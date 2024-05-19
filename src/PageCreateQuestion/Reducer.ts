import { ICreateQuestion, Action, ActionType } from "./Utils";

export function reducer(state: ICreateQuestion, action: Action) {
    switch (action.type) {
        case ActionType.Create:
            console.log("Create");
            return state;
        case ActionType.PostCreate:
            console.log("PostCreate");
            return state;
        case ActionType.ChangeQuestion:
            console.log("ChangeQuestion");
            return state;
        case ActionType.AddAnswer:
            console.log("AddAnswer");
            return state;
        case ActionType.ChangeAnswer:
            console.log("ChangeAnswer");
            return state;
        case ActionType.DeleteAnswer:
            console.log("DeleteAnswer");
            return state;
        case ActionType.ToggleAnswer:
            console.log("ToggleAnswer");
            return state;
        case ActionType.ToggleExplain:
            console.log("ToggleExplain");
            return state;
        case ActionType.ChangeExplain:
            console.log("ChangeExplain");
            return state;
        case ActionType.UploadImage:
            console.log("UploadImage");
            return state;
        case ActionType.UrlImageChange:
            console.log("UrlImageChange");
            return state;
        case ActionType.UploadAudio:
            console.log("UploadAudio");
            return state;
        case ActionType.UrlAudioChange:
            console.log("UrlAudioChange");
            return state;
        case ActionType.TypeChange:
            console.log("TypeChange");
            return state;
        case ActionType.DifficultyChange:
            console.log("DifficultyChange");
            return state;
        case ActionType.SubjectChange:
            console.log("SubjectChange");
            return state;
        case ActionType.SubSubjectChange:
            console.log("SubSubjectChange");
            return state;
        case ActionType.PenaltyScoreChange:
            console.log("PenaltyScoreChange");
            return state;
        case ActionType.TogglePenaltyScore:
            console.log("TogglePenaltyScore");
            return state;
        case ActionType.ScoreChange:
            console.log("ScoreChange");
            return state;
        case ActionType.DifficultyLevelChange:
            console.log("DifficultyLevelChange");
            return state;
        case ActionType.EducationLevelChange:
            console.log("EducationLevelChange");
            return state;
        default:
            return state;
    }
}
