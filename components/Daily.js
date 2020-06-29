import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  Chip,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { useSlotsContext } from '../state/slots'
import { app } from 'firebase'

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

  const { slotsOptions } = useSlotsContext()
  const { resourceFilter } = slotsOptions
  const { appointments, resources, slots, date } = props

  // return only the resources if there is a filter; return all if it is a falsey
  const filteredResources = resources.filter(
    resource => !resourceFilter || resource.id === resourceFilter
  )
  const sameDate = (thisDate, domDate) =>
    thisDate.getDay() === domDate.getDay() &&
    thisDate.getMonth() === domDate.getMonth() &&
    thisDate.getFullYear() === domDate.getFullYear()
  const todayBookedSlots = appointments
    .filter(app => sameDate(new Date(app.date), date))
    .map(app => app.slot)

  const dailySlots = getDailySlots(
    todayBookedSlots,
    filteredResources,
    slots,
    date
  )

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
  console.log('You clicked on', date, 'in slot', slot)
}

function getDailySlots(bookedSlots, resources, slots, date) {
  return Object.entries(slots).map(([slot, slotTime]) => {
    const [expanded, setExpanded] = React.useState(false)
    const toggleCollapse = () => setExpanded(!expanded)
    const disableCard = bookedSlots.includes(slot)
    return (
      <Card key={`${date.toDateString()}-${slot}`}>
        <Typography variant="h5" component="h2">
          {slotTime}
        </Typography>
        <CardActions disableSpacing>
          {!disableCard ? 'Available' : 'Booked'}
          {!disableCard &&
            resources.map((resource, index) => {
              return resource.workHours[slot] ? (
                <Chip
                  key={`${date.toDateString()}-${slot}-${index}`}
                  label={resource.displayName}
                  onClick={() => toggleCollapse()}
                  disabled={disableCard}
                />
              ) : (
                <Chip
                  key={`${date.toDateString()}-${slot}-${index}`}
                  label={resource.displayName}
                  disabled
                />
              )
            })}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardActions>
            <TextField
              id="outlined-email"
              label="Email"
              variant="outlined"
              helperText="Enter A Valid Email"
            />
            <TextField
              id="standard-multiline-static"
              label="Multiline"
              placeholder="Notes to Resource"
              multiline
              rows={4}
              defaultValue="Technical Interview"
              variant="outlined"
            />
            <Button onClick={() => toggleCollapse()}>Cancel</Button>
            <Button onClick={() => toggleCollapse()}>Submit</Button>
          </CardActions>
        </Collapse>
      </Card>
    )
  })
}
