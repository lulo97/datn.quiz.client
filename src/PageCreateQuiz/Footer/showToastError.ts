import { toast } from "react-toastify";

export async function showToastError(errors: string[]) {
    for (let i = 0; i < errors.length; i++) {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                toast.warning(errors[i]);
                resolve();
            }, 100 * i);
        });
    }
}
