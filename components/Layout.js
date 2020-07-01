import React from 'react'
import { startOfWeek } from 'date-fns'
import { Grid, CssBaseline, makeStyles } from '@material-ui/core'
import Daily from '../components/Daily'
import { useSlotsContext, WEEKLY_VIEW } from '../state/slots'
import { confirmWeekday, returnMondayOfWeek, setTargetDate } from '../utils'

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
  },
})

export default function Layout({ props }) {
  const classes = useStyles()
  const { slotsOptions } = useSlotsContext()
  const { dateDisplayed, view } = slotsOptions

  // returns an array of DAILY DOM with containers
  const weekList =
    view === WEEKLY_VIEW
      ? getWeekDates(dateDisplayed).map((date, index) =>
          DailyGrid(
            { ...props, date },
            `daily-container-${index}`,
            classes.DailyGrid
          )
        )
      : [
          DailyGrid(
            { ...props, date: dateDisplayed },
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

/*
 * Creates an array of 5 then iterate through starting with Monday by setting
 * by setting startOfWeek to Monday, then again for Tuesday until Friday.
 * @dateSelected any day of the week
 */

function getWeekDates(dateSelected) {
  const firstDayOfWeek = returnMondayOfWeek(dateSelected)
  const weekDayOffsets = [0, 1, 2, 3, 4]
  return weekDayOffsets.map(offset => setTargetDate(firstDayOfWeek, offset))
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
