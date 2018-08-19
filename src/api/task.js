import axios from '@/libs/api.request'

export const getImportSourceInfo = () => {
  const result = axios.request({
    url: '/api/v1/data/import',
    method: 'get'
  })

  return result
}
