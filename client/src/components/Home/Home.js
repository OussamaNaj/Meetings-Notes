import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home =()=>{

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);
  
    return (
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={6}>
            <Grid item xs={12} sm={6}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}
export default Home;
