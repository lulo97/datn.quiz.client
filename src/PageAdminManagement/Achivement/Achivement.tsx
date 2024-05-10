import { columns, data } from "./MockData";
import BaseScreen from "../../components/base_screen/BaseScreen";

export default function Achievement() {
    return (
        <BaseScreen
            screen_title="Thành tựu"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
