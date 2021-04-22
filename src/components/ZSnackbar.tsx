import React from 'react';
import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppSlice, updateNotice } from 'src/app/app'


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ZSnackbar: React.FC = () => {
    const dispatch = useDispatch()
    
    const { Snackbar: { open, vertical, horizontal, severity, message } } = useSelector(selectAppSlice)
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open} autoHideDuration={6000}
            onClose={() => dispatch(updateNotice({ open: false }))}>
            <Alert onClose={() => dispatch(updateNotice({ open: false }))} severity={severity}>
                {message}
            </Alert>
        </Snackbar >
    );
};
