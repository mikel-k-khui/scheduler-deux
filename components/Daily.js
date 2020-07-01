import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  Collapse,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { useSlotsContext } from '../state/slots'
import { sameDate } from '../utils'
import { app } from 'firebase'
import { getCallable, getInitials, SET_APPOINTMENTS } from '../utils'

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
      error: false,
      expanded: false,
      resourceName: '',
      resourceId: '',
    }
    const [selected, setSelected] = useState(initialState)
    const toggleCollapse = () => setSelected(initialState)
    const openForm = resource =>
      setSelected({
        ...selected,
        expanded: true,
        resourceName: resource.displayName,
        resourceId: resource.id,
      })

    const [form, setForm] = useState({
      requesterEmail: '',
      requesterName: '',
      note: '',
    })
    const handleChange = field => setForm({ ...form, ...field })

    const disableCard = bookedSlots.includes(slot)

    const handleSubmit = async e => {
      e.preventDefault()
      const result = await getCallable(SET_APPOINTMENTS, {
        ...form,
        slot,
        date,
      })

      // getCallable catches all error and log in then return null if error
      if (!result) {
        setSelected({ ...selected, error: true })
      } else {
        // TODO: add appointment to data
      }
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
          {!disableCard && getResourceAvatars(resources, slot, openForm)}
        </CardActions>
        <Collapse in={selected.expanded} timeout="auto" unmountOnExit>
          <CardActions>
            <form noValidate onSubmit={e => handleSubmit(e)}>
              Provide details for {selected.resource}:
              <TextField
                className={classes.form}
                label="Name"
                variant="outlined"
                onChange={e => handleChange({ requesterName: e.target.value })}
                helperText="Enter Your Preferred Name"
                required
              />
              <TextField
                className={classes.form}
                label="Email"
                variant="outlined"
                onChange={e => handleChange({ requesterEmail: e.target.value })}
                helperText="Enter A Valid Email"
                required
              />
              <TextField
                className={classes.form}
                label="Description"
                variant="outlined"
                onChange={e => handleChange({ note: e.target.value })}
                placeholder="Notes to Resource"
                multiline
                defaultValue="Technical Interview"
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
                type="submit"
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

function getResourceAvatars(resources, slot, openForm) {
  return resources.map((resource, index) => {
    return resource.workHours[slot] ? (
      <Tooltip title={resource.displayName}>
        <Avatar onClick={() => openForm(resource)}>
          {getInitials(resource.displayName)}
        </Avatar>
      </Tooltip>
    ) : (
      <></>
    )
  })
}
