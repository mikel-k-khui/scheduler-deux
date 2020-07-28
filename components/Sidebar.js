import React, { Fragment } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import { getInitials } from '../utils'
import { ADD_FILTER, CLEAR_FILTER } from '../state/slots'

const useStyles = makeStyles({
  list: {
    width: 250,
    margin: '16px',
  },
  fullList: {
    width: 'auto',
  },
})

export default function SideBar({ props }) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  const { resources, slotsOptions, slotsDispatcher } = props
  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const setFilter = (id = undefined) => {
    if (!id) {
      slotsDispatcher({
        action: CLEAR_FILTER,
        payload: { resourceFilter: undefined },
      })
    } else {
      slotsDispatcher({ action: ADD_FILTER, payload: { resourceFilter: id } })
    }
  }

  const list = filters => {
    return filters.map((filter, index) => {
      return (
        <Fragment key={`filter-${index}`}>
          <ListItem
            alignItems="flex-start"
            onClick={() => setFilter(filter.id)}
          >
            <Avatar alt={filter.displayName} style={{ marginRight: '16px' }}>
              {getInitials(filter.displayName)}
            </Avatar>
            <ListItemText>{filter.displayName}</ListItemText>
          </ListItem>
        </Fragment>
      )
    })
  }

  const offButton = () => {
    return (
      <Button color="inherit" onClick={toggleDrawer('left', true)}>
        off
      </Button>
    )
  }

  const clearButton = () => {
    return (
      <Fragment>
        <IconButton onClick={() => setFilter()}>
          <ClearIcon style={{ color: 'white' }} />
        </IconButton>
      </Fragment>
    )
  }

  const filter = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        variant="h6"
        style={{ marginLeft: '16px', marginTop: '32px' }}
      >
        Resources
      </Typography>
      <List>{list(resources)}</List>
    </div>
  )

  return (
    <div>
      <React.Fragment key="left">
        Filter: {slotsOptions.resourceFilter ? clearButton() : offButton()}
        <Drawer
          anchor="left"
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {filter('left')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
