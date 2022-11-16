import { PlayArrow, Save } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../theme";
import { GET_SONGS } from "../graphql/queries";
import { useSubscription } from "@apollo/client";

export default function SongList() {
  //let loading = false;

  const { data, loading, error } = useSubscription(GET_SONGS);

  // const song = {
  //   title: "Na Tua Presenca",
  //   artist: "Vanilda Bordieri",
  //   thumbnail: "https://i.ytimg.com/vi/37pmeeooejU/hqdefault.jpg",
  // };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error fetching songs</div>;
  }

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140,
  },
});

function Song({ song }) {
  const { title, artist, thumbnail } = song;
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia className={classes.thumbnail} image={thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary">
              <PlayArrow />
            </IconButton>
            <IconButton size="small" color="secondary">
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
