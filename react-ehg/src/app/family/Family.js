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

class Family extends Component {

  render() {

    const { familys, family } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate,  handleNameChangeUpdate, handleNameChangeRead,
            handleFidChangeCreate,  handleFidChangeUpdate, handleFidChangeRead,
            handleAddressChangeCreate,  handleAddressChangeUpdate, handleAddressChangeRead,
          } = this.props

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        familys
        .filter((v, k)=>family.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(familys.map((v, k)=>k))
          break;
        case 'none':
          handleSelectRow([])
          break;
        default:
          handleSelectRow(rows)
          break;
      }
    }

    const handleCreateWrapper = () => {
      handleCreate({
        name: family.createDialog.name.value,
        fid: family.createDialog.fid.value,
        address: family.createDialog.address.value
      })
    }

    const handleReadByConditionWrapper = () => {
      const conditionName = family.readDialog.name.value ? `&name=${family.readDialog.name.value}` : ''
      const conditionFid = family.readDialog.fid.value ? `&fid=${family.readDialog.fid.value}` : ''
      const conditionAddress = family.readDialog.address.value ? `&address=${family.readDialog.address.value}` : ''
      const condition = `${conditionName}${conditionFid}${conditionAddress}`.substr(1)
      handleReadByCondition(condition)
    }

    const handleUpdateWrapper = () => {
      handleUpdate(family.updateDialog.id, {
        name: family.updateDialog.name.value,
        fid: family.updateDialog.fid.value,
        address: family.updateDialog.address.value
      })
    }

    const handleDeleteWrapper = () => {
      handleDelete(
        familys
        .filter((v, k)=>family.selected.includes(k))
      )
    }     

    const formValidator = (form) => {
      return !form.name.valid ||
             !form.fid.valid ||
             !form.address.valid
    }

    const formReadValidator = (form) => {
      return (!form.name.value && !form.address.value && !form.fid.value)
    }

    const rows = familys.map((v, k) => (
      <TableRow key={k} selected={family.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.fid}</TableRowColumn>
        <TableRowColumn>{v.address}</TableRowColumn>
      </TableRow>
    ))
    
    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={formValidator(family.createDialog)}
        onTouchTap={handleCreateWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={formReadValidator(family.readDialog)}
        onTouchTap={handleReadByConditionWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true}
        disabled={formValidator(family.updateDialog)}
        onTouchTap={handleUpdateWrapper} />,
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
              disabled={family.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, familys[family.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={family.selected.length<1}
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
              <TableHeaderColumn>{strings.family_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.family_tableheadercolumn_fid}</TableHeaderColumn>
              <TableHeaderColumn>{strings.family_tableheadercolumn_address}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.family_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={family.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_name}
            hintText={strings.family_dialog_textfield_placeholder_name}
            defaultValue={family.createDialog.name.value}
            errorText={!family.createDialog.name.valid && family.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldFid=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_fid}
            hintText={strings.family_dialog_textfield_placeholder_fid}
            defaultValue={family.createDialog.fid.value}
            errorText={!family.createDialog.fid.valid && family.createDialog.fid.error}
            onChange={() => handleFidChangeCreate(this.textFieldFid.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldAddress=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_address}
            hintText={strings.family_dialog_textfield_placeholder_address}
            defaultValue={family.createDialog.address.value}
            errorText={!family.createDialog.address.valid && family.createDialog.address.error}
            onChange={() => handleAddressChangeCreate(this.textFieldAddress.input.value)} />
        </Dialog>

        <Dialog
          title={strings.family_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={family.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_name}
            hintText={strings.family_dialog_textfield_placeholder_name}
            defaultValue={family.readDialog.name.value}
            errorText={!family.readDialog.name.valid && family.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldFid=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_fid}
            hintText={strings.family_dialog_textfield_placeholder_fid}
            defaultValue={family.readDialog.fid.value}
            errorText={!family.readDialog.fid.valid && family.readDialog.fid.error}
            onChange={() => handleFidChangeRead(this.textFieldFid.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldAddress=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_address}
            hintText={strings.family_dialog_textfield_placeholder_address}
            defaultValue={family.readDialog.address.value}
            errorText={!family.readDialog.address.valid && family.readDialog.address.error}
            onChange={() => handleAddressChangeRead(this.textFieldAddress.input.value)} />
        </Dialog>

        <Dialog
          title={strings.family_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={family.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_name}
            hintText={strings.family_dialog_textfield_placeholder_name}
            defaultValue={family.updateDialog.name.value}
            errorText={!family.updateDialog.name.valid && family.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldFid=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_fid}
            hintText={strings.family_dialog_textfield_placeholder_fid}
            defaultValue={family.updateDialog.fid.value}
            errorText={!family.updateDialog.fid.valid && family.updateDialog.fid.error}
            onChange={() => handleFidChangeUpdate(this.textFieldFid.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldAddress=node}
            fullWidth={true}
            floatingLabelText={strings.family_dialog_label_address}
            hintText={strings.family_dialog_textfield_placeholder_address}
            defaultValue={family.updateDialog.address.value}
            errorText={!family.updateDialog.address.valid && family.updateDialog.address.error}
            onChange={() => handleAddressChangeUpdate(this.textFieldAddress.input.value)} />
        </Dialog>

        <Dialog
          title={strings.family_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={family.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={family.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Family