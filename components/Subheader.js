import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Toolbar } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Sidebar from './Sidebar'
import SimpleDialog from './SimpleDialog'
import { toggleViews, useSlotsContext, SET_DATE } from '../state/slots'
import { setTargetDate } from '../utils'

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

export default function Subheader() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  const { dateDisplayed, view } = slotsOptions

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const setToSelectedDate = date =>
    slotsDispatcher({
      action: SET_DATE,
      payload: {
        dateDisplayed: date,
      },
    })
  const setToTomorrow = () => setToSelectedDate(setTargetDate(dateDisplayed, 1))
  const setToYesterday = () =>
    setToSelectedDate(setTargetDate(dateDisplayed, -1))

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={3}>
          <Grid item sm={2}>
            <Sidebar />
          </Grid>
          <Grid item sm={8} style={{ textAlign: 'center' }}>
            <Button color="inherit">
              <KeyboardArrowLeftIcon onClick={() => setToYesterday()} />
            </Button>
            <Button color="inherit" onClick={handleClickOpen}>
              {dateDisplayed.toDateString()}
            </Button>
            <SimpleDialog
              open={open}
              onClose={handleClose}
              onSelect={setToSelectedDate}
            />
            <Button color="inherit">
              <KeyboardArrowRightIcon onClick={() => setToTomorrow()} />
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
