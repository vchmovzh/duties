import { createAsyncThunk } from "@reduxjs/toolkit"
import { DutiesResponse } from "../../types/duties.response.type"
import { Duty } from "../../types/duty.type"
import { InvertDutyRequest } from "../../types/invertDuty.request.type"
import { apiGetDuties, apiInvertDuty } from "../../util/api"
import { setIsLoading } from "./scheduleSlice"

export const fetchDuties = createAsyncThunk(
    'schedule/fetchDuties',
    async (date: Date, {dispatch}) => {
      dispatch(setIsLoading(true))
      const response = await apiGetDuties(date)
      return (await response.json()) as DutiesResponse
    }
  )

export const invertDuty = createAsyncThunk(
'schedule/invertDuty',
async ({user_id, range}: InvertDutyRequest, {dispatch}) => {
    dispatch(setIsLoading(true))
    const response = await apiInvertDuty(user_id, range)
    return (await response.json()) as Duty
}
)