import axios from 'axios'

export function register(piUrl, doorId) {
  const piApiUrl = piUrl + "/register";
  const requestBody = {
    queueId: doorId
  };
  axios({
    method: 'post',
    url: piApiUrl,
    data: {
      requestBody
    }
  })
  .then(data=>console.log(data))
  .catch(err=>console.log(err))
}
