import { ModalSizeClass } from "@/Utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { Body } from "./Body";
import { PropsScanAnswerSheet } from "../Utils/Utils";
import { DialogTitle } from "@/components/mydialog/mydialog";

export function ModalProcessPicture(props: PropsScanAnswerSheet) {
    //const { parentRef, canvasPolygonRef, setPositions, positions } = props;

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Chụp ảnh</Button>
                </DialogTrigger>
                <DialogContent className={`${ModalSizeClass}`}>
                    <DialogTitle>Xử lý ảnh chụp đáp án</DialogTitle>
                    <div>
                        <Header {...props} />
                        <Body {...props} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
