import { User, ReportReason, ReportTarget, Quiz } from "@/InterfacesDatabase";

export interface ReportDetail {
    ReportId: string;
    ReportReason: ReportReason;
    ReportTarget: ReportTarget;
    User: User;
    Parent: Quiz;
    Content: string;
    CreatedAt: string;
    ResolvedAt: string | null;
    UserResolve: User | null;
}