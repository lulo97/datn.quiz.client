import { columns, data } from "./MockData";
import { BaseScreen } from "../../components/base_screen/BaseScreen";

export function Permission() {
    return (
        <BaseScreen
            screen_title="Quyền"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
