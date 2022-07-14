export interface Course {
    id: string,
    name: string,
    description: string,
    commitment: string,
    program_id: string,
    min_grade: number,
    course_price: number,
    active: boolean,
    chapters:any
}
