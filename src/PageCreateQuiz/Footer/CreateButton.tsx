import { Button } from "@/components/ui/button";
import { CreateQuizProps, getRecords } from "../Utils";
import { Id, toast } from "react-toastify";
import { getErrors } from "@/PageCreateQuiz/Utils";
import { handleUpdate } from "./handleUpdate";
import { handleCreate } from "./handleCreate";
import { showToastError } from "./showToastError";
import { handleUploadFile } from "./handleUploadFile";

export function CreateButton(props: CreateQuizProps) {
    const { state, dispatch, IsUpdate, FetchDataAfterUpdate } = props;
    let toastId: null | Id = null;

    const handlePostCreate = async () => {
        //Get errors, if have error then return
        const errors = getErrors(state);
        showToastError(errors);
        if (errors.length != 0) return;

        //Initialize toast
        if (IsUpdate) {
            toastId = toast.loading("Đang tạo đề...");
        } else {
            toastId = toast.loading("Đang sửa đề...");
        }

        let ImageUrl = await handleUploadFile(
            state.ImageFile,
            state.ImageUrl
        );

        //Wait 1 second for upload file
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (state.ImageFile && !ImageUrl) {
            toast.update(toastId, {
                render: "Lỗi tải file!",
                type: "error",
                isLoading: false,
                autoClose: 1000,
            });
            return;
        }

        if (ImageUrl == undefined) ImageUrl = "";

        const { QuizRecord, QuizInfoRecord, QuizQuestionRecords } =
            getRecords(state);

        const dataForBackend = {
            QuizRecord,
            QuizInfoRecord,
            QuizQuestionRecords,
            ImageUrl,
        };
        const params = {
            toastId,
            dataForBackend,
            IsUpdate,
            dispatch,
            FetchDataAfterUpdate,
        };
        if (IsUpdate) {
            await handleUpdate(params);
        } else {
            await handleCreate(params);
        }
    };

    return (
        <Button onClick={handlePostCreate}>
            {IsUpdate ? "Sửa đề" : "Tạo đề"}
        </Button>
    );
}
