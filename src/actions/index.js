import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';

export function addReminder(text, dueDate, timeoutID) {
  return {
    type: ADD_REMINDER,
    payload: {
      id: Math.random(),
      text,
      dueDate,
      timeoutID
    }
  }
}

export function deleteReminder(id, timeoutID) {
  return {
    type: DELETE_REMINDER,
    payload: {id, timeoutID}
  }
}
 export function clearReminders(timeoutID) {
   return {
     type: CLEAR_REMINDERS,
     payload: {timeoutID}
   }
 }
