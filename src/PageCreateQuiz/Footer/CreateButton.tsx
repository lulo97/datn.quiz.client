import { Button } from "@/components/ui/button";
import { CreateQuizProps, getRecords } from "../Utils";
import { toast } from "react-toastify";
import { getErrors } from "@/PageCreateQuiz/Utils";
import { uploadFile } from "@/api/Upload";
import { ActionType } from "../Action";
import { InterfaceAPI, createOne } from "../API";

export function CreateButton(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const handleCreate = async (data: InterfaceAPI) => {
        const id = toast.loading("Đang tạo đề...");
        try {
            const result = await createOne(data);
            if (!result || "error" in result) {
                toast.update(id, {
                    render: "Tạo thất bại!",
                    type: "error",
                    isLoading: false,
                    autoClose: 1000,
                });
                console.log(result);
                return;
            } else {
                toast.update(id, {
                    render: "Tạo thành công!",
                    type: "success",
                    isLoading: false,
                    autoClose: 1000,
                });
                dispatch({ type: ActionType.Reset, payload: null });
            }
        } catch (error) {
            toast.update(id, {
                render: "Tạo thất bại!",
                type: "error",
                isLoading: false,
                autoClose: 1000,
            });
            console.error(error);
        }
    };

    const handleUploadFile = async (file: File | null, url: string | null) => {
        if (file && !url) {
            try {
                const ImageUrl = await uploadFile(file);
                return ImageUrl;
            } catch (error) {
                console.error(error);
            }
        }
        return null;
    };

    const handlePostCreate = async () => {
        const errors = getErrors(state);
        for (let i = 0; i < errors.length; i++) {
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    toast.warning(errors[i]);
                    resolve();
                }, 100 * i);
            });
        }
        if (errors.length > 0) return;
        const ImageUrl = await handleUploadFile(
            state.ImageFile,
            state.ImageUrl
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!ImageUrl) {
            toast.error("Lỗi tải file!");
            return;
        }
        const { QuizRecord, QuizInfoRecord, QuizQuestionRecords } =
            getRecords(state);
        await handleCreate({
            QuizRecord,
            QuizInfoRecord,
            QuizQuestionRecords,
            ImageUrl,
        });
    };

    return <Button onClick={handlePostCreate}>Tạo đề</Button>;
}
