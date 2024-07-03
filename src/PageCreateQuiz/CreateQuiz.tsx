import { Card } from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { useEffect, useReducer } from "react";
import { reducer } from "./Reducer";
import { CreateQuizProps, getInitalState } from "./Utils";
import { useUser } from "@clerk/clerk-react";
import { User } from "@/InterfacesDatabase";
import { getOneByClerkId } from "@/api/User";
import { ActionType } from "./Action";

export function CreateQuiz(props: CreateQuizProps) {
    const { DataFromUpdate } = props;
    let initalState = getInitalState();
    if (DataFromUpdate) {
        initalState = {
            CurrentUser: initalState.CurrentUser,
            Questions: DataFromUpdate.Questions,
            Name: DataFromUpdate.Name,
            Description: DataFromUpdate.Description,
            ImageUrl: DataFromUpdate.ImageUrl,
            ImageFile: DataFromUpdate.ImageFile,
            Time: DataFromUpdate.Time,
            IsPublic: DataFromUpdate.IsPublic,
            EducationLevel: DataFromUpdate.EducationLevel,
            Subject: DataFromUpdate.Subject,
            UserId: DataFromUpdate.UserId,
            QuizInformationId: DataFromUpdate.QuizInformationId,
            QuizId: DataFromUpdate.QuizId,
            Attempts: DataFromUpdate.Attempts,
            IsDeleted: DataFromUpdate.IsDeleted,
            UserVertify: DataFromUpdate.UserVertify,
            VerifiedAt: DataFromUpdate.VerifiedAt,
        };
    }
    const [state, dispatch] = useReducer(reducer, getInitalState());
    const { user } = useUser();

    useEffect(() => {
        async function fetchUserData() {
            if (!user) return;
            const ClerkId = user.id;
            if (!ClerkId) return;
            const currentUser: User = await getOneByClerkId(ClerkId);
            dispatch({
                type: ActionType.SetCurrentUser,
                payload: currentUser,
            });
        }
        fetchUserData();
    }, []);

    return (
        <div className="w-full mb-16">
            <Card className={`flex flex-col px-6 py-2 gap-2`}>
                <div>
                    <Header state={state} dispatch={dispatch} />
                </div>
                <Content state={state} dispatch={dispatch} />
            </Card>
            <div className="shadow-inner fixed p-2 left-0 right-0 bottom-0 bg-white">
                <Footer state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}
