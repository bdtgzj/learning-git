// react
import React, {Component} from 'react'
// material-ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
import styles from '../res/styles'
// immutable
var Immutable = require('immutable')

class User extends Component {

  render() {

    const { users, user, familys } = this.props
    const { handleOpenCreateDialog, handleOpenReadDialog, handleOpenUpdateDialog, handleOpenDeleteDialog } = this.props
    const { handleCreate, handleUpdate, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate,  handleNameChangeUpdate, handleNameChangeRead,
            handleNickNameChangeCreate,  handleNickNameChangeUpdate, handleNickNameChangeRead,
            handleEmailChangeCreate,  handleEmailChangeUpdate, handleEmailChangeRead,
            handleMphoneChangeCreate,  handleMphoneChangeUpdate, handleMphoneChangeRead,
            handleStateChangeCreate,  handleStateChangeUpdate, handleStateChangeRead,
            handleFamilyChangeCreate,  handleFamilyChangeUpdate, handleFamilyChangeRead
          } = this.props

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        users
        .filter((v, k)=>user.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(users.map((v, k)=>k))
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
        name: user.createDialog.name.value,
        nickName: user.createDialog.nickName.value,
        email: user.createDialog.email.value,
        mphone: user.createDialog.mphone.value,
        state: user.createDialog.state.value,
        familyId: user.createDialog.family.id
      })
    }

    const handleReadByConditionWrapper = () => {
      const conditionName = user.readDialog.name.value ? `&name=${user.readDialog.name.value}` : ''
      const conditionNickName = user.readDialog.nickName.value ? `&nickName=${user.readDialog.nickName.value}` : ''
      const conditionEmail = user.readDialog.email.value ? `&email=${user.readDialog.email.value}` : ''
      const conditionMphone = user.readDialog.mphone.value ? `&mphone=${user.readDialog.mphone.value}` : ''
      const conditionState = user.readDialog.state.value ? `&state=${user.readDialog.state.value}` : ''
      const conditionFamilyId = user.readDialog.family.id ? `&familyId=${user.readDialog.family.id}` : ''
      const condition = `${conditionName}${conditionNickName}${conditionEmail}${conditionMphone}${conditionState}${conditionFamilyId}`.substr(1)
      handleReadByCondition(condition)
    }

    const handleUpdateWrapper = () => {
      handleUpdate(user.updateDialog.id, {
        name: user.updateDialog.name.value,
        nickName: user.updateDialog.nickName.value,
        email: user.updateDialog.email.value,
        mphone: user.updateDialog.mphone.value,
        state: user.updateDialog.state.value,
        familyId: user.updateDialog.family.id
      })
    }

    const handleDeleteWrapper = () => {
      handleDelete(
        users
        .filter((v, k)=>user.selected.includes(k))
      )
    }     

    const formValidator = (form) => {
      return !form.name.valid ||
             !form.nickName.valid ||
             !form.email.valid ||
             !form.mphone.valid ||
             !form.state.value ||
             !form.family.id
    }

    const formReadValidator = (form) => {
      return !form.name.value &&
             !form.nickName.value &&
             !form.email.value &&
             !form.mphone.value &&
             !form.state.value &&
             !form.family.id
    }

    const getStateById = (id) => {
      for (var i = 0; i < CONFIG.USER_STATE.length; i++) {
        if (CONFIG.USER_STATE[i].id == id) {
          return CONFIG.USER_STATE[i].name
        }
      }
    }

    const rows = users.map((v, k) => (
      <TableRow key={k} selected={user.selected.includes(k)}>
        <TableRowColumn>{v.name}</TableRowColumn>
        <TableRowColumn>{v.nickName}</TableRowColumn>
        <TableRowColumn>{v.email}</TableRowColumn>
        <TableRowColumn>{v.mphone}</TableRowColumn>
        <TableRowColumn>{getStateById(v.state)}</TableRowColumn>
        <TableRowColumn>{v.familyName}</TableRowColumn>
      </TableRow>
    ))

    const menuitemStates = CONFIG.USER_STATE.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} />
    ))
    const menuitemStatesImmutable = Immutable.List(menuitemStates).splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)
    
    const menuitemFamilys = familys.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} />
    ))
    const menuitemFamilysImmutable = Immutable.List(menuitemFamilys).splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)

    
    // button for dialog
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={formValidator(user.createDialog)}
        onTouchTap={handleCreateWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={formReadValidator(user.readDialog)}
        onTouchTap={handleReadByConditionWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={formValidator(user.updateDialog)}
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
              disabled={user.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, users[user.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={user.selected.length<1}
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
              <TableHeaderColumn>{strings.user_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.user_tableheadercolumn_nickname}</TableHeaderColumn>
              <TableHeaderColumn>{strings.user_tableheadercolumn_email}</TableHeaderColumn>
              <TableHeaderColumn>{strings.user_tableheadercolumn_mphone}</TableHeaderColumn>
              <TableHeaderColumn>{strings.user_tableheadercolumn_state}</TableHeaderColumn>
              <TableHeaderColumn>{strings.user_tableheadercolumn_family}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.user_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={user.createDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_name}
            hintText={strings.user_dialog_textfield_placeholder_name}
            defaultValue={user.createDialog.name.value}
            errorText={!user.createDialog.name.valid && user.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldNickName=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_nickname}
            hintText={strings.user_dialog_textfield_placeholder_nickname}
            defaultValue={user.createDialog.nickName.value}
            errorText={!user.createDialog.nickName.valid && user.createDialog.nickName.error}
            onChange={() => handleNickNameChangeCreate(this.textFieldNickName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldEmail=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_email}
            hintText={strings.user_dialog_textfield_placeholder_email}
            defaultValue={user.createDialog.email.value}
            errorText={!user.createDialog.email.valid && user.createDialog.email.error}
            onChange={() => handleEmailChangeCreate(this.textFieldEmail.input.value)} />
          <TextField
            ref={(node) => this.textFieldMphone=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_mphone}
            hintText={strings.user_dialog_textfield_placeholder_mphone}
            defaultValue={user.createDialog.mphone.value}
            errorText={!user.createDialog.mphone.valid && user.createDialog.mphone.error}
            onChange={() => handleMphoneChangeCreate(this.textFieldMphone.input.value)} />
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_state}
            hintText={strings.user_dialog_selectfield_placeholder_state}
            value={user.createDialog.state.value}
            onChange={(event, key, payload) => handleStateChangeCreate(payload)}>
            {menuitemStates}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_family}
            hintText={strings.user_dialog_selectfield_placeholder_family}
            value={user.createDialog.family.id}
            onChange={(event, key, payload) => handleFamilyChangeCreate(payload)}>
            {menuitemFamilys}
          </SelectField>
        </Dialog>

        <Dialog
          title={strings.user_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={user.readDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_name}
            hintText={strings.user_dialog_textfield_placeholder_name}
            defaultValue={user.readDialog.name.value}
            errorText={!user.readDialog.name.valid && user.readDialog.name.error}
            onChange={() => handleNameChangeRead(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldNickName=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_nickname}
            hintText={strings.user_dialog_textfield_placeholder_nickname}
            defaultValue={user.readDialog.nickName.value}
            errorText={!user.readDialog.nickName.valid && user.readDialog.nickName.error}
            onChange={() => handleNickNameChangeRead(this.textFieldNickName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldEmail=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_email}
            hintText={strings.user_dialog_textfield_placeholder_email}
            defaultValue={user.readDialog.email.value}
            errorText={!user.readDialog.email.valid && user.readDialog.email.error}
            onChange={() => handleEmailChangeRead(this.textFieldEmail.input.value)} />
          <TextField
            ref={(node) => this.textFieldMphone=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_mphone}
            hintText={strings.user_dialog_textfield_placeholder_mphone}
            defaultValue={user.readDialog.mphone.value}
            errorText={!user.readDialog.mphone.valid && user.readDialog.mphone.error}
            onChange={() => handleMphoneChangeRead(this.textFieldMphone.input.value)} />
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_state}
            hintText={strings.user_dialog_selectfield_placeholder_state}
            value={user.readDialog.state.value}
            onChange={(event, key, payload) => handleStateChangeRead(payload)}>
            {menuitemStatesImmutable}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_family}
            hintText={strings.user_dialog_selectfield_placeholder_family}
            value={user.readDialog.family.id}
            onChange={(event, key, payload) => handleFamilyChangeRead(payload)}>
            {menuitemFamilysImmutable}
          </SelectField>
        </Dialog>

        <Dialog
          title={strings.user_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={user.updateDialog.isVisible}>
          <TextField
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_name}
            hintText={strings.user_dialog_textfield_placeholder_name}
            defaultValue={user.updateDialog.name.value}
            errorText={!user.updateDialog.name.valid && user.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldNickName=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_nickname}
            hintText={strings.user_dialog_textfield_placeholder_nickname}
            defaultValue={user.updateDialog.nickName.value}
            errorText={!user.updateDialog.nickName.valid && user.updateDialog.nickName.error}
            onChange={() => handleNickNameChangeUpdate(this.textFieldNickName.input.value)} />
          <br />
          <TextField
            ref={(node) => this.textFieldEmail=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_email}
            hintText={strings.user_dialog_textfield_placeholder_email}
            defaultValue={user.updateDialog.email.value}
            errorText={!user.updateDialog.email.valid && user.updateDialog.email.error}
            onChange={() => handleEmailChangeUpdate(this.textFieldEmail.input.value)} />
          <TextField
            ref={(node) => this.textFieldMphone=node}
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_mphone}
            hintText={strings.user_dialog_textfield_placeholder_mphone}
            defaultValue={user.updateDialog.mphone.value}
            errorText={!user.updateDialog.mphone.valid && user.updateDialog.mphone.error}
            onChange={() => handleMphoneChangeUpdate(this.textFieldMphone.input.value)} />
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_state}
            hintText={strings.user_dialog_selectfield_placeholder_state}
            value={user.updateDialog.state.value}
            onChange={(event, key, payload) => handleStateChangeUpdate(payload)}>
            {menuitemStates}
          </SelectField>
          <br />
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.user_dialog_label_family}
            hintText={strings.user_dialog_selectfield_placeholder_family}
            value={user.updateDialog.family.id}
            onChange={(event, key, payload) => handleFamilyChangeUpdate(payload)}>
            {menuitemFamilys}
          </SelectField>
        </Dialog>

        <Dialog
          title={strings.user_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={user.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={user.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default User