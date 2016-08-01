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
  region_table_body: { marginTop: '176px' }
}

class Region extends Component {

  componentDidMount() {
    this.autoCompleteUser.focus()
  }

  render() {

    //const {  } = this.props.region;
    const { data: datas } = this.props.api.regions || {data: []};

    //const actions = [<FlatButton label={strings.login_dialog_ok} primary={true} onTouchTap={onDialogOk} />]

    let rows = []

    datas.forEach(function(data) {
      rows.push(
        <TableRow>
          <TableRowColumn>{data.name}</TableRowColumn>
          <TableRowColumn>{data.order}</TableRowColumn>
        </TableRow>
      )
    }, this);

    return (
      <div>
      <Toolbar style={styles.region_toolbar}>
        <ToolbarGroup>
          <AutoComplete
            hintText={strings.region_toolbar_autocomplete_placeholder}
            dataSource={['aa','bb', 'cc']}
            onUpdateInput={this.handleUpdateInput}
            ref={(node) => this.autoCompleteUser=node}
          />
          <ToolbarSeparator />
          <RaisedButton label={strings.button_label_create} primary={true} />
          <RaisedButton label={strings.button_label_update} primary={true} />
          <RaisedButton label={strings.button_label_delete} primary={true} />
          <RaisedButton label={strings.button_label_read} primary={true} />
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
      </div>
    );
  }

}

export default Region