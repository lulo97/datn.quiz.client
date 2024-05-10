import { ModalMode } from "../ModalMode/ModalMode";
import { ModalReport } from "../ModalReport/ModalReport";

export function Content() {
    return (
        <div className="flex gap-10">
            <ModalMode />
            <ModalReport />
        </div>
    );
}
