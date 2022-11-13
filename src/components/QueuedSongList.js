import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import theme from "../theme";

const song = {
  title: "Na Tua Presenca",
  artist: "Vanilda Bordieri",
  thumbnail: "https://i.ytimg.com/vi/37pmeeooejU/hqdefault.jpg",
};

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  songInfoConatiner: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

export default function QueuedSongList() {
  const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    greaterThanMd && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}

function QueuedSong({ song }) {
  const { title, artist, thumbnail } = song;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={thumbnail} alt="Song Thumbnail" />
      <div className={classes.songInfoConatiner}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.text}
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
