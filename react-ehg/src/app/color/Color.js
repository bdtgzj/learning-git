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

class Color extends Component {

  render() {

    const { colors, color } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate,  handleNameChangeUpdate, handleNameChangeRead,
            handleColorChangeCreate, handleColorChangeUpdate,
            handleOrderChangeCreate, handleOrderChangeUpdate
          } = this.props

    const handleDeleteWrapper = () => {
      handleDelete(
        colors
        .filter((v, k)=>color.selected.includes(k))
      )
    }

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        colors
        .filter((v, k)=>color.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(colors.map((v, k)=>k))
          break;
        case 'none':
          handleSelectRow([])
          break;
        default:
          handleSelectRow(rows)
          break;
      }
    }

    const rows = colors.map((v, k) => (
      <TableRow key={k} selected={color.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.color}</TableRowColumn>
        <TableRowColumn>{v.order}</TableRowColumn>
      </TableRow>
    ))
    
    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={!color.createDialog.name.valid || !color.createDialog.color.valid || !color.createDialog.order.valid}
        onTouchTap={()=>handleCreate({name: color.createDialog.name.value, color: color.createDialog.color.value, order:color.createDialog.order.value})} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={!color.readDialog.name.valid}
        onTouchTap={()=>handleReadByCondition('name=' + color.readDialog.name.value)} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={!color.updateDialog.name.valid || !color.updateDialog.color.valid || !color.updateDialog.order.valid}
        onTouchTap={()=>handleUpdate(color.updateDialog.id, {name: color.updateDialog.name.value, color: color.updateDialog.color.value, order:color.updateDialog.order.value})} />,
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
              disabled={color.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, colors[color.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={color.selected.length<1}
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
              <TableHeaderColumn>{strings.color_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.color_tableheadercolumn_color}</TableHeaderColumn>
              <TableHeaderColumn>{strings.color_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.color_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={color.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.color_dialog_label_name}
            hintText={strings.color_dialog_textfield_placeholder_name}
            defaultValue={color.createDialog.name.value}
            errorText={!color.createDialog.name.valid && color.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldColor=node}
            fullWidth={true}
            floatingLabelText={strings.color_dialog_label_color}
            hintText={strings.color_dialog_textfield_placeholder_color}
            defaultValue={color.createDialog.color.value}
            errorText={!color.createDialog.color.valid && color.createDialog.color.error}
            onChange={() => handleColorChangeCreate(this.textFieldColor.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.color_dialog_label_order}
            hintText={strings.color_dialog_textfield_placeholder_order}
            defaultValue={color.createDialog.order.value}
            errorText={!color.createDialog.order.valid && color.createDialog.order.error}
            onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.color_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={color.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.color_dialog_label_name}
            hintText={strings.color_dialog_textfield_placeholder_name}
            defaultValue={color.readDialog.name.value}
            errorText={!color.readDialog.name.valid && color.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
        </Dialog>

        <Dialog
          title={strings.color_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={color.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.color_dialog_label_name}
            hintText={strings.color_dialog_textfield_placeholder_name}
            defaultValue={color.updateDialog.name.value}
            errorText={!color.updateDialog.name.valid && color.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
          <TextField
            ref={(node) => this.textFieldColor=node}
            fullWidth={true}
            floatingLabelText={strings.color_dialog_label_color}
            hintText={strings.color_dialog_textfield_placeholder_color}
            defaultValue={color.updateDialog.color.value}
            errorText={!color.updateDialog.color.valid && color.updateDialog.color.error}
            onChange={() => handleColorChangeUpdate(this.textFieldColor.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.color_dialog_label_order}
            hintText={strings.color_dialog_textfield_placeholder_order}
            defaultValue={color.updateDialog.order.value}
            errorText={!color.updateDialog.order.valid && color.updateDialog.order.error}
            onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.color_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={color.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={color.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Color