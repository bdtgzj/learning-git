import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Grid, Row, Col} from 'react-bootstrap'
import Logo from '../../components/Logo'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import AutoComplete from 'material-ui/AutoComplete'

import strings from '../../res/strings'

const styles = {
  region_toolbar: { position: 'fixed', top: '64px', zIndex: 1000, width: '100%' },
  region_table_header: { position: 'fixed', top: '120px', zIndex: 1000 },
  region_table_body: { marginTop: '176px' },
  alertDialogContent: { width: '50%' },
  createDialogContent: { width: '50%' },
  updateDialogContent: { width: '50%' }
}

class Region extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, regions, region } = this.props
    const { handleOpenCreateDialog, handleOpenUpdateDialog, handleOpenReadDialog, handleOpenAlertDialog } = this.props
    const { handleCreate, handleRead, handleUpdate, handleDelete } = this.props
    const { handleSelectRow } = this.props
    const { handleNameChangeCreate,  handleOrderChangeCreate, handleNameChangeUpdate,  handleOrderChangeUpdate } = this.props

    const usersConfig = { text: 'name', value: 'id'}

    // button for dialog
    const actionsAlertDialog = [<FlatButton label={strings.button_label_ok} primary={true} onTouchTap={()=>handleOpenAlertDialog(false)} />]
    const actionsCreateDialog = [
      <FlatButton label={strings.button_label_create} primary={true} 
        disabled={!region.createDialog.name.valid || !region.createDialog.order.valid || !region.user.id}
        onTouchTap={()=>handleCreate({name: region.createDialog.name.value, order:region.createDialog.order.value, uid:region.user.id})} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenCreateDialog(false)} />
    ]
    const actionsUpdateDialog = [
      <FlatButton label={strings.button_label_update} primary={true} 
        disabled={!region.updateDialog.name.valid || !region.updateDialog.order.valid || !region.user.id}
        onTouchTap={()=>handleUpdate(region.updateDialog.id, {name: region.updateDialog.name.value, order:region.updateDialog.order.value, uid:region.user.id})} />,
      <FlatButton label={strings.button_label_cancel} primary={true} onTouchTap={()=>handleOpenUpdateDialog(false)} />
    ]

    const handleOnDelete = () => {
      if (region.selected==='all') {
        handleDelete(regions.map((v)=>{v['uid']=region.user.id; return v;}))
      } else {
        handleDelete(
          regions
          .filter((v, k)=>region.selected.includes(k))
          .map((v)=>{v['uid']=region.user.id; return v;})
        )
      }
    }

    let rows = []

    regions.forEach(function(v, k) {
      rows.push(
        <TableRow selected={region.selected.includes(k)}>
          <TableRowColumn>{v.name}</TableRowColumn>
          <TableRowColumn>{v.order}</TableRowColumn>
        </TableRow>
      )
    });

    return (
      <div>
        <Toolbar style={styles.region_toolbar}>
          <ToolbarGroup>
            <AutoComplete
              hintText={strings.region_toolbar_autocomplete_placeholder}
              openOnFocus={true}
              dataSource={users}
              dataSourceConfig={usersConfig}
              ref={(node) => this.autoCompleteUser=node}
              searchText={region.user.name}
              onNewRequest={handleRead} />
            <ToolbarSeparator />
            <RaisedButton
              label={strings.button_label_create}
              primary={true}
              disabled={!region.user.id}
              onTouchTap={()=>handleOpenCreateDialog(true)} />
            <RaisedButton
              label={strings.button_label_update}
              primary={true}
              disabled={!Array.isArray(region.selected) || region.selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true, regions[region.selected[0]])} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={region.selected === 'none' || (Array.isArray(region.selected) && region.selected.length===0)}
              onTouchTap={handleOnDelete} />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              disabled={!region.user.id}
              onTouchTap={()=>handleOpenReadDialog(true)} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.region_table_header} bodyStyle={styles.region_table_body} multiSelectable={true} onRowSelection={handleSelectRow}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.region_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.region_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {rows}
          </TableBody>
        </Table>

        <Dialog
          title={strings.region_createdialog_title}
          actions={actionsCreateDialog}
          modal={true}
          contentStyle={styles.createDialogContent}
          autoScrollBodyContent={true}
          open={region.createDialog.isVisible}>
          <TextField
            id="name"
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.region_dialog_label_name}
            hintText={strings.region_dialog_textfield_placeholder_name}
            defaultValue={region.createDialog.name.value}
            errorText={!region.createDialog.name.valid && region.createDialog.name.error}
            onChange={() => handleNameChangeCreate(this.textFieldName.input.value)} />
            <br />
            <TextField
              id="order"
              ref={(node) => this.textFieldOrder=node}
              fullWidth={true}
              floatingLabelText={strings.region_dialog_label_order}
              hintText={strings.region_dialog_textfield_placeholder_order}
              defaultValue={region.createDialog.order.value}
              errorText={!region.createDialog.order.valid && region.createDialog.order.error}
              onChange={() => handleOrderChangeCreate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.region_updatedialog_title}
          actions={actionsUpdateDialog}
          modal={true}
          contentStyle={styles.updateDialogContent}
          autoScrollBodyContent={true}
          open={region.updateDialog.isVisible}>
          <TextField
            id="name"
            ref={(node) => this.textFieldName=node}
            fullWidth={true}
            floatingLabelText={strings.region_dialog_label_name}
            hintText={strings.region_dialog_textfield_placeholder_name}
            defaultValue={region.updateDialog.name.value}
            errorText={!region.updateDialog.name.valid && region.updateDialog.name.error}
            onChange={() => handleNameChangeUpdate(this.textFieldName.input.value)} />
            <br />
            <TextField
              id="order"
              ref={(node) => this.textFieldOrder=node}
              fullWidth={true}
              floatingLabelText={strings.region_dialog_label_order}
              hintText={strings.region_dialog_textfield_placeholder_order}
              defaultValue={region.updateDialog.order.value}
              errorText={!region.updateDialog.order.valid && region.updateDialog.order.error}
              onChange={() => handleOrderChangeUpdate(this.textFieldOrder.input.value)} />
        </Dialog>

        <Dialog
          title={strings.dialog_title_prompt}
          actions={actionsAlertDialog}
          modal={true}
          contentStyle={styles.alertDialogContent}
          open={region.alertDialog.isVisible}>
          <div>{region.alertDialog.content}</div>
        </Dialog>

      </div>
    );
  }

}

export default Region