import { Id } from "react-toastify";
import { InterfaceAPI } from "../API";
import { Action } from "../Utils";

export interface Params {
    toastId: null | Id;
    dataForBackend: InterfaceAPI;
    IsUpdate: boolean | undefined;
    dispatch: React.Dispatch<Action>;
    FetchDataAfterUpdate: (() => Promise<void>) | undefined;
}
