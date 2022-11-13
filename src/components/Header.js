import { HeadsetTwoTone } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React from "react";
import theme from "../theme";

const useStyles = makeStyles({
  title: {
    marginLeft: theme.spacing(2, "!important"),
    // backgroundColor: "red",
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "teal" }}
      color="secondary"
    >
      <Toolbar>
        <HeadsetTwoTone />
        <Typography className={classes.title} variant="h6" component="h1">
          Apollo Music Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
