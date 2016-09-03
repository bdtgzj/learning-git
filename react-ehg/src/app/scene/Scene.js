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

class Scene extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, icons, colors, regions, scenes, scene } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleRead, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate, handleNameChangeUpdate, handleNameChangeRead, handleOrderChangeCreate, handleOrderChangeUpdate } = this.props
    const { handleIconChangeCreate, handleIconChangeUpdate, handleColorChangeCreate, handleColorChangeUpdate } = this.props
    const { handleRegionChangeCreate, handleRegionChangeUpdate, handleRegionChangeRead } = this.props

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        scenes
        .filter((v, k)=>scene.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(scenes.map((v, k)=>k))
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
        name: scene.createDialog.name.value,
        iconId: scene.createDialog.icon.id, 
        colorId: scene.createDialog.color.id, 
        regionId: scene.createDialog.region.id, 
        order:scene.createDialog.order.value,
        uid:scene.user.id})
    }
    
    const handleReadByConditionWrapper = () => {
      const conditionName = scene.readDialog.name.value ? `&name=${scene.readDialog.name.value}` : ''
      const conditionRegionId = scene.readDialog.region.id ? `&regionId=${scene.readDialog.region.id}` : ''
      const condition = `uid=${scene.user.id}${conditionName}${conditionRegionId}`
      handleReadByCondition(condition)
    }

    const handleUpdateWrapper = () => {
      handleUpdate(scene.updateDialog.id, {
        name: scene.updateDialog.name.value,
        iconId: scene.updateDialog.icon.id,
        colorId: scene.updateDialog.color.id,
        regionId: scene.updateDialog.region.id,
        order: scene.updateDialog.order.value,
        uid: scene.user.id})
    }

    const handleDeleteWrapper = () => {
      handleDelete(
        scenes
        .filter((v, k)=>scene.selected.includes(k))
        .map((v)=>{v['uid']=scene.user.id; return v;})
      )
    }

    const formValidator = (form) => {
      return !form.name.valid || 
             !form.icon.id ||
             !form.color.id ||
             !form.region.id ||
             !form.order.valid ||
             !scene.user.id
    }

    const formReadValidator = (form) => {
      return !form.name.valid ||
             (!form.name.value && !form.region.id) ||
             !scene.user.id
    }

    const rows = scenes.map((v, k) => (
      <TableRow key={k} selected={scene.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.iconName}</TableRowColumn>
        <TableRowColumn>{v.colorName}</TableRowColumn>
        <TableRowColumn>{v.regionName}</TableRowColumn>
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

    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={formValidator(scene.createDialog)}
        onTouchTap={handleCreateWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={formReadValidator(scene.readDialog)}
        onTouchTap={handleReadByConditionWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={formValidator(scene.updateDialog)}
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
              searchText={scene.user.name}
              onNewRequest={handleRead} />
            <ToolbarSeparator />
            <RaisedButton
              label={strings.button_label_create}
              primary={true}
              disabled={!scene.user.id}
              onTouchTap={()=>handleOpenCreateDialog(true)} />
            <RaisedButton
              label={strings.button_label_update}
              primary={true}
              disabled={scene.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, scenes[scene.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={scene.selected.length<1}
              onTouchTap={handleOpenDeleteDialogWrapper} />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              disabled={!scene.user.id}
              onTouchTap={()=>handleOpenReadDialog(true)} />
            <RaisedButton
              label={strings.button_label_refresh}
              primary={true}
              disabled={!scene.user.id}
              onTouchTap={()=>handleRefresh(scene.user.id)} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.table_header} 
               bodyStyle={styles.table_body}
               multiSelectable={true}
               onRowSelection={handleSelectRowWrapper}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.scene_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.scene_tableheadercolumn_icon}</TableHeaderColumn>
              <TableHeaderColumn>{strings.scene_tableheadercolumn_color}</TableHeaderColumn>
              <TableHeaderColumn>{strings.scene_tableheadercolumn_region}</TableHeaderColumn>
              <TableHeaderColumn>{strings.scene_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.scene_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={scene.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_name}
            hintText={strings.scene_dialog_textfield_placeholder_name}
            defaultValue={scene.createDialog.name.value}
            errorText={!scene.createDialog.name.valid && scene.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
            <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_icon}
            hintText={strings.scene_dialog_selectfield_placeholder_icon}
            value={scene.createDialog.icon.id}
            onChange={(event, key, payload) => handleIconChangeCreate(payload)}>
            {menuitemIcons}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_color}
            hintText={strings.scene_dialog_selectfield_placeholder_color}
            value={scene.createDialog.color.id}
            onChange={(event, key, payload) => handleColorChangeCreate(payload)}>
            {menuitemColors}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_region}
            hintText={strings.scene_dialog_selectfield_placeholder_region}
            value={scene.createDialog.region.id}
            onChange={(event, key, payload) => handleRegionChangeCreate(payload)}>
            {menuitemRegions}
          </SelectField>
          <br />
          <TextField
            id="order"
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_order}
            hintText={strings.scene_dialog_textfield_placeholder_order}
            defaultValue={scene.createDialog.order.value}
            errorText={!scene.createDialog.order.valid && scene.createDialog.order.error}
            onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.scene_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.readDialogContent}
          autoScrollBodyContent={true}
          open={scene.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_name}
            hintText={strings.scene_dialog_textfield_placeholder_name}
            defaultValue={scene.readDialog.name.value}
            errorText={!scene.readDialog.name.valid && scene.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_region}
            hintText={strings.scene_dialog_selectfield_placeholder_region}
            value={scene.readDialog.region.id}
            onChange={(event, key, payload) => handleRegionChangeRead(payload)}>
            <MenuItem value={-1} primaryText={''} />
            {menuitemRegionsImmutable}
          </SelectField>
        </Dialog>

        <Dialog
          title={strings.scene_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={scene.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_name}
            hintText={strings.scene_dialog_textfield_placeholder_name}
            defaultValue={scene.updateDialog.name.value}
            errorText={!scene.updateDialog.name.valid && scene.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
            <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_icon}
            hintText={strings.scene_dialog_selectfield_placeholder_icon}
            value={scene.updateDialog.icon.id}
            onChange={(event, key, payload) => handleIconChangeUpdate(payload)}>
            {menuitemIcons}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_color}
            hintText={strings.scene_dialog_selectfield_placeholder_color}
            value={scene.updateDialog.color.id}
            onChange={(event, key, payload) => handleColorChangeUpdate(payload)}>
            {menuitemColors}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_region}
            hintText={strings.scene_dialog_selectfield_placeholder_region}
            value={scene.updateDialog.region.id}
            onChange={(event, key, payload) => handleRegionChangeUpdate(payload)}>
            {menuitemRegions}
          </SelectField>
          <br />
          <TextField
            id="order"
            ref={(node) => this.textFieldOrder=node}
            fullWidth={true}
            floatingLabelText={strings.scene_dialog_label_order}
            hintText={strings.scene_dialog_textfield_placeholder_order}
            defaultValue={scene.updateDialog.order.value}
            errorText={!scene.updateDialog.order.valid && scene.updateDialog.order.error}
            onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog 
          title={strings.scene_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={scene.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={scene.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Scene