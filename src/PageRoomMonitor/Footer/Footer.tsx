import { Button } from "@/components/ui/button";
import { IRoomSocketData } from "../Utils";

export function Footer(roomSocketData: IRoomSocketData) {
    return <div className="flex justify-end w-full"><Button>Kết thúc</Button></div>;
}
