import { Id } from "react-toastify";
import { Action } from "../Action";
import { InterfaceAPI } from "@/api/Quiz";

export interface Params {
    toastId: null | Id;
    dataForBackend: InterfaceAPI;
    IsUpdate: boolean | undefined;
    dispatch: React.Dispatch<Action>;
    FetchDataAfterUpdate: (() => Promise<void>) | undefined;
}
