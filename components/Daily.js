import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import { useSlotsContext } from '../state/slots'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    minHeight: '100px',
  },
}))

export default function Daily({ props }) {
  const classes = useStyles()

  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  const { dateDisplayed, resourceFilter, view } = slotsOptions
  const { appointments, resources, slots, date } = props

  const dailySlots = getDailySlots(appointments, resources, slots, date)

  return (
    <>
      <Typography variant="h5" component="h2">
        {props.date.toDateString()}
      </Typography>
      <>{dailySlots}</>
    </>
    // <List className={classes.root} aria-label="daily view">
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="9am" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="10am" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="11am" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="12pm" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="1pm" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="2pm" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="3pm" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="4pm" />
    //   </ListItem>
    //   <Divider />
    //   <ListItem className={classes.item}>
    //     <ListItemText primary="5pm" />
    //   </ListItem>
    // </List>
  )
}

function openAppModal(slot, date) {
  console.log('You clicked ')
}

function getDailySlots(appointments, resources, slots, date) {
  return Object.entries(slots).map(([slot, slotTime]) => {
    return (
      <Paper elevation={3} key={`${date.toDateString()}-${slot}`}>
        <Typography variant="h5" component="h2">
          {slotTime}
        </Typography>
        {resources.map((resource, index) => {
          return resource.workHours[slot] ? (
            <Chip
              label={resource.displayName}
              onClick={openAppModal(slot, date, resource.id)}
            />
          ) : (
            <Chip label={resource.displayName} disabled />
          )
        })}
      </Paper>
    )
  })
}
