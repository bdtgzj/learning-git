import fetch from 'isomorphic-fetch'

export const jsonContentTypes = [
  'application/json',
  'application/vnd.api+json'
]

export const apiRequest = (url, accessToken, options={}) => {
  const allOptions = {
    headers: {
      Authorization: `Basic ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    ...options
  }

  return fetch(url, allOptions)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        if (jsonContentTypes.some(contentType => res.headers.get('Content-Type').indexOf(contentType) > -1)) {
          return res.json();
        }
        return res;
      }

      const e = new Error(res.statusText);
      e.response = res;
      throw e;
    })
}

export default apiRequest