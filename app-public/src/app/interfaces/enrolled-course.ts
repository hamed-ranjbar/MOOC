import { Course } from "./course";

export interface EnrolledCourse {
    id: string,
    course: Course,
    course_id: string,
    enrollement_date: Date,
    status_date: Date,
    final_grade: number,
    certificate_id: string
}
