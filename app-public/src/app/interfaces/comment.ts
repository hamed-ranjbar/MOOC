import { Student } from "./student"

export interface Comment {
    id: string,
    text: string,
    reply_to: string,
    student_id: string,
    student: Student,
    comments: Comment[],
    comment_on: string,
    createdAt: Date
}