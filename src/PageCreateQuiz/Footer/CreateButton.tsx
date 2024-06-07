import { Button } from "@/components/ui/button";
import {
    ActionType,
    CreateQuizProps,
    QIForInsert,
    getErrorAfterUploadFile,
    getRecords,
} from "../Utils";
import { toast } from "react-toastify";
import { getErrors } from "@/PageCreateQuiz/Utils";
import { Quiz, QuizQuestion } from "@/InterfacesDatabase";
import { uploadFileXHR } from "@/api/Upload";

import { createOne as createOneQuiz } from "../Api/Quiz";
import { createOne as createOneQuizInformation } from "../Api/QuizInformation";
import { createOne as createOneQuizQuestion } from "../Api/QuizQuestion";
import { useState } from "react";

export function CreateButton(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [progress, setProgress] = useState<number>(0);

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
                const path = await uploadFileXHR(file, setProgress)
                dispatch({ type: actionType, payload: path });
            } catch (error) {
                console.log(error)
            }
        }
    };

    function isDataValid(errors: string[]) {
        if (errors.length > 0) {
            errors.forEach((err) => toast.error(err, { delay: 500 }));
            return false;
        }
        return true;
    }

    const handlePostCreate = async (progress: number) => {
        const errors = getErrors(state);
        if (isDataValid(errors)) {
            await handleUploadFile(
                state.ImageFile,
                state.ImageUrl,
                ActionType.ChangeImageUrl
            );

            // Loop until progress reaches 100
            while (progress < 100) {
                console.log(progress)
                await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100 milliseconds
            }

            toast.success("Tải file thành công");
            const error_file = getErrorAfterUploadFile(state);
            if (isDataValid(error_file)) {
                const { qr, qir, qq } = getRecords(state);
                await handleCreate(qr, qir, qq);
            }
        }
    };

    return <Button onClick={() => handlePostCreate(progress)}>{progress}Tạo đề</Button>;
}
