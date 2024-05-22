import {
    DifficultLevel,
    EducationLevel,
    Point,
    SubSubject,
    Subject,
    Type,
    Language,
} from "@/InterfacesDatabase";
import { ICreateQuestion, Action, ActionType, spawnAnswer } from "./Utils";

export function reducer(state: ICreateQuestion, action: Action) {
    switch (action.type) {
        case ActionType.ChangeQuestion: {
            const QuestionContent = action.payload;
            return { ...state, Content: QuestionContent };
        }
        case ActionType.AddAnswer: {
            const _Answers = [
                ...state.Answers,
                spawnAnswer(state.QuestionId, false),
            ];
            return {
                ...state,
                Answers: _Answers,
            };
        }
        case ActionType.ChangeAnswer: {
            const { AnswerId, Content } = action.payload;
            const _Answers = state.Answers.map((ele) =>
                ele.AnswerId === AnswerId ? { ...ele, Content: Content } : ele
            );
            return { ...state, Answers: _Answers };
        }
        case ActionType.DeleteAnswer: {
            if (state.Answers.length == 1) return state;
            const AnswerId = action.payload;
            const _Answers = state.Answers.filter(
                (ele) => ele.AnswerId != AnswerId
            );
            return { ...state, Answers: _Answers };
        }
        case ActionType.ToggleAnswer: {
            const AnswerId = action.payload;
            let updatedAnswers;
            if (state.Type?.Name === "Nhiều đáp án") {
                updatedAnswers = state.Answers.map((ele) =>
                    ele.AnswerId === AnswerId
                        ? { ...ele, IsCorrect: !ele.IsCorrect }
                        : ele
                );
            } else {
                // Only allow one correct answer
                updatedAnswers = state.Answers.map((ele) =>
                    ele.AnswerId === AnswerId
                        ? { ...ele, IsCorrect: !ele.IsCorrect }
                        : { ...ele, IsCorrect: false }
                );
            }
            return { ...state, Answers: updatedAnswers };
        }
        case ActionType.ToggleExplain: {
            const ExplainAllow: boolean = !state.ExplainAllow;
            return { ...state, ExplainAllow: ExplainAllow };
        }
        case ActionType.ChangeExplain: {
            const ExplainContent: string = action.payload;
            return { ...state, ExplainContent: ExplainContent };
        }
        case ActionType.UploadImage: {
            const ImageFile: File | null = action.payload;
            return { ...state, ImageFile: ImageFile };
        }
        case ActionType.UrlImageChange: {
            const ImageUrl: string = action.payload;
            return { ...state, ImageUrl: ImageUrl };
        }
        case ActionType.UploadAudio: {
            const AudioFile: File | null = action.payload;
            return { ...state, AudioFile: AudioFile };
        }
        case ActionType.UrlAudioChange: {
            const AudioUrl: string = action.payload;
            return { ...state, AudioUrl: AudioUrl };
        }
        case ActionType.TypeChange: {
            const Type: Type = action.payload;
            if (Type.Name == "Một đáp án") {
                const updatedAnswers = state.Answers.map((answer) => ({
                    ...answer,
                    IsCorrect:
                        answer.AnswerId ===
                        state.Answers.find((ans) => ans.IsCorrect)?.AnswerId,
                }));
                return { ...state, Type: Type, Answers: updatedAnswers };
            }
            if (Type.Name == "Nhiều đáp án") {
                //console.log(state)
            }
            return { ...state, Type: Type };
        }
        case ActionType.SubjectChange: {
            const Subject: Subject = action.payload;
            return { ...state, Subject: Subject };
        }
        case ActionType.SubSubjectChange: {
            const SubSubject: SubSubject = action.payload;
            return { ...state, SubSubject: SubSubject };
        }
        case ActionType.PenaltyPointChange: {
            const PenaltyPoint: Point = action.payload;
            return { ...state, PenaltyPoint: PenaltyPoint };
        }
        case ActionType.TogglePenaltyPoint: {
            const PenaltyAllow = !state.PenaltyAllow;
            return { ...state, PenaltyAllow: PenaltyAllow };
        }
        case ActionType.PointChange: {
            const Point: Point = action.payload;
            return { ...state, Point: Point };
        }
        case ActionType.DifficultLevelChange: {
            const DifficultLevel: DifficultLevel = action.payload;
            return { ...state, DifficultLevel: DifficultLevel };
        }
        case ActionType.EducationLevelChange: {
            const EducationLevel: EducationLevel = action.payload;
            return { ...state, EducationLevel: EducationLevel };
        }
        case ActionType.LanguageChange: {
            const Language: Language = action.payload;
            return { ...state, Language: Language };
        }
        default: {
            return state;
        }
    }
}
