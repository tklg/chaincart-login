let url, appUrl
const loc = window.location
if (loc.hostname === 'localhost') {
  url = `${loc.protocol}//${loc.hostname}:3001`
  appUrl = `${loc.protocol}//${loc.hostname}/app`
} else {
  url = `${loc.protocol}//api.${loc.host}`
  appUrl = `${loc.protocol}//${loc.host}/app`
}

module.exports = {
  api (str) {
    return url + '/' + str
  },
  url,
  appUrl
}
