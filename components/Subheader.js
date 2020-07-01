import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import Sidebar from './Sidebar'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Calendar from 'react-calendar'
import Grid from '@material-ui/core/Grid'
import { toggleViews, useSlotsContext } from '../state/slots'

const emails = ['username@gmail.com', 'user02@gmail.com']
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: '6vh',
    backgroundColor: '#5c5c5c',
    color: '#FFF',
  },
}))

function SimpleDialog(props) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  const [state, setState] = useState({ date: new Date() })

  const onChange = function (date) {
    setState({ date })
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title" style={{ textAlign: 'center' }}>
        Select a date
      </DialogTitle>
      <Calendar onChange={onChange} value={state.date} minDate={new Date()} />
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
}

export default function Subheader() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
  }

  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  const { view } = slotsOptions
  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={3}>
          <Grid item sm={2}>
            <Sidebar />
          </Grid>
          <Grid item sm={8} style={{ textAlign: 'center' }}>
            <Button color="inherit">
              <KeyboardArrowLeftIcon />
            </Button>
            <Button color="inherit" onClick={handleClickOpen}>
              {slotsOptions.dateDisplayed.toDateString()}
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
            <Button color="inherit">
              <KeyboardArrowRightIcon />
            </Button>
          </Grid>
          <Grid item sm={2} style={{ textAlign: 'right' }}>
            <Button
              color="inherit"
              onClick={() => {
                slotsDispatcher(toggleViews(view))
              }}
            >
              {view}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  )
}
