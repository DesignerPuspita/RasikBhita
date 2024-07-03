const dev = {
  
  API_ENDPOINT_URL: 'http://93.127.195.166:8080/user/'
 // API_ENDPOINT_URL: 'http://182.73.216.94:8443/'
  // API_ENDPOINT_URL: 'http://182.73.216.91:8443/'
};

const stag = {

};

const prod = {

};

const getEnv = () => {
  switch (process.env.REACT_APP_ENV) {
    case 'dev':
      return dev;
    case 'prod':
      return prod;
    case 'stag':
      return stag;
    default:
      return dev;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const env = getEnv();

