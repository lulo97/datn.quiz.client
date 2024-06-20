import { PropsScanAnswerSheet } from "../Utils/Utils";
import { ASRTable } from "./ASRTable";

export function Content(props: PropsScanAnswerSheet) {
    return (
        <div>
            <ASRTable {...props} />
        </div>
    );
}
