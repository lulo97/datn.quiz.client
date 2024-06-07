import { Button } from "@/components/ui/button";
import {
    CreateQuestionProps,
    ActionType,
    getErrors,
    getRecords,
} from "../Utils";
import {
    Question as IQuestion,
    Answer as IAnswer,
    QuestionInformation as IQI,
    User,
} from "@/InterfacesDatabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOne as createOneQuestion } from "../Api/Question";
import { createOne as createOneAnswer } from "../Api/Answer";
import { createOne as createOneQuestionInformation } from "../Api/QuestionInformation";
import { uploadFileXHR } from "../../api/Upload";
import { useUser } from "@clerk/clerk-react";
import { getOneByClerkId } from "@/api/User";

export function CreateButton({ state, dispatch }: CreateQuestionProps) {
    const { user } = useUser()
    
    const handleCreate = async (
        qr: IQuestion,
        qir: Omit<IQI, "CreatedAt" | "UpdatedAt">,
        ars: IAnswer[],
        ImageUrl: string = "",
        AudioUrl: string = ""
    ) => {
        try {
            await createOneQuestion(qr);
            await createOneQuestionInformation(qir, ImageUrl, AudioUrl);
            for (const answer of ars) {
                await createOneAnswer(answer);
            }
            toast.success("Tạo câu hỏi thành công!");
            dispatch({ type: ActionType.Reset, payload: null });
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tạo câu hỏi!");
        }
    };

    const handleUploadFile = async (
        file: File | null,
        url: string | null,
    ) => {
        if (file && !url) {
            try {
                const path = await uploadFileXHR(file);
                return path
            } catch (error) {
                toast.error("Có lỗi xảy ra khi tải lên tệp!");
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

    const handlePostCreate = async () => {
        const errors = getErrors(state);
        if (isDataValid(errors)) {
            const ImageUrl = await handleUploadFile(
                state.ImageFile,
                state.ImageUrl,
            );
            const AudioUrl = await handleUploadFile(
                state.AudioFile,
                state.AudioUrl,
            );
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (state.ImageFile && !ImageUrl) {
                toast.warning("Lỗi tải ImageUrl!")
                return;
            }
            if (state.AudioFile && !AudioUrl) {
                toast.warning("Lỗi tải AudioUrl!")
                return;
            }
            const { qr, qir, ars } = getRecords(state);
            await handleCreate(qr, qir, ars, ImageUrl, AudioUrl);
        }
    };

    return (
        <div>
            <Button onClick={handlePostCreate}>Xác nhận tạo</Button>
        </div>
    );
}
