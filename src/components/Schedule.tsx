import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { Duty } from '../types/duty.type'
import {format} from 'date-fns'
import { DATE_INPUT_DATE_FORMAT, UI_RANGES } from '../util/constant'
import classNames from 'classnames'
import { DutyRange } from '../types/dutyRange.type'
import { addRange, deleteRange } from '../store/reducers/scheduleSlice'

const Schedule: React.FC = () => {
    const duties: Duty[] = useSelector((state: RootState) => state.schedule.duties)
    const dispatch: AppDispatch = useDispatch()
    const [date, setDate] = useState<string>(format(new Date(), DATE_INPUT_DATE_FORMAT))

    useEffect(() => {
        
    }, [])

    const onDateChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const date = e.target.value
        setDate(date)
    }

    const doubleDigit = (value: number) => {
        return value.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    }
    
    const hasActiveDuty = (duty: Duty, range: DutyRange): boolean => {
        return duty.ranges.some(r => r.start === range.start && r.end === range.end)
    }

    const invertDuty = (duty: Duty, range: DutyRange): void => {
        if (hasActiveDuty(duty, range)) {
            dispatch(deleteRange({
                duty, range
            }))
        } else {
            dispatch(addRange({
                duty, range
            }))
        }
    }

    return (
        <div className='flex w-100 flex-column'>
            <div className='flex w-100 pa3 bg-near-white bb b--light-gray'>
                <input type="date" value={date} onChange={onDateChanged} />
            </div>
            <div className='flex w-100 bb bt b--light-gray'>
                <div className='w-34 tc pv3'>Ім'я</div>
                {UI_RANGES.map(r => {
                    return (
                        <div  key={`${r.start}-${r.end}`} className='w-6 flex justify-center items-center bl tc dark-gray b--light-gray'>
                            {doubleDigit(r.start)} &bull; {doubleDigit(r.end)}
                        </div>
                    )
                })}
            </div>
            <div className='flex w-100 flex-column'>
                {
                    duties.map(duty => {
                        return (
                            <div key={duty.user_id} className='flex w-100 bb b--white'>
                                <div className="w-34 pv3 tc">
                                    {duty.name}
                                </div>
                                {
                                    UI_RANGES.map(dr => {
                                        return (
                                            <div key={`${dr.start}-${dr.end}`} onClick={() => invertDuty(duty, dr)} className={classNames('w-6 flex br b--white bg-light-gray pointer', {
                                                'bg-green': hasActiveDuty(duty, dr)
                                            })}>
                                                &nbsp;
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
       
    )
}

export default Schedule