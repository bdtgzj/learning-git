// react
import React, {Component} from 'react'
// material-ui
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import AutoComplete from 'material-ui/AutoComplete'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
import styles from '../res/styles'

class Category extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, categorys, category } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleRead, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate,  handleOrderChangeCreate, handleNameChangeUpdate, handleOrderChangeUpdate, handleNameChangeRead } = this.props

    const handleDeleteWrapper = () => {
      handleDelete(
        categorys
        .filter((v, k)=>category.selected.includes(k))
        .map((v)=>{v['uid']=category.user.id; return v;})
      )
    }

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        categorys
        .filter((v, k)=>category.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(categorys.map((v, k)=>k))
          break;
        case 'none':
          handleSelectRow([])
          break;
        default:
          handleSelectRow(rows)
          break;
      }
    }

    const rows = categorys.map((v, k) => (
      <TableRow key={k} selected={category.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.order}</TableRowColumn>
      </TableRow>
    ))
    
    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={!category.createDialog.name.valid || !category.createDialog.order.valid || !category.user.id}
        onTouchTap={()=>handleCreate({name: category.createDialog.name.value, order:category.createDialog.order.value, uid:category.user.id})} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={!category.readDialog.name.valid || !category.user.id}
        onTouchTap={()=>handleReadByCondition('uid=' + category.user.id + '&name=' + category.readDialog.name.value)} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={!category.updateDialog.name.valid || !category.updateDialog.order.valid || !category.user.id}
        onTouchTap={()=>handleUpdate(category.updateDialog.id, {name: category.updateDialog.name.value, order:category.updateDialog.order.value, uid:category.user.id})} />,
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
            <AutoComplete
              hintText={strings.autocomplete_placeholder_user}
              openOnFocus={true}
              dataSource={users}
              dataSourceConfig={CONFIG.DATA_SOURCE_CONFIG_USER}
              ref={(node) => this.autoCompleteUser=node}
              searchText={category.user.name}
              onNewRequest={handleRead} />
            <ToolbarSeparator />
            <RaisedButton
              label={strings.button_label_create}
              primary={true}
              disabled={!category.user.id}
              onTouchTap={()=>handleOpenCreateDialog(true)} />
            <RaisedButton
              label={strings.button_label_update}
              primary={true}
              disabled={category.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, categorys[category.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={category.selected.length<1}
              onTouchTap={handleOpenDeleteDialogWrapper} />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              disabled={!category.user.id}
              onTouchTap={()=>handleOpenReadDialog(true)} />
            <RaisedButton
              label={strings.button_label_refresh}
              primary={true}
              disabled={!category.user.id}
              onTouchTap={()=>handleRefresh(category.user.id)} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.table_header} 
               bodyStyle={styles.table_body}
               multiSelectable={true}
               onRowSelection={handleSelectRowWrapper}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.category_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.category_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.category_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={category.createDialog.isVisible}>
          <TextField
            id="name"
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.category_dialog_label_name}
            hintText={strings.category_dialog_textfield_placeholder_name}
            defaultValue={category.createDialog.name.value}
            errorText={!category.createDialog.name.valid && category.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
            <br />
            <TextField
              id="order"
              ref={(node) => this.textFieldOrder=node}
              fullWidth={true}
              floatingLabelText={strings.category_dialog_label_order}
              hintText={strings.category_dialog_textfield_placeholder_order}
              defaultValue={category.createDialog.order.value}
              errorText={!category.createDialog.order.valid && category.createDialog.order.error}
              onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.category_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={category.readDialog.isVisible}>
          <TextField
            id="name"
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.category_dialog_label_name}
            hintText={strings.category_dialog_textfield_placeholder_name}
            defaultValue={category.readDialog.name.value}
            errorText={!category.readDialog.name.valid && category.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
        </Dialog>

        <Dialog
          title={strings.category_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={category.updateDialog.isVisible}>
          <TextField
            id="name"
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.category_dialog_label_name}
            hintText={strings.category_dialog_textfield_placeholder_name}
            defaultValue={category.updateDialog.name.value}
            errorText={!category.updateDialog.name.valid && category.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
            <br />
            <TextField
              id="order"
              ref={(node) => this.textFieldOrder=node}
              fullWidth={true}
              floatingLabelText={strings.category_dialog_label_order}
              hintText={strings.category_dialog_textfield_placeholder_order}
              defaultValue={category.updateDialog.order.value}
              errorText={!category.updateDialog.order.valid && category.updateDialog.order.error}
              onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.category_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={category.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={category.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Category