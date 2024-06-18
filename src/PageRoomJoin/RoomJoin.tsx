import { CardParentClass } from "@/Utils";
import {
    Card,
    CardHeader,
} from "@/components/ui/card";
import { Header } from "./Header/Header";

export function RoomJoin() {
    return (
            <Card className="h-96 flex justify-center items-center">
                <CardHeader className="w-1/2">
                    <Header />
                </CardHeader>
            </Card>
    );
}
