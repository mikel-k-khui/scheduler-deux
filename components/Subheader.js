import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Grid, Toolbar } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Sidebar from './Sidebar'
import SimpleDialog from './SimpleDialog'
import { toggleViews, useSlotsContext, SET_DATE } from '../state/slots'
import { sameDate, setTargetDate } from '../utils'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    minHeight: '5vh',
    top: '10vh',
    width: '100%',
    zIndex: '1',
  },
  toolbar: {
    minHeight: '6vh',
    backgroundColor: '#5c5c5c',
    color: '#FFF',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))

export default function Subheader({ props }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  const { dateDisplayed, view } = slotsOptions
  const { resources } = props

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
  const isMinDate = sameDate(dateDisplayed, new Date())

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item sm={2}>
            <Sidebar props={{ resources, slotsOptions, slotsDispatcher }} />
          </Grid>
          <Grid item sm={8} style={{ textAlign: 'center' }}>
            <IconButton
              color="inherit"
              disabled={isMinDate}
              onClick={() => setToYesterday()}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Button color="inherit" onClick={handleClickOpen}>
              {dateDisplayed.toDateString()}
            </Button>
            <SimpleDialog
              open={open}
              onClose={handleClose}
              onSelect={setToSelectedDate}
            />
            <IconButton color="inherit" onClick={() => setToTomorrow()}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            sm={2}
            style={{ textAlign: 'right' }}
            className={classes.view}
          >
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
