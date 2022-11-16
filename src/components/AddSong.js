import { AddBoxOutlined, Link } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import theme from "../theme";
import SoundCloudPlayer from "react-player/lib/players/SoundCloud";
import YouTubePlayer from "react-player/lib/players/YouTube";
import ReactPlayer from "react-player";
import { useMutation } from "@apollo/client";
import { ADD_SONG } from "../graphql/mutation";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
});

const DEFAULT_SONG = {
  duration: 0,
  title: "",
  artist: "",
  thumbnail: "",
};
export default function AddSong() {
  const classes = useStyles();
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);

  function handleCloseDialog() {
    setDialog(false);
  }

  useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeData(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }

    setSong({ ...songData, url });
  }

  function getYoutubeData(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;

    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }

  function getSoundCloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("_large", "t500x500"),
          });
        }
      });
    });
  }

  const { thumbnail, title, artist } = song;

  function handleChangeSong(event) {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }

  async function handleAddSong() {
    try {
      const { url, thumbnail, artist, duration, title } = song;
      //addSong({ variables: { ...song } });
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (error) {
      console.log("Error adding song", error);
    }
  }

  function handleError(field) {
    //console.dir(error);

    var res = error?.graphQLErrors[0]?.extensions?.path.includes(field);
    // console.log(error?.graphQLErrors[0]);
    return res;
  }

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            className={classes.thumbnail}
            src={thumbnail}
            alt="Song Thumbnail"
          />
          <TextField
            value={title}
            onChange={handleChangeSong}
            variant="standard"
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleError("title")}
            helperText={handleError("title") && "Fill out the form"}
          />
          <TextField
            value={artist}
            onChange={handleChangeSong}
            variant="standard"
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleError("aritst")}
            helperText={handleError("aritst") && "Fill out the form"}
          />
          <TextField
            value={thumbnail}
            onChange={handleChangeSong}
            variant="standard"
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleError("thumbnail")}
            helperText={handleError("thumbnail") && "Fill out the form"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSong} variant="outlined" color="primary">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        onChange={(event) => setUrl(event.target.value)}
        value={url}
        placeholder="Add Youtube or SoundCloud Url"
        fullWidth
        margin="normal"
        type="url"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={classes.addSongButton}
        onClick={() => {
          setDialog(true);
        }}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        disabled={!playable}
      >
        Add
      </Button>
      <ReactPlayer hidden url={url} onReady={handleEditSong} />
    </div>
  );
}
