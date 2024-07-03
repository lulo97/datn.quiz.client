import { Button } from "@/components/ui/button";
import { CreateQuestionProps, getErrors, getRecords } from "../Utils";
import { Id, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleUpdate } from "./handleUpdate";
import { handleCreate } from "./handleCreate";
import { handleUploadFile } from "./handleUploadFile";
import { showToastError } from "./showToastError";

export function CreateButton(props: CreateQuestionProps) {
    const { state, dispatch, IsUpdate, FetchDataAfterUpdate } = props;
    let toastId: null | Id = null;

    const handlePostCreate = async () => {
        //Get errors, if have error then return
        const errors = getErrors(state);
        showToastError(errors);
        if (errors.length != 0) return;

        //Initialize toast
        if (IsUpdate) {
            toastId = toast.loading("Đang sửa câu hỏi...");
        } else {
            toastId = toast.loading("Đang tạo câu hỏi...");
        }

        //Upload files
        let ImageUrl = await handleUploadFile(state.ImageFile, state.ImageUrl);
        let AudioUrl = await handleUploadFile(state.AudioFile, state.AudioUrl);

        //Wait 1 second for upload file
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //If have file and done upload but ImageUrl is undefined then it must be error
        if (state.ImageFile && !ImageUrl) {
            toast.update(toastId, {
                render: "Lỗi tải file ảnh!",
                type: "error",
                isLoading: false,
                autoClose: 1000,
            });
            return;
        }
        if (state.AudioFile && !AudioUrl) {
            toast.update(toastId, {
                render: "Lỗi tải file âm thanh!",
                type: "error",
                isLoading: false,
                autoClose: 1000,
            });
            return;
        }
        if (ImageUrl == undefined) ImageUrl = "";
        if (AudioUrl == undefined) AudioUrl = "";

        //Breakdown state into records for insert into database
        const { QuestionRecord, QuestionInfoRecord, AnswerRecords } =
            getRecords(state);

        //Run actual create or update data
        const dataForBackend = {
            QuestionRecord,
            QuestionInfoRecord,
            AnswerRecords,
            ImageUrl,
            AudioUrl,
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
        <div>
            <Button onClick={handlePostCreate}>
                {IsUpdate ? "Xác nhận sửa" : "Xác nhận tạo"}
            </Button>
        </div>
    );
}
