import { format } from "date-fns"
import { DutyRange } from "../types/dutyRange.type"

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const DATE_API_FORMAT = 'dd-MM-yyyy'

export const apiGetDuties = (date: Date): Promise<Response> => {
    return fetch(`${BASE_URL}/duties/${format(date, DATE_API_FORMAT)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
}

export const apiInvertDuty = (user_id: string, {start, end}: DutyRange): Promise<Response> => {
    return fetch(`${BASE_URL}/duties/invert-duty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
            start,
            end
        })
      })
}