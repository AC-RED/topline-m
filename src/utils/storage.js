export const getItem = name => {
  const data = window.localStorage.getItem(name)

  try {
    return JSON.parse(data)
  } catch (err) {
    console.log('转换失败', err)
    return data
  }
}

export const setItem = (name, value) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value

  window.localStorage.setItem(name, data)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
