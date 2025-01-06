import { useState } from 'react'
import { Calendar, Clock, Plus, X } from 'lucide-react'
import { useAvailability } from '../../lib/hooks/useAvailability'
import { LoadingSpinner } from '../shared/LoadingSpinner'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'

type Props = {
  tradesPersonId: string
  isOwner: boolean
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const DAYS = Array.from({ length: 7 }, (_, i) => i)

export function AvailabilityCalendar({ tradesPersonId, isOwner }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isAdding, setIsAdding] = useState(false)
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  
  const {
    slots,
    loading,
    error,
    addSlot,
    updateSlotStatus,
    deleteSlot
  } = useAvailability(tradesPersonId)

  const weekStart = startOfWeek(selectedDate)

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!startTime || !endTime) return

    const start = new Date(startTime)
    const end = new Date(endTime)

    if (start >= end) {
      alert('End time must be after start time')
      return
    }

    const success = await addSlot(start, end)
    if (success) {
      setIsAdding(false)
      setStartTime('')
      setEndTime('')
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Availability</h2>
        {isOwner && (
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Availability
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddSlot} className="space-y-4 p-4 bg-white rounded-lg border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Slot
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 border-r">
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          {DAYS.map((day) => {
            const date = addDays(weekStart, day)
            return (
              <div key={day} className="p-4 text-center border-r last:border-r-0">
                <div className="font-medium">{format(date, 'EEE')}</div>
                <div className="text-sm text-gray-500">{format(date, 'MMM d')}</div>
              </div>
            )
          })}
        </div>

        {/* Time Slots */}
        <div className="divide-y">
          {HOURS.map((hour) => (
            <div key={hour} className="grid grid-cols-8">
              <div className="p-4 border-r text-sm text-gray-500">
                {format(new Date().setHours(hour), 'ha')}
              </div>
              {DAYS.map((day) => {
                const date = addDays(weekStart, day)
                const currentSlots = slots.filter((slot) => {
                  const slotDate = new Date(slot.start_time)
                  return (
                    isSameDay(slotDate, date) &&
                    slotDate.getHours() === hour
                  )
                })

                return (
                  <div
                    key={`${day}-${hour}`}
                    className="p-2 border-r last:border-r-0 min-h-[4rem]"
                  >
                    {currentSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`
                          p-2 rounded text-sm mb-1 flex justify-between items-start
                          ${slot.status === 'available' ? 'bg-green-100 text-green-800' :
                            slot.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}
                        `}
                      >
                        <div>
                          <div>{format(new Date(slot.start_time), 'h:mm a')}</div>
                          <div>{format(new Date(slot.end_time), 'h:mm a')}</div>
                        </div>
                        {isOwner && (
                          <button
                            onClick={() => deleteSlot(slot.id)}
                            className="p-1 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}