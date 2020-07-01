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

function getServerData(){
  fetch('/data').then(response => response.json()).then((comments) => {
    const serverContainer = document.getElementById('server-container');
    let text = comments[Math.floor(Math.random() * comments.length)];
     
    serverContainer.innerHTML = "<Strong>" + text.name + "</Strong>: " + text.comment;
  });
}
