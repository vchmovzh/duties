import { DutyRange } from "./dutyRange.type";

export type Duty = {
    name: string
    user_id: number
    ranges: DutyRange[]
}