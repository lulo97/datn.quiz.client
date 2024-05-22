import { Button } from "@/components/ui/button";
import { CreateQuestionProps, ActionType, getErrors, getRecords } from "../Utils";
import {
    Question as IQuestion,
    Answer as IAnswer,
    QuestionInformation as IQI,
} from "@/InterfacesDatabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOne as createOneQuestion } from "../Api/Question";
import { createOne as createOneAnswer } from "../Api/Answer";
import { createOne as createOneQuestionInformation } from "../Api/QuestionInformation";
import { uploadFile } from "../Api/Upload";

export function CreateButton(props: CreateQuestionProps) {
    const { state, dispatch } = props;

    async function handleCreate(
        qr: IQuestion,
        qir: Omit<IQI, "CreatedAt" | "UpdateAt">,
        ars: IAnswer[]
    ) {
        await createOneQuestion(qr);
        await createOneQuestionInformation(qir);

        for (const ele of ars) {
            await createOneAnswer(ele);
        }
    }

    async function handleUploadFile() {
        if (state.ImageUrl == null || state.ImageUrl == "") {
            if (state.ImageFile != null) {
                const image_path = await uploadFile(state.ImageFile);
                dispatch({
                    type: ActionType.UrlImageChange,
                    payload: image_path,
                });
            }
        }
        if (state.AudioUrl == null || state.AudioUrl == "") {
            if (state.AudioFile != null) {
                const audio_path = await uploadFile(state.AudioFile);
                dispatch({
                    type: ActionType.UrlAudioChange,
                    payload: audio_path,
                });
            }
        }
    }

    function validationData() {
        const errors = getErrors(state);
        if (errors.length > 0) {
            errors.forEach((err) => toast.error(err, { delay: 500 }));
            return false;
        } else {
            return true;
        }
    }

    async function handlePostCreate() {
        let isContinue = false;
        isContinue = validationData();
        if (isContinue) {
            await handleUploadFile();
            const { qr, qir, ars } = getRecords(state);
            await handleCreate(qr, qir, ars);
        }
    }

    return (
        <div>
            <Button onClick={handlePostCreate}>Xác nhận tạo</Button>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
