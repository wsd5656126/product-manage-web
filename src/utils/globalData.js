let globalData = {}

export function getGlobalData (key) {
  return key ? globalData[key] : globalData
}

export function setGlobalData (key, value) {
  if (key === undefined || value === undefined) {
    return
  }
  globalData = {...globalData, [key]: value}
  return globalData
}

export function clearGlobalData (key) {
  if (key == undefined) {
    globalData = {};
  } else {
    delete globalData[key];
  }
  return globalData
}
