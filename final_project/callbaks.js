const axios = require('axios').default;

axios.get('https://u31136-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('https://u31136-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/1')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('https://u31136-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/Jane Austen')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('https://u31136-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/The Epic Of Gilgamesh')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });