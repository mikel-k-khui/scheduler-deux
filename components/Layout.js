import React from 'react'
import { Grid, CssBaseline, makeStyles } from '@material-ui/core'
import Daily from '../components/Daily'
import { useSlotsContext, WEEKLY_VIEW } from '../state/slots'
import { getNextWeekday, getWorkweek, sameDate } from '../utils'

const useStyles = makeStyles({
  LayoutGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    minWidth: '18%',
    flexWrap: 'nowrap',
  },
  DailyGrid: {
    display: 'flex',
    flexDirection: 'column',
    width: '19%',
  },
})

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
  // returns an array of DAILY DOM with containers
  const weekList =
    view === WEEKLY_VIEW
      ? getWorkweek(dateDisplayed).map((date, index) =>
          DailyGrid(
            { ...otherProps, bookedSlots: bookedSlots(date), date },
            `daily-container-${index}`,
            classes.DailyGrid
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
    <React.Fragment key={key}>
      <CssBaseline />
      <Grid item className={gridClass}>
        <Daily props={props} />
      </Grid>
    </React.Fragment>
  )
}
