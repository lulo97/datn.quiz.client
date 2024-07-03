import { EducationLevel, SubSubject, Subject } from "@/InterfacesDatabase";

export interface SubSubjectDetail
    extends Omit<SubSubject, "SubjectId" | "EducationLevelId"> {
    Subject: Subject | null;
    EducationLevel: EducationLevel | null;
}

export type SubSubjectDetailForInsert = Omit<
    SubSubjectDetail,
    "CreatedAt" | "UpdatedAt"
>;
