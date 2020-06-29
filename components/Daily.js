import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
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

export default function Daily(props) {
  const classes = useStyles()

  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  const { dateDisplayed, resourceFilter, view } = slotsOptions
  const { resources, slots, appointments } = props

  return (
    <List className={classes.root} aria-label="daily view">
      {props.date}
      <ListItem className={classes.item}>
        <ListItemText primary="9am" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item}>
        <ListItemText primary="10am" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item}>
        <ListItemText primary="11am" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item}>
        <ListItemText primary="12pm" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item}>
        <ListItemText primary="1pm" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item}>
        <ListItemText primary="2pm" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item}>
        <ListItemText primary="3pm" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item}>
        <ListItemText primary="4pm" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item}>
        <ListItemText primary="5pm" />
      </ListItem>
    </List>
  )
}
