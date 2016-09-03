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

// immutable
var Immutable = require('immutable')

class Device extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, icons, colors, regions, categorys, devices, device } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleRead, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate, handleNameChangeUpdate, handleNameChangeRead, handleOrderChangeCreate, handleOrderChangeUpdate } = this.props
    const { handleIconChangeCreate, handleIconChangeUpdate, handleColorChangeCreate, handleColorChangeUpdate } = this.props
    const { handleRegionChangeCreate, handleRegionChangeUpdate, handleRegionChangeRead, handleCategoryChangeCreate, handleCategoryChangeUpdate, handleCategoryChangeRead } = this.props

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
        iconId: device.createDialog.icon.id, 
        colorId: device.createDialog.color.id, 
        regionId: device.createDialog.region.id,
        categoryId: device.createDialog.category.id,  
        order:device.createDialog.order.value,
        uid:device.user.id})
    }
    
    const handleReadByConditionWrapper = () => {
      const conditionName = device.readDialog.name.value ? `&name=${device.readDialog.name.value}` : ''
      const conditionRegionId = device.readDialog.region.id ? `&regionId=${device.readDialog.region.id}` : ''
      const conditionCategoryId = device.readDialog.category.id ? `&categoryId=${device.readDialog.category.id}` : ''
      const condition = `uid=${device.user.id}${conditionName}${conditionRegionId}${conditionCategoryId}`
      handleReadByCondition(condition)
    }

    const handleUpdateWrapper = () => {
      handleUpdate(device.updateDialog.id, {
        name: device.updateDialog.name.value,
        iconId: device.updateDialog.icon.id,
        colorId: device.updateDialog.color.id,
        regionId: device.updateDialog.region.id,
        categoryId: device.updateDialog.category.id,
        order: device.updateDialog.order.value,
        uid: device.user.id})
    }

    const handleDeleteWrapper = () => {
      handleDelete(
        devices
        .filter((v, k)=>device.selected.includes(k))
        .map((v)=>{v['uid']=device.user.id; return v;})
      )
    }

    const formValidator = (form) => {
      return !form.name.valid || 
             !form.icon.id ||
             !form.color.id ||
             !form.region.id ||
             !form.category.id ||
             !form.order.valid ||
             !device.user.id
    }

    const formReadValidator = (form) => {
      return !form.name.valid ||
             (!form.name.value && !form.region.id && !form.category.id) ||
             !device.user.id
    }

    const rows = devices.map((v, k) => (
      <TableRow key={k} selected={device.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.iconName}</TableRowColumn>
        <TableRowColumn>{v.colorName}</TableRowColumn>
        <TableRowColumn>{v.regionName}</TableRowColumn>
        <TableRowColumn>{v.categoryName}</TableRowColumn>
        <TableRowColumn>{v.order}</TableRowColumn>
      </TableRow>
    ))

    const menuitemIcons = icons.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} leftIcon={drawables[v.icon]} />
    ))

    const menuitemColors = colors.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} leftIcon={drawables[CONFIG.DRAWABLE.COLOR](v.color)} />
    ))
    
    const menuitemRegions = regions.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} />
    ))
    // menuitemRegions.splice(0, 0, <MenuItem value={-1} primaryText={''} />)
    const menuitemRegionsImmutable = Immutable.List(menuitemRegions).splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)

    const menuitemCategorys = categorys.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} />
    ))
    const menuitemCategorysImmutable = Immutable.List(menuitemCategorys).splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)
    
    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={formValidator(device.createDialog)}
        onTouchTap={handleCreateWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={formReadValidator(device.readDialog)}
        onTouchTap={handleReadByConditionWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={formValidator(device.updateDialog)}
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
            {menuitemCategorys}
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
          contentStyle={styles.readDialogContent}
          autoScrollBodyContent={true}
          open={device.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_name}
            hintText={strings.device_dialog_textfield_placeholder_name}
            defaultValue={device.readDialog.name.value}
            errorText={!device.readDialog.name.valid && device.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_region}
            hintText={strings.device_dialog_selectfield_placeholder_region}
            value={device.readDialog.region.id}
            onChange={(event, key, payload) => handleRegionChangeRead(payload)}>
            <MenuItem value={-1} primaryText={''} />
            {menuitemRegionsImmutable}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_category}
            hintText={strings.device_dialog_selectfield_placeholder_category}
            value={device.readDialog.category.id}
            onChange={(event, key, payload) => handleCategoryChangeRead(payload)}>
            <MenuItem value={-1} primaryText={''} />
            {menuitemCategorysImmutable}
          </SelectField>
        </Dialog>

        <Dialog
          title={strings.device_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={device.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_name}
            hintText={strings.device_dialog_textfield_placeholder_name}
            defaultValue={device.updateDialog.name.value}
            errorText={!device.updateDialog.name.valid && device.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
            <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_icon}
            hintText={strings.device_dialog_selectfield_placeholder_icon}
            value={device.updateDialog.icon.id}
            onChange={(event, key, payload) => handleIconChangeUpdate(payload)}>
            {menuitemIcons}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_color}
            hintText={strings.device_dialog_selectfield_placeholder_color}
            value={device.updateDialog.color.id}
            onChange={(event, key, payload) => handleColorChangeUpdate(payload)}>
            {menuitemColors}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_region}
            hintText={strings.device_dialog_selectfield_placeholder_region}
            value={device.updateDialog.region.id}
            onChange={(event, key, payload) => handleRegionChangeUpdate(payload)}>
            {menuitemRegions}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.device_dialog_label_category}
            hintText={strings.device_dialog_selectfield_placeholder_category}
            value={device.updateDialog.category.id}
            onChange={(event, key, payload) => handleCategoryChangeUpdate(payload)}>
            {menuitemCategorys}
          </SelectField>
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