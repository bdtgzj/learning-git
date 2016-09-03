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
// util
import {getDeviceName, getSceneName} from '../util/helper'

class Homecard extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, icons, colors, devices, scenes, homecards, homecard } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleRead, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate, handleNameChangeUpdate, handleNameChangeRead, handleOrderChangeCreate, handleOrderChangeUpdate } = this.props
    const { handleIconChangeCreate, handleIconChangeUpdate, handleColorChangeCreate, handleColorChangeUpdate } = this.props
    const { handleDeviceChangeCreate, handleDeviceChangeUpdate, handleSceneChangeCreate, handleSceneChangeUpdate } = this.props

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        homecards
        .filter((v, k)=>homecard.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(homecards.map((v, k)=>k))
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
        name: homecard.createDialog.name.value,
        iconId: homecard.createDialog.icon.id, 
        colorId: homecard.createDialog.color.id, 
        deviceId: homecard.createDialog.device.id,
        sceneId: homecard.createDialog.scene.id,
        order:homecard.createDialog.order.value,
        uid:homecard.user.id})
    }
    
    const handleReadByConditionWrapper = () => {
      const conditionName = homecard.readDialog.name.value ? `&name=${homecard.readDialog.name.value}` : ''
      const condition = `uid=${homecard.user.id}${conditionName}`
      handleReadByCondition(condition)
    }

    const handleUpdateWrapper = () => {
      handleUpdate(homecard.updateDialog.id, {
        name: homecard.updateDialog.name.value,
        iconId: homecard.updateDialog.icon.id,
        colorId: homecard.updateDialog.color.id,
        deviceId: homecard.updateDialog.device.id,
        sceneId: homecard.updateDialog.scene.id,
        order: homecard.updateDialog.order.value,
        uid: homecard.user.id})
    }

    const handleDeleteWrapper = () => {
      handleDelete(
        homecards
        .filter((v, k)=>homecard.selected.includes(k))
        .map((v)=>{v['uid']=homecard.user.id; return v;})
      )
    }

    const formValidator = (form) => {
      return !form.name.valid || 
             !form.icon.id ||
             !form.color.id ||
             (!form.device.id && !form.scene.id) ||
             !form.order.valid ||
             !homecard.user.id
    }

    const formReadValidator = (form) => {
      return !form.name.valid ||
             !homecard.user.id
    }

    const rows = homecards.map((v, k) => (
      <TableRow key={k} selected={homecard.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.iconName}</TableRowColumn>
        <TableRowColumn>{v.colorName}</TableRowColumn>
        <TableRowColumn>{getDeviceName(devices, v)}</TableRowColumn>
        <TableRowColumn>{getSceneName(scenes, v)}</TableRowColumn>
        <TableRowColumn>{v.order}</TableRowColumn>
      </TableRow>
    ))

    const menuitemIcons = icons.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} leftIcon={drawables[v.icon]} />
    ))

    const menuitemColors = colors.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} leftIcon={drawables[CONFIG.DRAWABLE.COLOR](v.color)} />
    ))
    
    const menuitemDevices = devices.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={`${v.name}【${v.regionName}】`} />
    ))
    menuitemDevices.splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)

    const menuitemScenes = scenes.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={`${v.name}【${v.regionName}】`} />
    ))
    menuitemScenes.splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)

    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={formValidator(homecard.createDialog)}
        onTouchTap={handleCreateWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={formReadValidator(homecard.readDialog)}
        onTouchTap={handleReadByConditionWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={formValidator(homecard.updateDialog)}
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
              searchText={homecard.user.name}
              onNewRequest={handleRead} />
            <ToolbarSeparator />
            <RaisedButton
              label={strings.button_label_create}
              primary={true}
              disabled={!homecard.user.id}
              onTouchTap={()=>handleOpenCreateDialog(true)} />
            <RaisedButton
              label={strings.button_label_update}
              primary={true}
              disabled={homecard.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, homecards[homecard.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={homecard.selected.length<1}
              onTouchTap={handleOpenDeleteDialogWrapper} />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              disabled={!homecard.user.id}
              onTouchTap={()=>handleOpenReadDialog(true)} />
            <RaisedButton
              label={strings.button_label_refresh}
              primary={true}
              disabled={!homecard.user.id}
              onTouchTap={()=>handleRefresh(homecard.user.id)} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.table_header} 
               bodyStyle={styles.table_body}
               multiSelectable={true}
               onRowSelection={handleSelectRowWrapper}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.homecard_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.homecard_tableheadercolumn_icon}</TableHeaderColumn>
              <TableHeaderColumn>{strings.homecard_tableheadercolumn_color}</TableHeaderColumn>
              <TableHeaderColumn>{strings.homecard_tableheadercolumn_device}</TableHeaderColumn>
              <TableHeaderColumn>{strings.homecard_tableheadercolumn_scene}</TableHeaderColumn>
              <TableHeaderColumn>{strings.homecard_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.homecard_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={homecard.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_name}
            hintText={strings.homecard_dialog_textfield_placeholder_name}
            defaultValue={homecard.createDialog.name.value}
            errorText={!homecard.createDialog.name.valid && homecard.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
            <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_icon}
            hintText={strings.homecard_dialog_selectfield_placeholder_icon}
            value={homecard.createDialog.icon.id}
            onChange={(event, key, payload) => handleIconChangeCreate(payload)}>
            {menuitemIcons}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_color}
            hintText={strings.homecard_dialog_selectfield_placeholder_color}
            value={homecard.createDialog.color.id}
            onChange={(event, key, payload) => handleColorChangeCreate(payload)}>
            {menuitemColors}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_device}
            hintText={strings.homecard_dialog_selectfield_placeholder_device}
            disabled={!!homecard.createDialog.scene.id}
            value={homecard.createDialog.device.id}
            onChange={(event, key, payload) => handleDeviceChangeCreate(payload)}>
            {menuitemDevices}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_scene}
            hintText={strings.homecard_dialog_selectfield_placeholder_scene}
            disabled={!!homecard.createDialog.device.id}
            value={homecard.createDialog.scene.id}
            onChange={(event, key, payload) => handleSceneChangeCreate(payload)}>
            {menuitemScenes}
          </SelectField>
          <br />
          <TextField
            id="order"
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_order}
            hintText={strings.homecard_dialog_textfield_placeholder_order}
            defaultValue={homecard.createDialog.order.value}
            errorText={!homecard.createDialog.order.valid && homecard.createDialog.order.error}
            onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.homecard_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.readDialogContent}
          autoScrollBodyContent={true}
          open={homecard.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_name}
            hintText={strings.homecard_dialog_textfield_placeholder_name}
            defaultValue={homecard.readDialog.name.value}
            errorText={!homecard.readDialog.name.valid && homecard.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
        </Dialog>

        <Dialog
          title={strings.homecard_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={homecard.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_name}
            hintText={strings.homecard_dialog_textfield_placeholder_name}
            defaultValue={homecard.updateDialog.name.value}
            errorText={!homecard.updateDialog.name.valid && homecard.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
            <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_icon}
            hintText={strings.homecard_dialog_selectfield_placeholder_icon}
            value={homecard.updateDialog.icon.id}
            onChange={(event, key, payload) => handleIconChangeUpdate(payload)}>
            {menuitemIcons}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_color}
            hintText={strings.homecard_dialog_selectfield_placeholder_color}
            value={homecard.updateDialog.color.id}
            onChange={(event, key, payload) => handleColorChangeUpdate(payload)}>
            {menuitemColors}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_device}
            hintText={strings.homecard_dialog_selectfield_placeholder_device}
            disabled={!!homecard.updateDialog.scene.id}
            value={homecard.updateDialog.device.id}
            onChange={(event, key, payload) => handleDeviceChangeUpdate(payload)}>
            {menuitemDevices}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_scene}
            hintText={strings.homecard_dialog_selectfield_placeholder_scene}
            disabled={!!homecard.updateDialog.device.id}
            value={homecard.updateDialog.scene.id}
            onChange={(event, key, payload) => handleSceneChangeUpdate(payload)}>
            {menuitemScenes}
          </SelectField>
          <br />
          <TextField
            id="order"
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.homecard_dialog_label_order}
            hintText={strings.homecard_dialog_textfield_placeholder_order}
            defaultValue={homecard.updateDialog.order.value}
            errorText={!homecard.updateDialog.order.valid && homecard.updateDialog.order.error}
            onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog 
          title={strings.homecard_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={homecard.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={homecard.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Homecard