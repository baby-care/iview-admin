import env from './env'

const DEV_URL = 'http://192.168.3.137:12200'
const PRO_URL = ''

export default env === 'development' ? DEV_URL : PRO_URL
