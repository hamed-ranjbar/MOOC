import { Chapter } from "./chapter"
import { Program } from "./program"

export interface Course {
    id: string,
    name: string,
    description: string,
    commitment: string,
    program_id: string,
    program:Program,
    min_grade: number,
    course_price: number,
    active: boolean,
    chapters:Chapter[]
}
