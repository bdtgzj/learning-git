// react
import React, {Component} from 'react'
// material-ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import AutoComplete from 'material-ui/AutoComplete'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
import styles from '../res/styles'
import drawables from '../res/drawables'

class Device extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, icons, colors, devices, device } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleRead, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate, handleOrderChangeCreate, handleNameChangeUpdate, handleOrderChangeUpdate, handleNameChangeRead } = this.props
    const { handleIconChangeCreate, handleIconChangeUpdate, handleColorChangeCreate, handleColorChangeUpdate } = this.props

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        devices
        .filter((v, k)=>device.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(devices.map((v, k)=>k))
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
        name: device.createDialog.name.value, 
        icon: device.createDialog.icon.value, 
        color: device.createDialog.color.value, 
        region: device.createDialog.region.value,
        category: device.createDialog.category.value,  
        order:device.createDialog.order.value,
        uid:device.user.id})
    }

    const handleUpdateWrapper = () => {
      handleUpdate({
        id: device.updateDialog.id,
        name: device.updateDialog.name.value, 
        icon: device.updateDialog.icon.value, 
        color: device.updateDialog.color.value, 
        region: device.updateDialog.region.value,
        category: device.updateDialog.category.value,  
        order:device.updateDialog.order.value,
        uid:device.user.id})
    }

    const handleDeleteWrapper = () => {
      handleDelete(
        devices
        .filter((v, k)=>device.selected.includes(k))
        .map((v)=>{v['uid']=device.user.id; return v;})
      )
    }

    const rows = devices.map((v, k) => (
      <TableRow key={k} selected={device.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.icon}</TableRowColumn>
        <TableRowColumn>{v.color}</TableRowColumn>
        <TableRowColumn>{v.region}</TableRowColumn>
        <TableRowColumn>{v.category}</TableRowColumn>
        <TableRowColumn>{v.order}</TableRowColumn>
      </TableRow>
    ))

    const menuitemIcons = icons.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} leftIcon={drawables[v.icon]} />
    ))

    const menuitemColors = colors.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} leftIcon={drawables['ic_color_rectangle'](v.color)} />
    ))
    
    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={!device.createDialog.name.valid || !device.createDialog.order.valid || !device.user.id}
        onTouchTap={handleCreateWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={!device.readDialog.name.valid || !device.user.id}
        onTouchTap={()=>handleReadByCondition('uid=' + device.user.id + '&name=' + device.readDialog.name.value)} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={!device.updateDialog.name.valid || !device.updateDialog.order.valid || !device.user.id}
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
            <AutoComplete
              hintText={strings.autocomplete_placeholder_user}
              openOnFocus={true}
              dataSource={users}
              dataSourceConfig={CONFIG.DATA_SOURCE_CONFIG_USER}
              ref={(node) => this.autoCompleteUser=node}
              searchText={device.user.name}
              onNewRequest={handleRead} />
            <ToolbarSeparator />
            <RaisedButton
              label={strings.button_label_create}
              primary={true}
              disabled={!device.user.id}
              onTouchTap={()=>handleOpenCreateDialog(true)} />
            <RaisedButton
              label={strings.button_label_update}
              primary={true}
              disabled={device.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, devices[device.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={device.selected.length<1}
              onTouchTap={handleOpenDeleteDialogWrapper} />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              disabled={!device.user.id}
              onTouchTap={()=>handleOpenReadDialog(true)} />
            <RaisedButton
              label={strings.button_label_refresh}
              primary={true}
              disabled={!device.user.id}
              onTouchTap={()=>handleRefresh(device.user.id)} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.table_header} 
               bodyStyle={styles.table_body}
               multiSelectable={true}
               onRowSelection={handleSelectRowWrapper}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.device_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.device_tableheadercolumn_icon}</TableHeaderColumn>
              <TableHeaderColumn>{strings.device_tableheadercolumn_color}</TableHeaderColumn>
              <TableHeaderColumn>{strings.device_tableheadercolumn_region}</TableHeaderColumn>
              <TableHeaderColumn>{strings.device_tableheadercolumn_category}</TableHeaderColumn>
              <TableHeaderColumn>{strings.device_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.device_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={device.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_name}
            hintText={strings.device_dialog_textfield_placeholder_name}
            defaultValue={device.createDialog.name.value}
            errorText={!device.createDialog.name.valid && device.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
            <br />
            <SelectField
              fullWidth={true}
              floatingLabelText={strings.device_dialog_label_icon}
              hintText={strings.device_dialog_selectfield_placeholder_icon}
              value={device.createDialog.icon.id}
              onChange={(event, key, payload) => handleIconChangeCreate(payload)}>
              {menuitemIcons}
            </SelectField>
            <br />
            <SelectField
              fullWidth={true}
              floatingLabelText={strings.device_dialog_label_color}
              hintText={strings.device_dialog_selectfield_placeholder_color}
              value={device.createDialog.color.id}
              onChange={(event, key, payload) => handleColorChangeCreate(payload)}>
              {menuitemColors}
            </SelectField>
            <br />
            <SelectField
              fullWidth={true}
              floatingLabelText={strings.device_dialog_label_region}
              hintText={strings.device_dialog_selectfield_placeholder_region}
              value={device.createDialog.region.id}
              onChange={(event, key, payload) => handleRegionChangeCreate(payload)}>
              {menuitemRegions}
            </SelectField>
            <br />
            <SelectField
              fullWidth={true}
              floatingLabelText={strings.device_dialog_label_category}
              hintText={strings.device_dialog_selectfield_placeholder_category}
              value={device.createDialog.category.id}
              onChange={(event, key, payload) => handleCategoryChangeCreate(payload)}>
              {menuitemColors}
            </SelectField>
            <br />
            <TextField
              id="order"
              ref={(node) => this.textFieldOrder=node}
              fullWidth={true}
              floatingLabelText={strings.device_dialog_label_order}
              hintText={strings.device_dialog_textfield_placeholder_order}
              defaultValue={device.createDialog.order.value}
              errorText={!device.createDialog.order.valid && device.createDialog.order.error}
              onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.device_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={device.readDialog.isVisible}>
          <TextField
            id="name"
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_name}
            hintText={strings.device_dialog_textfield_placeholder_name}
            defaultValue={device.readDialog.name.value}
            errorText={!device.readDialog.name.valid && device.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
        </Dialog>

        <Dialog
          title={strings.device_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={device.updateDialog.isVisible}>
          <TextField
            id="name"
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_name}
            hintText={strings.device_dialog_textfield_placeholder_name}
            defaultValue={device.updateDialog.name.value}
            errorText={!device.updateDialog.name.valid && device.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
            <br />
            <TextField
              id="order"
              ref={(node) => this.textFieldOrder=node}
              fullWidth={true}
              floatingLabelText={strings.device_dialog_label_order}
              hintText={strings.device_dialog_textfield_placeholder_order}
              defaultValue={device.updateDialog.order.value}
              errorText={!device.updateDialog.order.valid && device.updateDialog.order.error}
              onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog 
          title={strings.device_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={device.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={device.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Device