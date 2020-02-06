import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {

    return (
        <div>
            <Dialog
                open={props.enable}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={"md"}
            >
                <DialogTitle id="alert-dialog-title">{"CSV File Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={props.close} color="primary">
                        Disagree
          </Button> */}
                    <button onClick={props.close} className='button is-warning' autoFocus>
                        Agree
          </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}