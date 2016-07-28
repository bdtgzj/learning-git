import React, {Component} from 'react'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationApps from 'material-ui/svg-icons/navigation/apps'
import IconHome from 'material-ui/svg-icons/action/home'
import IconHomeCard from 'material-ui/svg-icons/av/add-to-queue'
import IconScene from 'material-ui/svg-icons/device/wallpaper'
import IconRegion from 'material-ui/svg-icons/action/dashboard'
import IconCategory from 'material-ui/svg-icons/content/low-priority'
import IconDevice from 'material-ui/svg-icons/device/devices'
import IconUser from 'material-ui/svg-icons/action/account-box'
import IconAdmin from 'material-ui/svg-icons/action/accessibility'
import IconSetting from 'material-ui/svg-icons/action/settings'
import IconRefresh from 'material-ui/svg-icons/action/autorenew'
import IconHelp from 'material-ui/svg-icons/action/help'
import IconSignOut from 'material-ui/svg-icons/image/adjust'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import { IndexLink } from 'react-router'
import NavLink from './NavLink'

import Logo from '../components/Logo'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

const strings = {
  layout_appbar_title: '江苏易家智',
  layout_menuitem_refresh: '刷新',
  layout_menuitem_help: '帮助',
  layout_menuitem_signout: '退出',
  layout_link_home: '首页',
  layout_link_category: '设备分类',
  layout_link_region: '设备区域',
  layout_link_device: '设备管理',
  layout_link_scene: '场景管理',
  layout_link_homecard: '首页管理',
  layout_link_user: '客户管理',
  layout_link_admin: '账户管理',
  layout_link_setting: '系统设置'
}

const styles = {
  drawer: { marginTop: '64px' },
  circularProgress: { display: 'none' },
  dialogContent: { width: '50%' }
}

class Layout extends Component {

  constructor() {
    super()
    this.state = { 
      drawerState: true,
      rightContentStyle: {marginLeft: '260px'}
    }
  }

  handleDrawerState(drawerState) {
    let rightContentStyle = drawerState ? {marginLeft: '0'} : {marginLeft: '260px'}
    this.setState({ 
      drawerState: !drawerState,
      rightContentStyle: rightContentStyle
    })
  }

  render() {

    const { children } = this.props;

    //const actions = [<FlatButton label={strings.login_dialog_ok} primary={true} onTouchTap={onDialogOk} />]

    return (
      <div>
        <AppBar
          title={strings.layout_appbar_title}
          iconElementLeft={ <IconButton onTouchTap={() => this.handleDrawerState(this.state.drawerState)}><NavigationApps /></IconButton> }
          iconElementRight={
            <IconMenu
              iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
              <MenuItem primaryText={strings.layout_menuitem_refresh} leftIcon={<IconRefresh />} />
              <MenuItem primaryText={strings.layout_menuitem_help} leftIcon={<IconHelp />} />
              <MenuItem primaryText={strings.layout_menuitem_signout} leftIcon={<IconSignOut />} />
            </IconMenu>
          }
        />
        <div id="leftNav">
          <Drawer open={this.state.drawerState} containerStyle={styles.drawer}>
            <IndexLink to="/" activeClassName="activeLink">
              <MenuItem leftIcon={<IconHome />}>{strings.layout_link_home}</MenuItem>
            </IndexLink>
            <Divider />
            <NavLink to="/homecard">
              <MenuItem leftIcon={<IconHomeCard />}>{strings.layout_link_homecard}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/scene">
              <MenuItem leftIcon={<IconScene />}>{strings.layout_link_scene}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/region">
              <MenuItem leftIcon={<IconRegion />}>{strings.layout_link_region}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/category">
              <MenuItem leftIcon={<IconCategory />}>{strings.layout_link_category}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/device">
              <MenuItem leftIcon={<IconDevice />}>{strings.layout_link_device}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/user">
              <MenuItem leftIcon={<IconUser />}>{strings.layout_link_user}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/admin">
              <MenuItem leftIcon={<IconAdmin />}>{strings.layout_link_admin}</MenuItem>
            </NavLink>
            <Divider />
            <NavLink to="/setting">
              <MenuItem leftIcon={<IconSetting />}>{strings.layout_link_setting}</MenuItem>
            </NavLink>
            <Divider />
          </Drawer>
        </div>
        <div id="rightContent" style={this.state.rightContentStyle}>{children}</div>
      </div>
    );
  }

}

export default Layout