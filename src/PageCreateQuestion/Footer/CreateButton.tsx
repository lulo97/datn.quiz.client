import { Button } from "@/components/ui/button";
import { CreateQuestionProps, ActionType, getErrors, getRecords } from "../Utils";
import { Question as IQuestion, Answer as IAnswer, QuestionInformation as IQI } from "@/InterfacesDatabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOne as createOneQuestion } from "../Api/Question";
import { createOne as createOneAnswer } from "../Api/Answer";
import { createOne as createOneQuestionInformation } from "../Api/QuestionInformation";
import { uploadFile } from "../../api/Upload";

export function CreateButton({ state, dispatch }: CreateQuestionProps) {

    const handleCreate = async (qr: IQuestion, qir: Omit<IQI, "CreatedAt" | "UpdatedAt">, ars: IAnswer[]) => {
        try {
            await createOneQuestion(qr);
            await createOneQuestionInformation(qir);
            for (const answer of ars) {
                await createOneAnswer(answer);
            }
            toast.success("Tạo câu hỏi thành công!");
            dispatch({ type: ActionType.Reset, payload: null });
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tạo câu hỏi!");
        }
    };

    const handleUploadFile = async (file: File | null, url: string | null, actionType: ActionType) => {
        if (file && !url) {
            try {
                const path = await uploadFile(file);
                dispatch({ type: actionType, payload: path });
            } catch (error) {
                toast.error("Có lỗi xảy ra khi tải lên tệp!");
            }
        }
    };

    const validationData = (): boolean => {
        const errors = getErrors(state);
        if (errors.length > 0) {
            errors.forEach(err => toast.error(err, { delay: 500 }));
            return false;
        }
        return true;
    };

    const handlePostCreate = async () => {
        if (validationData()) {
            await handleUploadFile(state.ImageFile, state.ImageUrl, ActionType.ChangeImageUrl);
            await handleUploadFile(state.AudioFile, state.AudioUrl, ActionType.ChangeAudioUrl);
            const { qr, qir, ars } = getRecords(state);
            await handleCreate(qr, qir, ars);
        }
    };

    return (
        <div>
            <Button onClick={handlePostCreate}>Xác nhận tạo</Button>
        </div>
    );
}
