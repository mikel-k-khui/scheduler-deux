import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import Sidebar from './Sidebar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: '#FFF',
  },
  date: {
    margin: ' 0 auto',
  },
  login: {
    marginRight: '16px',
  },
  toolbar: {
    minHeight: '6vh',
    backgroundColor: '#5c5c5c',
  },
}))

export default function Subheader() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Sidebar />
        <Typography className={classes.date}>
          <Button color="inherit">
            <KeyboardArrowLeftIcon />
          </Button>
          <Button color="inherit">Monday, June 22</Button>
          <Button color="inherit">
            <KeyboardArrowRightIcon />
          </Button>
        </Typography>
        <Typography>Weekly</Typography>
      </Toolbar>
    </div>
  )
}
