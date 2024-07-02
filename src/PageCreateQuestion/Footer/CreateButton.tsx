import { Button } from "@/components/ui/button";
import {
    CreateQuestionProps,
    ActionType,
    getErrors,
    getRecords,
} from "../Utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InterfaceAPI, createOne, updateOne } from "../API";
import { uploadFile } from "@/api/Upload";

export function CreateButton(props: CreateQuestionProps) {
    const { state, dispatch, IsUpdate, FetchDataAfterUpdate } = props;

    const handleCreateOrUpdate = async (data: InterfaceAPI) => {
        const id = toast.loading(
            IsUpdate ? "Đang sửa đề..." : "Đang tạo đề..."
        );
        try {
            const result = IsUpdate
                ? await updateOne(data)
                : await createOne(data);

            const isError = !result || "error" in result;
            toast.update(id, {
                render: isError
                    ? IsUpdate
                        ? "Sửa thất bại!"
                        : "Tạo thất bại!"
                    : IsUpdate
                    ? "Sửa thành công!"
                    : "Tạo thành công!",
                type: isError ? "error" : "success",
                isLoading: false,
                autoClose: 1000,
            });
            if (IsUpdate && FetchDataAfterUpdate) {
                FetchDataAfterUpdate();
            }
            if (!isError && !IsUpdate) {
                dispatch({ type: ActionType.Reset, payload: null });
            }
        } catch (error) {
            toast.update(id, {
                render: IsUpdate ? "Sửa thất bại!" : "Tạo thất bại!",
                type: "error",
                isLoading: false,
                autoClose: 1000,
            });
        }
    };

    const handleUploadFile = async (file: File | null, url: string | null) => {
        if (file && !url) {
            try {
                const path = await uploadFile(file);
                return path;
            } catch (error) {
                toast.error("Lỗi tải lên tệp!");
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
            let ImageUrl = await handleUploadFile(
                state.ImageFile,
                state.ImageUrl
            );
            let AudioUrl = await handleUploadFile(
                state.AudioFile,
                state.AudioUrl
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (state.ImageFile && !ImageUrl) {
                toast.error("Lỗi tải ImageUrl!");
                return;
            }
            if (state.AudioFile && !AudioUrl) {
                toast.error("Lỗi tải AudioUrl!");
                return;
            }
            const { QuestionRecord, QuestionInfoRecord, AnswerRecords } =
                getRecords(state);
            if (ImageUrl == undefined) ImageUrl = "";
            if (AudioUrl == undefined) AudioUrl = "";
            await handleCreateOrUpdate({
                QuestionRecord,
                QuestionInfoRecord,
                AnswerRecords,
                ImageUrl,
                AudioUrl,
            });
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
