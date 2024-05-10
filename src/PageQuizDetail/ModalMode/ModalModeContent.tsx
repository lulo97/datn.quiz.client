import { ModalModeContentLeft } from "./ModalModeContentLeft";
import { ModalModeContentRight } from "./ModalModeContentRight";

export function ModalModeContent() {
    return (
        <div className="flex gap-5">
            <ModalModeContentLeft />
            <ModalModeContentRight />
        </div>
    );
}
