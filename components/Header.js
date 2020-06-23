import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  login: {
    marginRight: '16px',
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: '12vh',
  },
}))

export default function Header() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Slottable
          </Typography>
          <Button color="inherit" className={classes.login}>
            <AccountCircleIcon style={{ marginRight: '8px' }} />
            Login
          </Button>
          <Button variant="contained" color="secondary">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
