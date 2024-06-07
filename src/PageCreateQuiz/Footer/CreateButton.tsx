import { Button } from "@/components/ui/button";
import {
    ActionType,
    CreateQuizProps,
    QIForInsert,
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
        qq: QuizQuestion[], 
        ImageUrl: string
    ) => {
        try {
            await createOneQuiz(qr);
            await createOneQuizInformation(qir, ImageUrl);
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
    ) => {
        if (file && !url) {
            try {
                const ImageUrl = await uploadFileXHR(file, setProgress)
                return ImageUrl
            } catch (error) {
                console.log(error)
            }
        }
        return null;
    };

    function isDataValid(errors: string[]) {
        if (errors.length > 0) {
            errors.forEach((err) => toast.error(err, { delay: 500 }));
            return false;
        }
        return true;
    }

    const handlePostCreate = async () => {
        const errors = getErrors(state);
        if (isDataValid(errors)) {
            const ImageUrl = await handleUploadFile(
                state.ImageFile,
                state.ImageUrl,
            );
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!ImageUrl) {
                toast.warning("Lỗi tải file!")
                return;
            }
            const { qr, qir, qq } = getRecords(state);
            await handleCreate(qr, qir, qq, ImageUrl);
        }
    };

    return <Button onClick={handlePostCreate}>Tạo đề</Button>;
}
