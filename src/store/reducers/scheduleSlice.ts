import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Duty } from '../../types/duty.type'
import { fetchDuties, invertDuty } from './scheduleThunk'

export interface ScheduleState {
    duties: Duty[]
    isLoading: boolean
}

const initialState: ScheduleState = {
    duties: [],
    isLoading: true
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setDuties: (state, action: PayloadAction<any[]>) => {
        state.duties = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    }
  },
  extraReducers: (builder) => {
      builder.addCase(fetchDuties.fulfilled, (state, action) => {
          state.duties = action.payload.duties
          state.isLoading = false
      })

      builder.addCase(fetchDuties.rejected, (state, action) => {
        state.duties = []
        state.isLoading = false
      })

      builder.addCase(invertDuty.fulfilled, (state, action) => {
        const duty = state.duties.find(d => d.user_id === action.payload.user_id)
        state.isLoading = false
        if (!duty) return
        duty.ranges = action.payload.ranges
     })

      builder.addCase(invertDuty.rejected, (state, action) => {
        state.isLoading = false
      })
  } 
})

export const { setDuties, setIsLoading } = scheduleSlice.actions

export default scheduleSlice.reducer