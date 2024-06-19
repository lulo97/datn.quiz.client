import { ModalSizeClass } from "@/Utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { Body } from "./Body";
import { PropsMPP, drawPolygonByPositions } from "../Utils/Utils";
import { useEffect, useRef } from "react";

export function ModalProcessPicture(props: PropsMPP) {
    //const { parentRef, canvasPolygonRef, setPositions, positions } = props;

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Chụp ảnh</Button>
                </DialogTrigger>
                <DialogContent className={`${ModalSizeClass}`}>
                    <div>
                        <Header {...props} />
                        <Body {...props} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
