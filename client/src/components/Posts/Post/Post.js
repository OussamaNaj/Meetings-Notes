import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import { deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const downloadFile=(data, name = 'Meeting : '+ post.title, type = 'text/plain')=> {

    const anchor = document.createElement('a')
    anchor.href = window.URL.createObjectURL(new Blob([data], { type }))
    anchor.download = name
    anchor.click()
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{post.createdAt}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{"overflow": "auto","width": "520px ","height": "200px ","overflowX": "hidden"}}>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        <Button size="small" color="primary" onClick={() => downloadFile("Meeting :"+post.title + " \n Date :" + post.createdAt+"\n"+ post.message)}>DownloadFile</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
