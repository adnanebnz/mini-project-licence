import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
const Cancel = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{marginTop:"100px",marginBottom:"30px"}}>
      <Box>
      <Collapse in={open}>
        <Alert
        variant='filled'
        severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Le paiement est annulé
        </Alert>
      </Collapse>

      </Box>
    </div>
  )
}

export default Cancel