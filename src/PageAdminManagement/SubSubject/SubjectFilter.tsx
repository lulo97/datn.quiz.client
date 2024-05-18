import { Subject } from "@/InterfacesDatabase";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { SubSubjectDetail } from "./UtilApi";
import { getAll as getAllSubjectApi } from "../Subject/UtilApi";

interface SubjectFilterProps {
    data: SubSubjectDetail[];
    setData: React.Dispatch<React.SetStateAction<SubSubjectDetail[]>>;
    fetchData: () => Promise<void>;
}

export function SubjectFilter(_props: SubjectFilterProps) {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    async function fetchAllSubjectApi() {
        setSubjects(await getAllSubjectApi());
    }

    useEffect(() => {
        fetchAllSubjectApi();
    }, []);

    return (
        <div className="w-52">
            <Select>
                <SelectTrigger>
                    <SelectValue
                        placeholder="Chủ đề..."
                        defaultValue="Default"
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Default">Tất cả</SelectItem>
                    {subjects.map((ele) => (
                        <SelectItem key={ele.Name} value={ele.Name}>
                            {ele.Name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
