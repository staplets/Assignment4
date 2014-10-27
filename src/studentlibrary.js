//Author: Shaun Stapleton
//Date created: 10/23/14
//Last Edited: 10/26/14
//Assignment 4 - 494

//assigning request
//var request = new XMLHttpRequest();

function ajaxRequest(URL, Type, Parameters) {

  var request = new XMLHttpRequest;
  this.URL = URL + Parameters.city + ',' + Parameters.state + '&units=metric';

   //if request failed
  if(!request) {
    alert('Page request failed.');
	return false;
  }
 
  //create object 
  var createdObj = {}
    createdObj.success = false;
	createdObj.code = undefined;
    createdObj.codeDetail = undefined;
    createdObj.response = undefined;
	
	
  //test the state of the request and response code
  //assign the response if complete and success
  request.onreadystatechange = function() {
    if(request.readyState === 4) {
      createdObj.code = request.status;
      createdObj.codeDetail = request.statusText;
      createdObj.response = request.responseText;
	
 	  if(request.status >= 200 && request.status <= 226) {
	    createdObj.success = true;
	    }
	}
  };
  
   /* 
   // Prepare GET or POST request details
  var url = URL;    // local URL in case of GET
  var strungURL = urlStringify(Parameters);
  // Set up GET or POST details
  if (Type === 'GET') {
    url += strungURL;
  } else if (Type !== 'POST') {
    // it's not GET or POST, throw error
    throw 'HTTP request type is not GET or POST.';
  }
   */
  /*
  if (Type === 'POST') {
  request.open(Type, URL);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(strungURL);
  }
  else if (Type === 'GET') {
  request.open(Type, URL);
  request.send();
  URL += strungURL;
  }
  */
    //determine method to make call
  if (Type === 'GET'){
    URL += '?' + stringURL(Parameters);
    console.debug('UR:', URL);
    request.open(Type, URL, true);
    request.send();
  } else if(Type === 'POST') {
    request.open(Type, URL, true);
    request.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
    request.send(stringURL(Parameters));
  } else {
    alert('Request must be POST or GET');
	return;
	}
  
  return createdObj;
}

//used some of information from videos
function stringURL(param){
  var endOfURL = '';
  for (var property in param){
    endOfURL += encodeURIComponent(property) + '=' +
     encodeURIComponent(param[property]) + '&';
  }
  return endOfURL;
}

//test the local storage by returning
//boolean true/false
function localStorageExists() {
  localStorage.setItem('testing', 'true');
  var works = localStorage.getItem('testing');
  if(works === 'true') {
    return true;
  }
  return false;
}
