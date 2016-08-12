const CONFIG = {
  HOST: 'http://localhost:3000',
  PATH: '', 
  JSONAPI_DESERIALIZER_CONFIG: {
    keyForAttribute: 'camelCase'
  },
  ENTITY: {
    USER: 'user',
    REGION: 'region',
    CATEGORY: 'category',
    DEVICE: 'device',
    ICON: 'icon',
    COLOR: 'color',
    ERROR: 'error'
  },
  DATA_SOURCE_CONFIG_USER: {
    text: 'name',
    value: 'id'
  }
}

export default CONFIG