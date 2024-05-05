import ModalMode from "../ModalMode/ModalMode";
import ModalReport from "../ModalReport/ModalReport";

export default function Content() {
    return (
        <div className="flex gap-10">
            <ModalMode />
            <ModalReport />
        </div>
    );
}
