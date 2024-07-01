import { User } from "@/InterfacesDatabase";

export interface QuizForVertify {
    QuizId: string;
    QuizInformationId: string;
    Name: string;
    UserVertify: User | null;
    VerifiedAt: string | null;
}

export interface QuizVertifyUpdate {
    QuizInformationId: string;
    UserVertify: string;
    VerifiedAt: number;
}
