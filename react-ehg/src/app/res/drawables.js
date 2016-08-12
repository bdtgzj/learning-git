import React from 'react'
import SvgIcon from 'material-ui/SvgIcon'

/**
 * For color
 */
const ColorRectangle = (props) => (
  <SvgIcon {...props}>
    <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z" />
  </SvgIcon>
)

/**
 * Icon
 */
const DeviceLight = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
)

const DeviceAircon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
)

const DeviceCurtain = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
)

const drawables = {
  'ic_color_rectangle': color => <ColorRectangle color={color} />,
  'ic_device_light': <DeviceCurtain />,
  'ic_device_aircon': <DeviceAircon />,
  'ic_device_curtain': <DeviceCurtain />
}

export default drawables