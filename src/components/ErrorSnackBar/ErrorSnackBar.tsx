import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import {InitialType, setAppErrorAC} from '../../app/app-reducer'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  function CustomizedSnackbars() {
  // const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    // setOpen(false);
    dispatch(setAppErrorAC(null))
  };

  const error=useSelector<AppRootStateType, string|null>(state=>state.app.error)
  const dispatch=useDispatch()
  const isOpen = error!==null

  return (
    <Stack spacing={2} sx={{ width: '100%' }} >
      <Snackbar open={isOpen} autoHideDuration={6000} style={{ width:'90%'}} onClose={handleClose} >
        <Alert onClose={handleClose} style={{maxWidth: '80%', margin:'0 auto'}} severity="error" sx={{  }}>
         {error}
        </Alert>
      </Snackbar>
     </Stack> 
  );
}
