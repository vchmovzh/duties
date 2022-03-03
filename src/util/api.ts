import { format } from "date-fns"
import { DutyRange } from "../types/dutyRange.type"

const BASE_URL = 'http://drone-ds.pp.ua:8000'
const DATE_API_FORMAT = 'dd-MM-yyyy'

export const apiGetDuties = (date: Date): Promise<Response> => {
    return fetch(`${BASE_URL}/duties/${format(date, DATE_API_FORMAT)}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })
}

export const apiInvertDuty = (user_id: string, {start, end}: DutyRange): Promise<Response> => {
    return fetch(`${BASE_URL}/duties/invert-duty`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            user_id,
            start,
            end
        })
      })
}