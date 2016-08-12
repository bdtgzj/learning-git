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

class Icon extends Component {

  render() {

    const { icons, icon } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate,  handleNameChangeUpdate, handleNameChangeRead,
            handleIconChangeCreate, handleIconChangeUpdate,
            handleOrderChangeCreate, handleOrderChangeUpdate
          } = this.props

    const handleDeleteWrapper = () => {
      handleDelete(
        icons
        .filter((v, k)=>icon.selected.includes(k))
      )
    }

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        icons
        .filter((v, k)=>icon.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(icons.map((v, k)=>k))
          break;
        case 'none':
          handleSelectRow([])
          break;
        default:
          handleSelectRow(rows)
          break;
      }
    }

    const rows = icons.map((v, k) => (
      <TableRow key={k} selected={icon.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.icon}</TableRowColumn>
        <TableRowColumn>{v.order}</TableRowColumn>
      </TableRow>
    ))
    
    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={!icon.createDialog.name.valid || !icon.createDialog.icon.valid || !icon.createDialog.order.valid}
        onTouchTap={()=>handleCreate({name: icon.createDialog.name.value, icon: icon.createDialog.icon.value, order:icon.createDialog.order.value})} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={!icon.readDialog.name.valid}
        onTouchTap={()=>handleReadByCondition('name=' + icon.readDialog.name.value)} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={!icon.updateDialog.name.valid || !icon.updateDialog.icon.valid || !icon.updateDialog.order.valid}
        onTouchTap={()=>handleUpdate(icon.updateDialog.id, {name: icon.updateDialog.name.value, icon: icon.updateDialog.icon.value, order:icon.updateDialog.order.value})} />,
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
              disabled={icon.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, icons[icon.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={icon.selected.length<1}
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
              <TableHeaderColumn>{strings.icon_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.icon_tableheadercolumn_icon}</TableHeaderColumn>
              <TableHeaderColumn>{strings.icon_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.icon_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={icon.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.icon_dialog_label_name}
            hintText={strings.icon_dialog_textfield_placeholder_name}
            defaultValue={icon.createDialog.name.value}
            errorText={!icon.createDialog.name.valid && icon.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldIcon=node}
            fullWidth={true}
            floatingLabelText={strings.icon_dialog_label_icon}
            hintText={strings.icon_dialog_textfield_placeholder_icon}
            defaultValue={icon.createDialog.icon.value}
            errorText={!icon.createDialog.icon.valid && icon.createDialog.icon.error}
            onChange={() => handleIconChangeCreate(this.textFieldIcon.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.icon_dialog_label_order}
            hintText={strings.icon_dialog_textfield_placeholder_order}
            defaultValue={icon.createDialog.order.value}
            errorText={!icon.createDialog.order.valid && icon.createDialog.order.error}
            onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.icon_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={icon.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.icon_dialog_label_name}
            hintText={strings.icon_dialog_textfield_placeholder_name}
            defaultValue={icon.readDialog.name.value}
            errorText={!icon.readDialog.name.valid && icon.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
        </Dialog>

        <Dialog
          title={strings.icon_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={icon.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.icon_dialog_label_name}
            hintText={strings.icon_dialog_textfield_placeholder_name}
            defaultValue={icon.updateDialog.name.value}
            errorText={!icon.updateDialog.name.valid && icon.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
          <TextField
            ref={(node) => this.textFieldIcon=node}
            fullWidth={true}
            floatingLabelText={strings.icon_dialog_label_icon}
            hintText={strings.icon_dialog_textfield_placeholder_icon}
            defaultValue={icon.updateDialog.icon.value}
            errorText={!icon.updateDialog.icon.valid && icon.updateDialog.icon.error}
            onChange={() => handleIconChangeUpdate(this.textFieldIcon.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.icon_dialog_label_order}
            hintText={strings.icon_dialog_textfield_placeholder_order}
            defaultValue={icon.updateDialog.order.value}
            errorText={!icon.updateDialog.order.valid && icon.updateDialog.order.error}
            onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.icon_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={icon.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={icon.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Icon