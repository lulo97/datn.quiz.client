import {
    DifficultLevel,
    EducationLevel,
    Point,
    SubSubject,
    Subject,
    Type,
    Language,
} from "@/InterfacesDatabase";
import {
    QuestionDetail,
    Action,
    ActionType,
    getNewAnswer,
    getInitalState,
} from "./Utils";
import { toast } from "react-toastify";

export function reducer(state: QuestionDetail, action: Action) {
    switch (action.type) {
        case ActionType.Reset: {
            return getInitalState();
        }
        case ActionType.ChangeUserId: {
            const UserId = action.payload;
            return { ...state, UserId: UserId };
        }
        case ActionType.ChangeQuestion: {
            const QuestionContent = action.payload;
            return { ...state, Content: QuestionContent };
        }
        case ActionType.AddAnswer: {
            const _Answers = [
                ...state.Answers,
                getNewAnswer(state.QuestionId, false),
            ];
            return {
                ...state,
                Answers: _Answers,
            };
        }
        case ActionType.ChangeAnswer: {
            const { AnswerId, Content } = action.payload;
            const is_content_unique = state.Answers.every((ele) => {
                if (Content == "") return true;
                if (ele.AnswerId == AnswerId) return true;
                return ele.Content != Content;
            });

            if (!is_content_unique) {
                toast.warning("Hai lựa chọn giống nhau", { delay: 100 });
                return state;
            }
            const _Answers = state.Answers.map((ele) => {
                if (ele.AnswerId != AnswerId) return ele;
                return { ...ele, Content: Content };
            });
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
            const correct_answers = state.Answers.filter(
                (ele) => ele.IsCorrect
            );
            const current_answer = state.Answers.find(
                (ele) => ele.AnswerId === AnswerId
            );
            if (correct_answers.length == 1 && current_answer?.IsCorrect) {
                // Don't allow toggle last correct answer
                toast.warning("Cần ít nhất một lựa chọn đúng", { delay: 100 });
                return state;
            }
            let _Answers;
            if (state.Type?.Name === "Nhiều đáp án") {
                _Answers = state.Answers.map((ele) => {
                    if (ele.AnswerId != AnswerId) return ele;
                    return { ...ele, IsCorrect: !ele.IsCorrect };
                });
            } else {
                // Only allow one correct answer
                _Answers = state.Answers.map((ele) => {
                    let _IsCorrect = !ele.IsCorrect;
                    if (ele.AnswerId != AnswerId) _IsCorrect = false;
                    return { ...ele, IsCorrect: _IsCorrect };
                });
            }
            return { ...state, Answers: _Answers };
        }
        case ActionType.ToggleExplain: {
            const ExplainAllow: boolean = !state.ExplainAllow;
            return { ...state, ExplainAllow: ExplainAllow };
        }
        case ActionType.ChangeExplain: {
            const ExplainContent: string = action.payload;
            return { ...state, ExplainContent: ExplainContent };
        }
        case ActionType.ChangeImageFile: {
            const ImageFile: File | null = action.payload;
            return { ...state, ImageFile: ImageFile };
        }
        case ActionType.ChangeImageUrl: {
            const ImageUrl: string = action.payload;
            return { ...state, ImageUrl: ImageUrl };
        }
        case ActionType.ChangeAudioFile: {
            const AudioFile: File | null = action.payload;
            return { ...state, AudioFile: AudioFile };
        }
        case ActionType.ChangeAudioUrl: {
            const AudioUrl: string = action.payload;
            return { ...state, AudioUrl: AudioUrl };
        }
        case ActionType.ChangeType: {
            const Type: Type = action.payload;
            if (Type.Name == "Một đáp án") {
                //Only keep first answer in correct answers
                const updatedAnswers = state.Answers.map((answer) => {
                    const first_correct_answer = state.Answers.find(
                        (ans) => ans.IsCorrect
                    );
                    const FCA_Id = first_correct_answer?.AnswerId;
                    //If this answer is first corect answer
                    const _IsCorrect = answer.AnswerId == FCA_Id;
                    return { ...answer, IsCorrect: _IsCorrect };
                });
                return { ...state, Type: Type, Answers: updatedAnswers };
            }
            return { ...state, Type: Type };
        }
        case ActionType.ChangeSubject: {
            const Subject: Subject = action.payload;
            return { ...state, Subject: Subject };
        }
        case ActionType.ChangeSubSubject: {
            const SubSubject: SubSubject = action.payload;
            return { ...state, SubSubject: SubSubject };
        }
        case ActionType.ChangePenaltyPoint: {
            const PenaltyPoint: Point = action.payload;
            return { ...state, PenaltyPoint: PenaltyPoint };
        }
        case ActionType.ToggleAllowPenalty: {
            const PenaltyAllow = !state.PenaltyAllow;
            return { ...state, PenaltyAllow: PenaltyAllow };
        }
        case ActionType.ChangePoint: {
            const Point: Point = action.payload;
            return { ...state, Point: Point };
        }
        case ActionType.ChangeDifficultLevel: {
            const DifficultLevel: DifficultLevel = action.payload;
            return { ...state, DifficultLevel: DifficultLevel };
        }
        case ActionType.ChangeEducationLevel: {
            const EducationLevel: EducationLevel = action.payload;
            return { ...state, EducationLevel: EducationLevel };
        }
        case ActionType.ChangeLanguage: {
            const Language: Language = action.payload;
            return { ...state, Language: Language };
        }
        default: {
            return state;
        }
    }
}
