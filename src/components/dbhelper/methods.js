export function handleGetPromise(URL){
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', URL, true);
      req.responseType = "json";
      req.mode = "cors";
      req.setRequestHeader("Accept", "application/json");
      if(localStorage.getItem("logintoken")!=null){
        req.setRequestHeader("Authorization","Bearer "+localStorage.getItem("logintoken"));
      }else{
        req.setRequestHeader("Authorization","Bearer invalidtoken");
      }
      
      req.onload = function () {
          if (req.status === 200) {
              resolve(req);
          } else {
              reject(new Error(req.statusText));
          }
      };
      req.onerror = function () {
          reject(new Error(req.statusText));
      };
      req.send();
    });
  }
  /*wait to be tested*/
  export function handlePostPromise(URL,data){
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('POST', URL, true);
      req.responseType = "json";
      req.mode = "cors";
      req.setRequestHeader("Accept", "application/json");
      req.onload = function (){
        if(req.status === 200){
          resolve(req);
        } else {
          reject(new Error(req.statusText));
        }
      };
      req.onerror = function (){
        reject(new Error(req.statusText));
      };
      req.send(data);
    });
  }
  //
  export function handlePostJson(URL,data){
    return fetch(URL,{
      method:'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        'Authorization':"Bearer "+localStorage.getItem("logintoken")
      }
    }).then(
      function(res){
        return res.json();
      }
    )
  }


  export function handleDeleteJSON(URL,data){
    return fetch(URL,{
      method:'DELETE',
      mode:'cors',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        'Authorization':"Bearer "+localStorage.getItem("logintoken")
      }
    }).then(
      function(res){
        return res.json();
      }
    )
  }
  