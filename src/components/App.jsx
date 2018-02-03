import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import DateTime from 'react-datetime';
import moment from 'moment';
import '../../node_modules/moment/locale/ru';
import '../datetime.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: moment(),
      timeoutID: ''
    };
  }

  addReminder() {
    const input = document.querySelector('.form-control');
    if (input.value === '' || input.value.length < 5) {
       input.focus();
    } else {
      const time = (this.state.dueDate - moment()) > 0 ? this.state.dueDate - moment() : false;
      const toDo = this.state.text;
      const timeoutID = time ? setTimeout(() => alert(`Самое время ${toDo}!`), time) : 0;
      this.props.addReminder(this.state.text, this.state.dueDate, timeoutID);
    }
    input.value = '';
    input.focus();
  }

  deleteReminder(id, timeoutID) {
    this.props.deleteReminder(id, timeoutID);
  }

  clearReminders() {
    const {reminders} = this.props;
    const allTimeoutIds = reminders.map((reminder) => reminder.timeoutID);
    this.props.clearReminders(allTimeoutIds);
  }

  renderReminders() {
    const {reminders} = this.props;
    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item reminders">
                    <div>{reminder.text}</div>
                    <div className="dueDate">
                      {reminder.dueDate.startOf('minute').fromNow()}
                    </div>
                    <div
                      className="list-item delete-button"
                      onClick={() => this.deleteReminder(reminder.id, reminder.timeoutID)}
                    >
                      &#x2715;
                    </div>
              </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">
        Минимум <strong>пять</strong> букв
      </Tooltip>
    );
    return (
      <div className="App">
        <div className="title">
          Напоминалка
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <OverlayTrigger placement="top" overlay={tooltip}>
              <input
                className="form-control"
                placeholder="Напомни мне..."
                onChange={ev => this.setState({text: ev.target.value})}
              />
            </OverlayTrigger>
          <DateTime
            className="datetime"
            locale="ru"
            defaultValue={moment()}
            onChange={ev => this.setState({dueDate: ev})}
             />
          </div>
          <div
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Добавить напоминание
          </div>
          
        </div>
        {this.renderReminders()}
        <div
          className="btn btn-danger"
          onClick={() => {this.clearReminders()}}
        >
          Удалить все
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App);
