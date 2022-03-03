import { DutyRange } from "./dutyRange.type";

export type Duty = {
    name: string
    user_id: string
    ranges: DutyRange[],
    available_at: DutyRange[]
}