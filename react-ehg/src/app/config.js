const CONFIG = {
  HOST: 'http://localhost:3000',
  PATH: '', 
  JSONAPI_DESERIALIZER_CONFIG: {
    keyForAttribute: 'camelCase'
  },
  ENTITY: {
    USER: 'user',
    HOMECARD: 'homecard',
    SCENE: 'scene',
    REGION: 'region',
    CATEGORY: 'category',
    DEVICE: 'device',
    INSTRUCTION: 'instruction',
    ICON: 'icon',
    COLOR: 'color',
    INSCAT: 'inscat',
    FAMILY: 'family',
    LOG: 'log'
  },
  DATA_SOURCE_CONFIG_USER: {
    text: 'name',
    value: 'id'
  },
  DRAWABLE: {
    COLOR: 'ic_color_rectangle'
  },
  USER_STATE: [
    {id: 1, name: '启用'},
    {id: 2, name: '停用'}
  ],
  LOG_CATEGORY: [
    {id: 1, name: '登录'},
    {id: 2, name: '操作'}
  ],
  MOBILE_PHONE_LOCAL: 'zh-CN'
}

export default CONFIG