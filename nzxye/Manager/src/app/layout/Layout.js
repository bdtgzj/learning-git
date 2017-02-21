// react
import React, {Component} from 'react'
// material-ui
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationApps from 'material-ui/svg-icons/navigation/apps'
import IconHome from 'material-ui/svg-icons/action/home'
import IconFace from 'material-ui/svg-icons/action/face'
import IconStats from 'material-ui/svg-icons/action/trending-up'
import IconUser from 'material-ui/svg-icons/action/account-box'
import IconSetting from 'material-ui/svg-icons/action/settings'
import IconLog from 'material-ui/svg-icons/device/dvr'
import IconRefresh from 'material-ui/svg-icons/action/autorenew'
import IconHelp from 'material-ui/svg-icons/action/help'
import IconSignOut from 'material-ui/svg-icons/image/adjust'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
// react-router
import { IndexLink } from 'react-router'
// custom components
import NavLink from '../components/NavLink'
import Logo from '../components/Logo'
// res
import strings from '../res/strings'
import styles from '../res/styles'

class Layout extends Component {

  constructor() {
    super()
    this.state = {
      drawerState: true,
      rightContentStyle: {marginLeft: '256px'}
    }
  }

  handleDrawerState(drawerState) {
    let rightContentStyle = drawerState ? {marginLeft: '0'} : {marginLeft: '256px'}
    this.setState({
      drawerState: !drawerState,
      rightContentStyle: rightContentStyle
    })
  }

  render() {

    const { children, layout } = this.props
    const { handleOpenAlertDialog, handleRefresh } = this.props

    const actionsAlertDialog = [
      <FlatButton label={strings.button_label_ok} primary={true} onTouchTap={()=>handleOpenAlertDialog(false)} />
    ]

    return (
      <div>
        <AppBar
          title={strings.layout_appbar_title}
          style={styles.layout_appbar}
          iconElementLeft={ <IconButton onTouchTap={() => this.handleDrawerState(this.state.drawerState)}><NavigationApps /></IconButton> }
          iconElementRight={
            <IconMenu
              iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
              <MenuItem primaryText={strings.layout_menuitem_refresh} leftIcon={<IconRefresh />} onTouchTap={handleRefresh} />
              <MenuItem primaryText={strings.layout_menuitem_help} leftIcon={<IconHelp />} onTouchTap={handleRefresh} />
              <IndexLink to="/signout">
                <MenuItem primaryText={strings.layout_menuitem_signout} leftIcon={<IconSignOut />} />
              </IndexLink>
            </IconMenu>
          }
        />
        <div id="leftNav">
          <Drawer open={this.state.drawerState} containerStyle={styles.layout_drawer}>
            <IndexLink to="/" activeClassName="activeLink">
              <MenuItem leftIcon={<IconHome />}>{strings.layout_link_home}</MenuItem>
            </IndexLink>
            <Divider />
            <NavLink to="/face">
              <MenuItem leftIcon={<IconFace />}>{strings.layout_link_face}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/stats">
              <MenuItem leftIcon={<IconStats />}>{strings.layout_link_stats}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/user">
              <MenuItem leftIcon={<IconUser />}>{strings.layout_link_user}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/setting">
              <MenuItem leftIcon={<IconSetting />}>{strings.layout_link_setting}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/log">
              <MenuItem leftIcon={<IconLog />}>{strings.layout_link_log}</MenuItem>
            </NavLink>
            <Divider />
          </Drawer>
        </div>
        <div id="rightContent" style={this.state.rightContentStyle}>{children}</div>
        <Dialog
          title={strings.dialog_title_prompt}
          actions={actionsAlertDialog}
          modal={true}
          style={styles.alertDialog}
          contentStyle={styles.alertDialogContent}
          open={layout.alertDialog.isVisible}>
          <div>{layout.alertDialog.content}</div>
        </Dialog>
      </div>
    );
  }

}

export default Layout
