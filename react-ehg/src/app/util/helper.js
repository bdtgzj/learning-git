export function getDeviceName(devices, obj) {
  if (!obj.deviceName) return ''
  let regionName = ''
  for (var i = 0; i < devices.length; i++) {
    if (devices[i].id === obj.deviceId) {
        regionName = devices[i].regionName
        break
    }
  }
  return `${obj.deviceName}【${regionName}】`
}

export function getSceneName(scenes, obj) {
  if (!obj.sceneName) return ''
  let regionName = ''
  for (var i = 0; i < scenes.length; i++) {
    if (scenes[i].id === obj.sceneId) {
        regionName = scenes[i].regionName
        break
    }
  }
  return `${obj.sceneName}【${regionName}】`
}