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
// immutable
var Immutable = require('immutable')

class Instruction extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, inscats, devices, scenes, instructions, instruction } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleRead, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate, handleNameChangeUpdate, handleNameChangeRead } = this.props
    const { handleInstructionChangeCreate, handleInstructionChangeUpdate } = this.props
    const { handleCategoryChangeCreate, handleCategoryChangeUpdate  } = this.props
    const { handleDeviceChangeCreate, handleDeviceChangeUpdate, handleDeviceChangeRead } = this.props
    const { handleSceneChangeCreate, handleSceneChangeUpdate, handleSceneChangeRead } = this.props
    const { handleOrderChangeCreate, handleOrderChangeUpdate } = this.props

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        instructions
        .filter((v, k)=>instruction.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(instructions.map((v, k)=>k))
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
        name: instruction.createDialog.name.value,
        instruction: instruction.createDialog.instruction.value, 
        categoryId: instruction.createDialog.category.id, 
        deviceId: instruction.createDialog.device.id,
        sceneId: instruction.createDialog.scene.id,  
        order:instruction.createDialog.order.value,
        uid:instruction.user.id})
    }
    
    const handleReadByConditionWrapper = () => {
      const conditionName = instruction.readDialog.name.value ? `&name=${instruction.readDialog.name.value}` : ''
      const conditionDeviceId = instruction.readDialog.device.id ? `&deviceId=${instruction.readDialog.device.id}` : ''
      const conditionSceneId = instruction.readDialog.scene.id ? `&sceneId=${instruction.readDialog.scene.id}` : ''
      const condition = `uid=${instruction.user.id}${conditionName}${conditionDeviceId}${conditionSceneId}`
      handleReadByCondition(condition)
    }

    const handleUpdateWrapper = () => {
      handleUpdate(instruction.updateDialog.id, {
        name: instruction.updateDialog.name.value,
        instruction: instruction.updateDialog.instruction.value, 
        categoryId: instruction.updateDialog.category.id, 
        deviceId: instruction.updateDialog.device.id,
        sceneId: instruction.updateDialog.scene.id,
        order: instruction.updateDialog.order.value,
        uid: instruction.user.id})
    }

    const handleDeleteWrapper = () => {
      handleDelete(
        instructions
        .filter((v, k)=>instruction.selected.includes(k))
        .map((v)=>{v['uid']=instruction.user.id; return v;})
      )
    }

    const formValidator = (form) => {
      return !form.name.valid || 
             !form.instruction.valid ||
             !form.category.id ||
             !form.device.id ||
             //!form.scene.id ||
             !form.order.valid ||
             !instruction.user.id
    }

    const formReadValidator = (form) => {
      return !form.name.valid ||
             (!form.name.value && !form.device.id && !form.scene.id) ||
             !instruction.user.id
    }

    const getDeviceNameByInstruction1 = (instruction) => {
      if (!instruction.deviceName) return ''
      let regionName = ''
      for (var i = 0; i < devices.length; i++) {
        if (devices[i].id === instruction.deviceId) {
          regionName = devices[i].regionName
          break
        }
      }
      return `${instruction.deviceName}【${regionName}】`
    }

    const getSceneNameByInstruction1 = (instruction) => {
      if (!instruction.sceneName) return ''
      let regionName = ''
      for (var i = 0; i < scenes.length; i++) {
        if (scenes[i].id === instruction.sceneId) {
          regionName = scenes[i].regionName
          break
        }
      }
      return `${instruction.sceneName}【${regionName}】`
    }

    const rows = instructions.map((v, k) => (
      <TableRow key={k} selected={instruction.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.instruction}</TableRowColumn>
        <TableRowColumn>{v.categoryName}</TableRowColumn>
        <TableRowColumn>{getDeviceName(devices, v)}</TableRowColumn>
        <TableRowColumn>{getSceneName(scenes, v)}</TableRowColumn>
        <TableRowColumn>{v.order}</TableRowColumn>
      </TableRow>
    ))

    const menuitemCategorys = inscats.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} />
    ))
    
    const menuitemDevices = devices.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={`${v.name}【${v.regionName}】`} />
    ))
    const menuitemDevicesImmutable = Immutable.List(menuitemDevices).splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)

    const menuitemScenes = scenes.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={`${v.name}【${v.regionName}】`} />
    ))
    menuitemScenes.splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)
    // const menuitemScenes = Immutable.List(menuitemScenes).splice(0, 0, <MenuItem value={-1} primaryText={strings.text_select_cancel} />)

    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={formValidator(instruction.createDialog)}
        onTouchTap={handleCreateWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={formReadValidator(instruction.readDialog)}
        onTouchTap={handleReadByConditionWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={formValidator(instruction.updateDialog)}
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
              searchText={instruction.user.name}
              onNewRequest={handleRead} />
            <ToolbarSeparator />
            <RaisedButton
              label={strings.button_label_create}
              primary={true}
              disabled={!instruction.user.id}
              onTouchTap={()=>handleOpenCreateDialog(true)} />
            <RaisedButton
              label={strings.button_label_update}
              primary={true}
              disabled={instruction.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, instructions[instruction.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={instruction.selected.length<1}
              onTouchTap={handleOpenDeleteDialogWrapper} />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              disabled={!instruction.user.id}
              onTouchTap={()=>handleOpenReadDialog(true)} />
            <RaisedButton
              label={strings.button_label_refresh}
              primary={true}
              disabled={!instruction.user.id}
              onTouchTap={()=>handleRefresh(instruction.user.id)} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.table_header} 
               bodyStyle={styles.table_body}
               multiSelectable={true}
               onRowSelection={handleSelectRowWrapper}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.instruction_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.instruction_tableheadercolumn_instruction}</TableHeaderColumn>
              <TableHeaderColumn>{strings.instruction_tableheadercolumn_category}</TableHeaderColumn>
              <TableHeaderColumn>{strings.instruction_tableheadercolumn_device}</TableHeaderColumn>
              <TableHeaderColumn>{strings.instruction_tableheadercolumn_scene}</TableHeaderColumn>
              <TableHeaderColumn>{strings.instruction_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.instruction_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={instruction.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_name}
            hintText={strings.instruction_dialog_textfield_placeholder_name}
            defaultValue={instruction.createDialog.name.value}
            errorText={!instruction.createDialog.name.valid && instruction.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
            <br />
          <TextField
            ref={(node) => this.textFieldInstruction=node}
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_instruction}
            hintText={strings.instruction_dialog_textfield_placeholder_instruction}
            defaultValue={instruction.createDialog.instruction.value}
            errorText={!instruction.createDialog.instruction.valid && instruction.createDialog.instruction.error}
            onChange={() => handleInstructionChangeCreate(this.textFieldInstruction.input.value)} />
            <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_category}
            hintText={strings.instruction_dialog_selectfield_placeholder_category}
            value={instruction.createDialog.category.id}
            onChange={(event, key, payload) => handleCategoryChangeCreate(payload)}>
            {menuitemCategorys}
          </SelectField>
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_device}
            hintText={strings.instruction_dialog_selectfield_placeholder_device}
            value={instruction.createDialog.device.id}
            onChange={(event, key, payload) => handleDeviceChangeCreate(payload)}>
            {menuitemDevices}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_scene}
            hintText={strings.instruction_dialog_selectfield_placeholder_scene}
            value={instruction.createDialog.scene.id}
            onChange={(event, key, payload) => handleSceneChangeCreate(payload)}>
            {menuitemScenes}
          </SelectField>
          <br />
          <TextField
            id="order"
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_order}
            hintText={strings.instruction_dialog_textfield_placeholder_order}
            defaultValue={instruction.createDialog.order.value}
            errorText={!instruction.createDialog.order.valid && instruction.createDialog.order.error}
            onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.instruction_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.readDialogContent}
          autoScrollBodyContent={true}
          open={instruction.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_name}
            hintText={strings.instruction_dialog_textfield_placeholder_name}
            defaultValue={instruction.readDialog.name.value}
            errorText={!instruction.readDialog.name.valid && instruction.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_device}
            hintText={strings.instruction_dialog_selectfield_placeholder_device}
            value={instruction.readDialog.device.id}
            onChange={(event, key, payload) => handleDeviceChangeRead(payload)}>
            <MenuItem value={-1} primaryText={''} />
            {menuitemDevicesImmutable}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_scene}
            hintText={strings.instruction_dialog_selectfield_placeholder_scene}
            value={instruction.readDialog.scene.id}
            onChange={(event, key, payload) => handleSceneChangeRead(payload)}>
            <MenuItem value={-1} primaryText={''} />
            {menuitemScenes}
          </SelectField>
        </Dialog>

        <Dialog
          title={strings.instruction_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={instruction.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_name}
            hintText={strings.instruction_dialog_textfield_placeholder_name}
            defaultValue={instruction.updateDialog.name.value}
            errorText={!instruction.updateDialog.name.valid && instruction.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
            <br />
          <TextField
            ref={(node) => this.textFieldInstruction=node}
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_instruction}
            hintText={strings.instruction_dialog_textfield_placeholder_instruction}
            defaultValue={instruction.updateDialog.instruction.value}
            errorText={!instruction.updateDialog.instruction.valid && instruction.updateDialog.instruction.error}
            onChange={() => handleInstructionChangeUpdate(this.textFieldInstruction.input.value)} />
            <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_category}
            hintText={strings.instruction_dialog_selectfield_placeholder_category}
            value={instruction.updateDialog.category.id}
            onChange={(event, key, payload) => handleCategoryChangeUpdate(payload)}>
            {menuitemCategorys}
          </SelectField>
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_device}
            hintText={strings.instruction_dialog_selectfield_placeholder_device}
            value={instruction.updateDialog.device.id}
            onChange={(event, key, payload) => handleDeviceChangeUpdate(payload)}>
            {menuitemDevices}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_scene}
            hintText={strings.instruction_dialog_selectfield_placeholder_scene}
            value={instruction.updateDialog.scene.id}
            onChange={(event, key, payload) => handleSceneChangeUpdate(payload)}>
            {menuitemScenes}
          </SelectField>
          <br />
          <TextField
            id="order"
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.instruction_dialog_label_order}
            hintText={strings.instruction_dialog_textfield_placeholder_order}
            defaultValue={instruction.updateDialog.order.value}
            errorText={!instruction.updateDialog.order.valid && instruction.updateDialog.order.error}
            onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog 
          title={strings.instruction_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={instruction.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={instruction.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Instruction