import { Course } from "./course";

export interface Program {
    name: string;
    id: string;
    description: string;
    active: boolean;
    courses:Course[]
}
