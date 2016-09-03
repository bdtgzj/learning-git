// react
import React, {Component} from 'react'
// material-ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
import styles from '../res/styles'

class Inscat extends Component {

  render() {

    const { inscats, inscat } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate,  handleNameChangeUpdate, handleNameChangeRead,
            handleOrderChangeCreate, handleOrderChangeUpdate
          } = this.props

    const handleDeleteWrapper = () => {
      handleDelete(
        inscats
        .filter((v, k)=>inscat.selected.includes(k))
      )
    }

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        inscats
        .filter((v, k)=>inscat.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(inscats.map((v, k)=>k))
          break;
        case 'none':
          handleSelectRow([])
          break;
        default:
          handleSelectRow(rows)
          break;
      }
    }

    const rows = inscats.map((v, k) => (
      <TableRow key={k} selected={inscat.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.order}</TableRowColumn>
      </TableRow>
    ))
    
    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true}
        disabled={!inscat.createDialog.name.valid || !inscat.createDialog.order.valid}
        onTouchTap={()=>handleCreate({name: inscat.createDialog.name.value, order:inscat.createDialog.order.value})} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={!inscat.readDialog.name.valid}
        onTouchTap={()=>handleReadByCondition('name=' + inscat.readDialog.name.value)} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={!inscat.updateDialog.name.valid || !inscat.updateDialog.order.valid}
        onTouchTap={()=>handleUpdate(inscat.updateDialog.id, {name: inscat.updateDialog.name.value, order:inscat.updateDialog.order.value})} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenUpdateDialog(false)} />
    ]
    const actionsDeleteDialog = [
      <FlatButton label={strings.button_label_ok} primary={true} onTouchTap={handleDeleteWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenDeleteDialog(false)} />
    ]

    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup>
            <RaisedButton
              label={strings.button_label_create}
              primary={true}
              onTouchTap={()=>handleOpenCreateDialog(true)} />
            <RaisedButton
              label={strings.button_label_update}
              primary={true}
              disabled={inscat.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, inscats[inscat.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={inscat.selected.length<1}
              onTouchTap={handleOpenDeleteDialogWrapper} />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              onTouchTap={()=>handleOpenReadDialog(true)} />
            <RaisedButton
              label={strings.button_label_refresh}
              primary={true}
              onTouchTap={()=>handleRefresh()} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.table_header} 
               bodyStyle={styles.table_body}
               multiSelectable={true}
               onRowSelection={handleSelectRowWrapper}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.inscat_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.inscat_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.inscat_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={inscat.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.inscat_dialog_label_name}
            hintText={strings.inscat_dialog_textfield_placeholder_name}
            defaultValue={inscat.createDialog.name.value}
            errorText={!inscat.createDialog.name.valid && inscat.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.inscat_dialog_label_order}
            hintText={strings.inscat_dialog_textfield_placeholder_order}
            defaultValue={inscat.createDialog.order.value}
            errorText={!inscat.createDialog.order.valid && inscat.createDialog.order.error}
            onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.inscat_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={inscat.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.inscat_dialog_label_name}
            hintText={strings.inscat_dialog_textfield_placeholder_name}
            defaultValue={inscat.readDialog.name.value}
            errorText={!inscat.readDialog.name.valid && inscat.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
        </Dialog>

        <Dialog
          title={strings.inscat_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={inscat.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.inscat_dialog_label_name}
            hintText={strings.inscat_dialog_textfield_placeholder_name}
            defaultValue={inscat.updateDialog.name.value}
            errorText={!inscat.updateDialog.name.valid && inscat.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
          <TextField
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.inscat_dialog_label_order}
            hintText={strings.inscat_dialog_textfield_placeholder_order}
            defaultValue={inscat.updateDialog.order.value}
            errorText={!inscat.updateDialog.order.valid && inscat.updateDialog.order.error}
            onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.inscat_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={inscat.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={inscat.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Inscat