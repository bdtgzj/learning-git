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
  alertDialogContent: { width: '50%' }
}

class Region extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    const { users, regions, region } = this.props
    const { handleOpenCreateDialog, handleOpenUpdateDialog, handleOpenReadDialog, handleOpenAlertDialog } = this.props
    const { handleCreate, handleRead, handleUpdate, handleDelete } = this.props

    const usersConfig = { text: 'name', value: 'id'}

    // button for alert dialog
    const actionsAlertDialog = [<FlatButton label={strings.button_label_ok} primary={true} onTouchTap={()=>handleOpenAlertDialog(false)} />]

    let rows = []

    regions.forEach(function(region) {
      rows.push(
        <TableRow>
          <TableRowColumn>{region.name}</TableRowColumn>
          <TableRowColumn>{region.order}</TableRowColumn>
        </TableRow>
      )
    }, this);

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
              onNewRequest={handleRead} />
            <ToolbarSeparator />
            <RaisedButton
              label={strings.button_label_create}
              primary={true}
              disabled={!user.id}
              onTouchTap={()=>handleOpenCreateDialog(true)} />
            <RaisedButton
              label={strings.button_label_update}
              primary={true}
              disabled={selected.length !== 1}
              onTouchTap={()=>handleOpenUpdateDialog(true)} />
            <RaisedButton
              label={strings.button_label_delete}
              primary={true}
              disabled={selected.length < 1}
              onTouchTap={handleDelete} />
            <RaisedButton
              label={strings.button_label_read}
              primary={true}
              onTouchTap={()=>handleOpenReadDialog(true)} />
          </ToolbarGroup>
        </Toolbar>

        <Table headerStyle={styles.region_table_header} bodyStyle={styles.region_table_body}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{strings.region_tableheadercolumn_name}</TableHeaderColumn>
              <TableHeaderColumn>{strings.region_tableheadercolumn_order}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
        
        <Dialog
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