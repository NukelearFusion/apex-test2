import * as React from 'react';
import { lv } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Button, TextField } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import './DateTimePicker.css';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30',
];

function CustomPickersDay(props) {
  const { day, selected, ...other } = props;
  return (
      <PickersDay
          {...other}
          day={day}
          selected={selected}
          className={selected ? 'dateSelected' : ''}
      />
  );
}

function getDefaultDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayOfWeek = tomorrow.getDay();

  if (dayOfWeek === 6 || dayOfWeek === 0) {
    const daysUntilMonday = dayOfWeek === 6 ? 2 : 1;
    const targetDate = new Date(tomorrow);
    targetDate.setDate(tomorrow.getDate() + daysUntilMonday);
    return targetDate;
  }

  return tomorrow;
}

function disableWeekendsAndPast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPast = date < today;
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  return isPast || isWeekend;
}

function getInitialMonth(selectedDate) {
  return selectedDate;
}

export default function DateTimePicker({ value, onChange }) {
  const defaultDate = React.useMemo(() => getDefaultDate(), []);

  const selectedDate = value?.date || defaultDate;
  const selectedTime = value?.time || undefined;
  const [displayedMonth, setDisplayedMonth] = React.useState(getInitialMonth(defaultDate));

  const handleDateChange = (newDate) => {
    onChange({ date: newDate, time: selectedTime });
  };

  const handleTimeChange = (slot) => {
    onChange({ date: selectedDate, time: slot });
  };

  const handleMonthChange = (newMonth) => {
    setDisplayedMonth(newMonth);
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={lv}>
        <Box className="container">
          <div className="dateContainer">
            <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                month={displayedMonth}
                onMonthChange={handleMonthChange}
                renderInput={(params) => <TextField {...params} size="small" />}
                className="dateInput custom-calendar"
                shouldDisableDate={disableWeekendsAndPast}
                slots={{ day: CustomPickersDay }}
                showDaysOutsideCurrentMonth
                sx={{
        width: '100%',
        height: '100%',
        '& .MuiPickersCalendarHeader-root': {
            marginTop: '0px',
            marginBottom: '10px'
        }
    }}
            />
          </div>
          <div className="timeGrid">
            {timeSlots.map((slot) => (
                <Button
                    key={slot}
                    variant={selectedTime === slot ? "contained" : "outlined"}
                    className={selectedTime === slot ? 'timeButton timeButton-selected' : 'timeButton'}
                    onClick={() => handleTimeChange(slot)}
                    disableElevation
                >
                  {slot}
                </Button>
            ))}
          </div>
        </Box>
      </LocalizationProvider>
  );
}