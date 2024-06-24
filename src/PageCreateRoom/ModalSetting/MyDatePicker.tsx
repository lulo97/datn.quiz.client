import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CreateRoomProps, convertDateToNumber, convertNumberToDate } from "../Utils";
import { unary } from "lodash";
import { ActionType } from "../Action";

export function MyDatePicker(props: CreateRoomProps) {
    const { state, dispatch } = props;

    function handleChangeTimeDMY(e: Date | undefined) {
        if (e) {
            const TimeDMY = convertDateToNumber(e);
            dispatch({ type: ActionType.ChangeTimeDMY, payload: TimeDMY });
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !state.TimeDMY && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {state.TimeDMY ? (
                        format(state.TimeDMY, "dd/MM/yyyy")
                    ) : (
                        <span>Chọn thời gian</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={convertNumberToDate(state.TimeDMY) || undefined}
                    onSelect={(e) => handleChangeTimeDMY(e)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
