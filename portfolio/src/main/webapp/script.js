// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** 
 * Allows a button to be clicked successively in order to
 * display a personal summary, then a photograph. 
 */
function showNext() {
  const summaryContainer = document.getElementById('summary');
  const imageContainer = document.getElementById('picture');
  if (summaryContainer.innerText.length == 0) {
    showSummary();
  } else if (imageContainer.childElementCount == 0) { 
    showPicture();
  }
}

function showSummary(){
  const summaryContainer = document.getElementById('summary');
  const summaryText = 'Currently, I\'m a 2nd year student' + 
  ' at the Rose-Hulman Institute of Technology working towards' +
  ' a bachelor in Computer Science. I grew up in Louisville,' +
  ' Kentucky and moved on to college early. I completed two years' +
  ' at Western Kentucky University while simultaneously obtaining' +
  ' my highschool diploma. The summer of my graduation I was' +
  ' accepted as a Google CSSI student and spent 3 weeks at the' +
  ' Google Cambridge Office. A year later and I am now working' +
  ' as a virtual Google intern in my hometown of Louisville.';
  summaryContainer.innerText = summaryText;
}

function showPicture(){
  const imgUrl = 'Me.jpg';
  const imgElement = document.createElement('img');
  imgElement.width = '550';
  imgElement.height = '450';
  imgElement.src = imgUrl;
  const imageContainer = document.getElementById('picture');
  imageContainer.appendChild(imgElement);    
}

/**
 * Alerts the user when they have failed to fill out all required
 * input fields.
 */
function required(event) {
    const nameElement = document.forms['form1']['user-name'].value;
    const commentElement = document.forms['form1']['user-comment'].value;
    const submitButton = document.forms['form1'];
    if (isEmpty(nameElement) || isEmpty(commentElement)){
      event.preventDefault();
      alert("Please complete all required fields!");
      return false;
    }
    return true;
}

function isEmpty(str){
    return (str == ''||!str);
}

function getDatastoreComments(){
  fetch('/data').then(response => response.json()).then((comments) => {
    const serverContainer = document.getElementById('server-container');
    serverContainer.innerHTML = '';
    comments.forEach((comment) => {
      serverContainer.appendChild(createCommentBox(comment));
    })
  });
}

function showComments() {
  fetch('/login').then(response => response.json()).then((status) => {
    const headerContainer = document.getElementById('header');
    if (headerContainer.childElementCount == 3) {
      const link = document.createElement('a');
      link.innerText = status.titleText;
      link.href = status.url;
      headerContainer.appendChild(link);
    }
    
    if (status.signedIn == true){  
      const serverContainer = document.getElementById('server-container');
      const form = document.forms['form1'];
      form.style.visibility = 'visible';
      serverContainer.style.display = 'inline';
    } else {
      alert("Please sign in using the link above.");
    }
  });
}

/**
 * Creates a small box which shows a user's name and comment.
 * Also includes a button to delete the box and the information
 * from the datastore. 
 */
function createCommentBox(comment) {
  const boxElement = document.createElement('div');
  boxElement.className = 'boxes';

  const nameElement = document.createElement('strong');
  nameElement.className = 'userName';
  nameElement.innerText = comment.userName;

  const commentElement = document.createElement('p');
  commentElement.className = 'userComment';
  commentElement.innerText = comment.text;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);
    boxElement.remove();
  });

  boxElement.appendChild(nameElement);
  boxElement.appendChild(commentElement);
  boxElement.appendChild(deleteButtonElement);
  return boxElement;
}

function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}
