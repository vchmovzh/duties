import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Duty } from '../../types/duty.type'
import { DutyRange } from '../../types/dutyRange.type'

export interface ScheduleState {
    duties: Duty[]
}

const initialState: ScheduleState = {
    duties: [{
        name: 'Іван Василь',
        user_id: 1,
        ranges: [{
            start: 0,
            end: 1
        }, {
            start: 5,
            end: 7
        }]
    },
    {
        name: 'Гаррі Поттер',
        user_id: 2,
        ranges: [{
            start: 16,
            end: 19
        }]
    },
    {
        name: 'Олесик',
        user_id: 3,
        ranges: [{
            start: 21,
            end: 23
        }]
    },
    {
        name: 'Котик Братик',
        user_id: 4,
        ranges: [{
            start: 10,
            end: 13
        }]
    }],
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setDuties: (state, action: PayloadAction<any[]>) => {
        state.duties = action.payload
    },
    deleteRange: (state, action: PayloadAction<{duty: Duty, range: DutyRange}>) => {
        const existingDuty = state.duties.find(d => d.user_id === action.payload.duty.user_id)
        if (!existingDuty) return
        existingDuty.ranges = existingDuty.ranges.filter(dr => dr.start !== action.payload.range.start && dr.end !== action.payload.range.end)
    },
    addRange: (state, action: PayloadAction<{duty: Duty, range: DutyRange}>) => {
        const existingDuty = state.duties.find(d => d.user_id === action.payload.duty.user_id)
        if (!existingDuty) return
        existingDuty.ranges.push(action.payload.range)
    }
  },
  
})

export const { setDuties, deleteRange, addRange } = scheduleSlice.actions

export default scheduleSlice.reducer