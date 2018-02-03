import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';
import moment from 'moment';

export default function reminders(state = [], action) {
  let reminders = null;
  let cookie = read_cookie('reminders');
  for (let el of cookie) el.dueDate = moment(el.dueDate);
  state = cookie;
  switch (action.type) {
    case ADD_REMINDER:
      reminders = [...state, action.payload]
      bake_cookie('reminders', reminders);
      console.log('reminders', reminders);
      return reminders;
    case DELETE_REMINDER:
      console.log('action.payload', action.payload);
      clearTimeout(action.payload.timeoutID);
      reminders = state.filter(reminder => reminder.id !== action.payload.id);
      bake_cookie('reminders', reminders);
      return reminders;
    case CLEAR_REMINDERS:
      console.log(action.payload.timeoutID);
      for (let el of action.payload.timeoutID) clearTimeout(el);
      reminders = [];
      bake_cookie('reminders', reminders);
      return reminders;
    default:
      return state;
  }
}
