import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { Button, Container } from 'react-bootstrap';
import "../style.css";
import { useNavigate } from 'react-router-dom';

function SessionExpired() {
  const navigate = useNavigate();
  return (
    <>
      <Box className='session_section'>
      <Container>
        <Grid md={6}>
         <Box className='expire_session_container'>
         <Box className='expire_session_row'>
               <div className='expire_image'>
                 <img src='/img/session_expire.png' alt='Expire image'/>
               </div>
               <Typography variant='h3' className='expire_title'>your session has expired</Typography>
               <Typography className='expire_subtitle'>Please refresh the page. Don't worry, we kept all of<br/> your filters and breakdowns in place.</Typography>
               <Button variant="contained" size="medium" className='expire_button' onClick={()=> navigate("/")}>refresh</Button>
        </Box>
         </Box>
        </Grid>
       </Container>
      </Box>
    </>
  )
}

export default SessionExpired;