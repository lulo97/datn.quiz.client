import { useEffect, useState } from "react";
import { Role } from "@/InterfacesDatabase";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { getAll } from "../Role/UtilApi";
import { ModalRoleData } from "./ModalRole";
export function SelectRole(props: ModalRoleData) {
    const { role, setRole } = props;
    const [options, setOptions] = useState<Role[]>();

    async function fetchAllRoleData() {
        const records: Role[] = await getAll();
        setOptions(records);
    }

    useEffect(() => {
        fetchAllRoleData();
    }, []);

    function handleChange(value: string) {
        setRole(JSON.parse(value));
    }

    return (
        <div>
            <Label>Vai trò</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue placeholder={role?.Name || "Vai trò..."} />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.Name}
                                value={JSON.stringify(option)}
                            >
                                {option.Name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
