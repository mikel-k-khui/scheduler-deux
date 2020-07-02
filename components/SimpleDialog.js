import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Calendar from 'react-calendar'
import { confirmWeekday, getNextWeekday } from '../utils'

const useStyles = makeStyles(() => ({
  text: {
    textAlign: 'center',
  },
  calendar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default function SimpleDialog(props) {
  const classes = useStyles()
  const { onClose, onSelect, open } = props
  const [select, setSelect] = useState({ date: new Date(), error: false })

  // check if date selected if weekday or return earliest weekday
  const onChange = date => {
    if (confirmWeekday(date)) {
      setSelect({ date, error: false })
      onSelect(date)
      onClose()
    } else {
      setSelect({ date: getNextWeekday(date), error: true })
    }
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      onClose={() => onClose()}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title" className={classes.text}>
        Select a weekday for your appointment
      </DialogTitle>
      <DialogActions className={classes.calendar}>
        <Calendar
          onChange={onChange}
          value={select.date}
          minDate={new Date()}
        />
      </DialogActions>
      <DialogContent>
        <DialogContentText className={classes.text}>
          {select.error
            ? `Cannot select weekends. Confrim earliest weekday (${select.date.toDateString()}) is suitable.`
            : 'Appointments are only available on weekdays.'}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}
