import React, { Fragment, useLayoutEffect } from 'react'
import { Grid, makeStyles, useMediaQuery } from '@material-ui/core'
import Daily from '../components/Daily'
import { useSlotsContext, WEEKLY_VIEW } from '../state/slots'
import { getNextWeekday, getWorkweek, sameDate } from '../utils'

const useStyles = makeStyles(theme => ({
  LayoutGrid: {
    top: '20vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-around',
    minWidth: '18%',
  },
  DailyGrid: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      width: '80%',
      margin: '5px',
      padding: '5px',
      justifyContent: 'center',
    },
  },
  WeeklyGrid: {
    display: 'flex',
    flexDirection: 'column',
    width: '19%',
  },
}))

export default function Layout({ props }) {
  const classes = useStyles()
  const { slotsOptions } = useSlotsContext()
  const { dateDisplayed, view } = slotsOptions
  const { appointments, ...otherProps } = props

  // return the appointment slots for the date
  const bookedSlots = date =>
    appointments
      .filter(app => sameDate(new Date(app.date), date))
      .map(app => app.slot)

  const mdWindow = useMediaQuery(theme => theme.breakpoints.up('md'))

  // returns an array of DAILY DOM with containers
  const weekList =
    view === WEEKLY_VIEW && mdWindow
      ? getWorkweek(dateDisplayed).map((date, index) =>
          DailyGrid(
            { ...otherProps, bookedSlots: bookedSlots(date), date },
            `daily-container-${index}`,
            classes.WeeklyGrid
          )
        )
      : [
          DailyGrid(
            {
              ...otherProps,
              bookedSlots: bookedSlots(getNextWeekday(dateDisplayed)),
              date: getNextWeekday(dateDisplayed),
            },
            'daily-container-0',
            classes.DailyGrid
          ),
        ]
  return (
    <Grid container className={classes.LayoutGrid}>
      {weekList}
    </Grid>
  )
}

function DailyGrid(props, key, gridClass) {
  return (
    <Fragment key={key}>
      <Grid item className={gridClass}>
        <Daily props={props} key={`Daily-${key}`} />
      </Grid>
    </Fragment>
  )
}
