import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import InputBase from '@material-ui/core/InputBase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class DialogWrapper extends React.Component {
  render () {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>{this.props.dialogType} EUR</DialogTitle>
        <div className={'container'} style={{ width: '100%' }}>
          <div className={'row'}>
            <div className={'col-md-2'}>
              <IconButton aria-label={'Menu'}>
                <MenuIcon />
              </IconButton>
            </div>
            <div className={'col-md-8'}>
              <TextField
                defaultValue='EUR'
                InputProps={{ inputProps: { min: 0 } }}
                type='number'
              />
            </div>
            <div className={'col-md-2'}>
              <IconButton aria-label='Menu'>
                .00
              </IconButton>
            </div>
          </div>
          <div className={'row'} style={{ padding: '12px' }}>
            <div className={'col-md-9 dialogBodyPadding'}>
              Exchange rate
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              1.145
            </div>
            <div className={'col-md-9 dialogBodyPadding'}>
              Subtotal
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              114.50
            </div>
            <div className={'col-md-9 dialogBodyPadding'}>
              Commision
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              2.00
            </div>
          </div>
          <hr className={'hrRow'} />
          <div className={'row'} style={{ padding: '12px' }}>
            <div className={'col-md-9 dialogBodyPadding'}>
              Total
            </div>
            <div className={'col-md-3 dialogBodyPadding'}>
              1.145
            </div>
          </div>
          <div className={'row'} style={{ padding: '12px' }}>
            <div className={'col-md-4'}>
              <Button>
                Cancel
              </Button>
            </div>
            <div className={'col-md-8'} style={{ float: 'right' }}>
              <Button className={'dialogButton'} >
                Buy
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default DialogWrapper
