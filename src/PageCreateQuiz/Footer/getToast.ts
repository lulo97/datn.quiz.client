import { UpdateOptions } from "react-toastify";

export function getToast(
    IsUpdate: boolean | undefined,
    IsSuccess: boolean
): UpdateOptions {
    const action = IsUpdate ? "Sửa" : "Tạo";
    const render = IsSuccess ? `${action} thành công!` : `${action} thất bại!`;
    const type = IsSuccess ? "success" : "error";
    return {
        render: render,
        type: type,
        isLoading: false,
        autoClose: 1000,
    };
}
