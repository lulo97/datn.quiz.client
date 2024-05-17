import { Button } from "@/components/ui/button";
import { WebcamCapture } from "./WebcamCapture";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AnswerSheetResults } from "./AnswerSheetResults";

export function Content() {
    return (
        <div className="flex flex-row gap-2">
            <div className="w-1/2">
                <WebcamCapture />
            </div>
            <div className="w-1/2 flex flex-col gap-3">
                <div className="flex gap-1">
                    <Input placeholder="Tìm kiếm..."></Input>
                    <Button>
                        <Search />
                    </Button>
                </div>
                <div>
                    <AnswerSheetResults />
                </div>
                <Button className="w-full"> Tải xuống</Button>
            </div>
        </div>
    );
}
