import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
  list: {
    width: 250,
    margin: '16px',
  },
  fullList: {
    width: 'auto',
  },
})

export default function SideBar() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = anchor => (
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
        Interviewers
      </Typography>
      <List>
        <ListItem>
          <Avatar style={{ marginRight: '16px' }} />
          <ListItemText>FirstName LastName</ListItemText>
        </ListItem>
      </List>
    </div>
  )

  return (
    <div>
      <React.Fragment key="left">
        <Button color="inherit" onClick={toggleDrawer('left', true)}>
          Interviewers
        </Button>
        <Drawer
          anchor="left"
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
