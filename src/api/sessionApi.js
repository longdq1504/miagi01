import apiConfig from '../common/apiConfigs'
// Simulates server calls

export const login = (user) => {
  // return fetch(apiConfig.base_url + 'auth/login', {
  //   method: "post",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     email: user.email,
  //     password: user.password
  //   })
  // })
  // .then(response => response.json()) //map

  
  return new Promise((resolve, reject) => { // thu tu param truyen vao resolve, reject (xxx - yyy)
    fetch(apiConfig.base_url + 'auth/login', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      if (res.code === 0) {
        resolve(res.data);
      }  else {
        reject(res.message);
      }
    })
    .catch(err => reject(err))
  });
};

export const logout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};
