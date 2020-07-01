import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  Chip,
  Collapse,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { useSlotsContext } from '../state/slots'
import { app } from 'firebase'
import { getInitials } from '../utils'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'space-around',
  },
  card: {
    minHeight: '90px',
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  form: {
    paddingBottom: '10px',
    paddingTop: '5px',
    width: '100%',
  },
  item: {
    minHeight: '100px',
  },
  formButton: {
    paddingLeft: '10px',
  },
}))

export default function Daily({ props }) {
  const classes = useStyles()

  const { slotsOptions } = useSlotsContext()
  const { resourceFilter } = slotsOptions
  const { bookedSlots, resources, slots, date } = props

  // return only the resources if there is a filter; return all if it is a falsey
  const filteredResources = resources.filter(
    resource => !resourceFilter || resource.id === resourceFilter
  )

  const dailySlots = getDailySlots(
    bookedSlots,
    filteredResources,
    slots,
    date,
    classes
  )

  return (
    <>
      <Typography className={classes.root} variant="h5" component="h2">
        {props.date.toDateString()}
      </Typography>
      <>{dailySlots}</>
    </>
  )
}

function getDailySlots(bookedSlots, resources, slots, date, classes) {
  return Object.entries(slots).map(([slot, slotTime]) => {
    const initialState = {
      expanded: false,
      resource: '',
    }
    const [selected, setSelected] = useState(initialState)
    const toggleCollapse = () => setSelected(initialState)
    const openForm = resource => setSelected({ expanded: true, resource })
    const disableCard = bookedSlots.includes(slot)

    const getResourceAvatars = () => {
      return resources.map((resource, index) => {
        return resource.workHours[slot] ? (
          <Tooltip title={resource.displayName}>
            <Avatar onClick={() => openForm(resource.displayName)}>
              {getInitials(resource.displayName)}
            </Avatar>
          </Tooltip>
        ) : (
          <></>
        )
      })
    }

    return (
      <Card
        key={`${date.toDateString()}-${slot}`}
        className={classes.card}
        variant="outlined"
      >
        <Typography variant="h6" component="h2">
          {slotTime}
          {` is `}
          {!disableCard ? 'available' : 'booked'}
        </Typography>
        <CardActions disableSpacing>
          {!disableCard && getResourceAvatars()}
        </CardActions>
        <Collapse in={selected.expanded} timeout="auto" unmountOnExit>
          <CardActions>
            <form noValidate>
              Provide details for {selected.resource}
              <TextField
                id="outlined-email"
                className={classes.form}
                label="Email"
                variant="outlined"
                helperText="Enter A Valid Email"
              />
              <TextField
                id="standard-multiline-static"
                className={classes.form}
                label="Description"
                placeholder="Notes to Resource"
                multiline
                defaultValue="Technical Interview"
                variant="outlined"
              />
              <Button
                variant="outlined"
                className={classes.formButton}
                onClick={() => toggleCollapse()}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.formButton}
                onClick={() => toggleCollapse()}
              >
                Submit
              </Button>
            </form>
          </CardActions>
        </Collapse>
      </Card>
    )
  })
}
