import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NoPage() {
  const navigate = useNavigate();
  return (
    <Box className="errorpage_sec"  >
    <img style={{width: '100%', height: '100vh'}} src="/img/errorpage.jpg" alt="Error page" />
    <Button
                      variant="contained"
                      sx={{
                        fontSize: "16px !impotant",
                        background:
                          "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                        marginTop: "20px",
                        marginLeft: "0px !important",
                        padding: "10px 20px !important",
                        textTransform: "capitalize !important",
                      }}
                      className="all_button_clr"
                      color="info"
                      onClick={()=> navigate("/")}
                    >
                      Go Back Home
                    </Button>

  </Box>
  )
}

export default NoPage