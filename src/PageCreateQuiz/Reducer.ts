import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { Action, ActionType, QuizDetail, getInitalState } from "./Utils";

export function reducer(state: QuizDetail, action: Action) {
    switch (action.type) {
        case ActionType.Reset: {
            return getInitalState();
        }
        case ActionType.ChangeUserId: {
            const UserId = action.payload;
            return { ...state, UserId: UserId };
        }
        case ActionType.ChangeName: {
            const Name = action.payload;
            return { ...state, Name: Name };
        }
        case ActionType.ChangeDescription: {
            const Description = action.payload;
            return { ...state, Description: Description };
        }
        case ActionType.ChangeImageUrl: {
            const ImageUrl = action.payload;
            return { ...state, ImageUrl: ImageUrl };
        }
        case ActionType.ChangeImageFile: {
            const ImageFile = action.payload;
            return { ...state, ImageFile: ImageFile };
        }
        case ActionType.ChangeTime: {
            const Time = action.payload;
            return { ...state, Time: Time };
        }
        case ActionType.ChangeQuestionTime: {
            const QuestionTime = action.payload;
            return { ...state, QuestionTime: QuestionTime };
        }
        case ActionType.ToggleIsPublic: {
            return { ...state, IsPublic: !state.IsPublic };
        }
        case ActionType.ChangeEducationLevel: {
            const EducationLevel = action.payload;
            return { ...state, EducationLevel: EducationLevel };
        }
        case ActionType.ChangeSubject: {
            const Subject = action.payload;
            return { ...state, Subject: Subject };
        }
        case ActionType.AddQuestion: {
            const Question: QuestionDetail = action.payload;
            const Questions = [...state.Questions, Question];
            return { ...state, Questions: Questions };
        }
        case ActionType.ChangeQuestion: {
            const Question: QuestionDetail = action.payload;
            const Questions = state.Questions.map((ele) => {
                if (ele.QuestionId != Question.QuestionId) return ele;
                return Question;
            });
            return { ...state, Questions: Questions };
        }
        case ActionType.DeleteQuestion: {
            const QuestionId: string = action.payload;
            const Questions = state.Questions.filter(
                (ele) => ele.QuestionId != QuestionId
            );
            return { ...state, Questions: Questions };
        }
        default:
            return state;
    }
}
