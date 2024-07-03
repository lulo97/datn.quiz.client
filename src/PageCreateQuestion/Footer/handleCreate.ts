import { toast } from "react-toastify";
import { getToast } from "./getToast";
import { ActionType } from "../Utils";
import { Params } from "./Utils";
import { createOne } from "@/api/Question";

export const handleCreate = async (params: Params) => {
    const { toastId, dataForBackend, IsUpdate, dispatch } = params;
    if (!toastId) return;
    let IsSuccess = false;
    try {
        const result = await createOne(dataForBackend);
        if (!result) {
            toast.update(toastId, getToast(IsUpdate, IsSuccess));
            return;
        }
        const isError = "error" in result;
        if (!isError) {
            IsSuccess = true;
            toast.update(toastId, getToast(IsUpdate, IsSuccess));
            dispatch({ type: ActionType.Reset, payload: null });
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
