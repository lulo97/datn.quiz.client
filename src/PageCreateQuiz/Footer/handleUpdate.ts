import { toast } from "react-toastify";
import { Params } from "./Utils";
import { getToast } from "./getToast";
import { updateOne } from "@/api/Quiz";

export const handleUpdate = async (params: Params) => {
    const { toastId, dataForBackend, IsUpdate, FetchDataAfterUpdate } = params;
    if (!toastId) return;
    let IsSuccess = false;
    try {
        const result = await updateOne(dataForBackend);
        if (!result) {
            toast.update(toastId, getToast(IsUpdate, IsSuccess));
            console.log(result);
            return;
        }
        const isError = "error" in result;
        if (!isError) {
            IsSuccess = true
            toast.update(toastId, getToast(IsUpdate, IsSuccess));
            if (FetchDataAfterUpdate) {
                FetchDataAfterUpdate();
            }
        } else {
            IsSuccess = false;
            toast.update(toastId, getToast(IsUpdate, IsSuccess));
            console.error(result);
        }
    } catch (error) {
        IsSuccess = false;
        toast.update(toastId, getToast(IsUpdate, IsSuccess));
        console.error(error);
    }
};
