import { Button } from "@/components/ui/button";
import { ActionType, CreateQuizProps, QIForInsert, getRecords } from "../Utils";
import { toast } from "react-toastify";
import { getErrors } from "@/PageCreateQuiz/Utils";
import { Quiz, QuizInformation, QuizQuestion } from "@/InterfacesDatabase";
import { uploadFile } from "@/api/Upload";

import { createOne as createOneQuiz } from "../Api/Quiz";
import { createOne as createOneQuizInformation } from "../Api/QuizInformation";
import { createOne as createOneQuizQuestion } from "../Api/QuizQuestion";

export function CreateButton(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const handleCreate = async (
        qr: Quiz,
        qir: QIForInsert,
        qq: QuizQuestion[]
    ) => {
        try {
            await createOneQuiz(qr);
            await createOneQuizInformation(qir);
            for (const quizquest of qq) {
                await createOneQuizQuestion(quizquest);
            }
            toast.success("Tạo đề thi thành công!");
            dispatch({ type: ActionType.Reset, payload: null });
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tạo đề thi!");
        }
    };

    const handleUploadFile = async (
        file: File | null,
        url: string | null,
        actionType: ActionType
    ) => {
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
            errors.forEach((err: any) => toast.error(err, { delay: 500 }));
            return false;
        }
        return true;
    };

    const handlePostCreate = async () => {
        if (validationData()) {
            await handleUploadFile(
                state.ImageFile,
                state.ImageUrl,
                ActionType.ChangeImageUrl
            );
            const { qr, qir, qq } = getRecords(state);
            await handleCreate(qr, qir, qq);
        }
    };

    return <Button onClick={handlePostCreate}>Tạo đề</Button>;
}
