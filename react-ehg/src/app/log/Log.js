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
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// config
import CONFIG from '../config'
// res
import strings from '../res/strings'
import styles from '../res/styles'

class Log extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, logs, log } = this.props
    const { handleOpenReadDialog, handleOpenDeleteDialog } = this.props
    const { handleRead, handleDelete, handleReadByCondition, handleRefresh } = this.props
    const { handleSelectRow } = this.props
    const { handleCategoryChangeRead, handleLogChangeRead } = this.props

    const handleDeleteWrapper = () => {
      handleDelete(
        logs
        .filter((v, k)=>log.selected.includes(k))
        .map((v)=>{v['uid']=log.user.id; return v;})
      )
    }

    const handleOpenDeleteDialogWrapper = () => {
      handleOpenDeleteDialog(true,
        logs
        .filter((v, k)=>log.selected.includes(k))
        .map(v=>v.name)
      )
    }

    const handleSelectRowWrapper = (rows) => {
      switch (rows) {
        case 'all':
          handleSelectRow(logs.map((v, k)=>k))
          break;
        case 'none':
          handleSelectRow([])
          break;
        default:
          handleSelectRow(rows)
          break;
      }
    }

    const rows = logs.map((v, k) => (
      <TableRow key={k} selected={log.selected.includes(k)}>
        <TableRowColumn>{v.category}</TableRowColumn>
        <TableRowColumn>{v.log}</TableRowColumn>
        <TableRowColumn>{v.ip}</TableRowColumn>
        <TableRowColumn>{v.created}</TableRowColumn>
      </TableRow>
    ))

    var menuitemCategory = CONFIG.LOG_CATEGORY.map((v, k) => (
      <MenuItem key={k} value={v.id} primaryText={v.name} />
    ))
    menuitemCategory.splice(0, 0, <MenuItem key={-1} value={-1} primaryText={strings.text_select_cancel} />)
    
    const formReadValidator = (form) => {
      return !log.user.id || 
             (!form.category.value && !form.log.value)
    }

    const handleReadByConditionWrapper = () => {
      const conditionUid = `uid=${log.user.id}`
      const conditionCategory = log.readDialog.category.value ? `&category=${log.readDialog.category.value}` : ''
      const conditionLog = log.readDialog.log.value ? `&log=${log.readDialog.log.value}` : ''
      const condition = `${conditionUid}${conditionCategory}${conditionLog}`
      handleReadByCondition(condition)
    }

    // button for dialog
    const actionsReadDialog = [
      <FlatButton label={strings.button_label_read} primary={true}
        disabled={ formReadValidator(log.readDialog) }
        onTouchTap={handleReadByConditionWrapper} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenReadDialog(false)} />
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
              searchText={log.user.name}
              onNewRequest={handleRead} />
            <ToolbarSeparator />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              disabled={!log.user.id}
              onTouchTap={()=>handleOpenReadDialog(true)} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={log.selected.length<1}
              onTouchTap={handleOpenDeleteDialogWrapper} />
            <RaisedButton
              label={strings.button_label_refresh}
              primary={true}
              disabled={!log.user.id}
              onTouchTap={()=>handleRefresh(log.user.id)} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.table_header} 
               bodyStyle={styles.table_body}
               multiSelectable={true}
               onRowSelection={handleSelectRowWrapper}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.log_tableheadercolumn_category}</TableHeaderColumn>
              <TableHeaderColumn>{strings.log_tableheadercolumn_log}</TableHeaderColumn>
              <TableHeaderColumn>{strings.log_tableheadercolumn_ip}</TableHeaderColumn>
              <TableHeaderColumn>{strings.log_tableheadercolumn_created}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.log_readdialog_title}
          actions={actionsReadDialog}
          modal={true}
          contentStyle={styles.readDialogContent}
          autoScrollBodyContent={true}
          open={log.readDialog.isVisible}>
          <SelectField
            fullWidth={true}
            floatingLabelText={strings.log_dialog_label_category}
            hintText={strings.log_dialog_selectfield_placeholder_category}
            value={log.readDialog.category.value}
            onChange={(event, key, payload) => handleCategoryChangeRead(payload)}>
            {menuitemCategory}
          </SelectField>
          <br />
          <TextField
            ref={(node) => this.textFieldLog=node}
            fullWidth={true}
            floatingLabelText={strings.log_dialog_label_log}
            hintText={strings.log_dialog_textfield_placeholder_log}
            defaultValue={log.readDialog.log.value}
            errorText={!log.readDialog.log.valid && log.readDialog.log.error}
            onChange={() => handleLogChangeRead(this.textFieldLog.input.value)} />
        </Dialog>

        <Dialog
          title={strings.log_deletedialog_title}
          actions={actionsDeleteDialog}
          modal={true}
          contentStyle={styles.deleteDialogContent}
          open={log.deleteDialog.isVisible}>
          <div dangerouslySetInnerHTML={log.deleteDialog.content} />
        </Dialog>

      </div>
    );
  }

}

export default Log