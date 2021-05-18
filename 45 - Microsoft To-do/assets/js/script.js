// Variables declaration

let appFramework = document.querySelector(".app-framework");
let loaderComponent = document.querySelector("#loader");
let appComponent = document.querySelector(".app-component");
let timeLoad;
let timeElapsed = 0;

let settingsYear = new Date();
let appSettingsYear = document.querySelector("span#year");

let appBody = document.querySelector("#app-body");
let addBtn = document.querySelector("i#add-btn");
let appTaskBar = document.querySelector("input#app-taskbar");

let networkStatus = "Online";
let networkDisplay = document.querySelector("p.network-status");
let networkBubble = document.querySelector("i.network-bubble");
let onlineColor = "#5fe487";
let offlineColor = "#ffbe31";

let searchBar = document.querySelector(".app-search");
let searchInterface = document.querySelector(".body-search");
let appSearchBar = document.querySelector("input#app-searchBar");

let userSettingsComponent = document.querySelector(".userSetting");
let userProfile = document.querySelector(".app-profile");

let syncBtn = document.querySelector("button#sync-ac");
let syncState = document.querySelector("p.sync-failed");
let lastSyncStat = document.querySelector("span.sync-time");

let copyIDBtn = document.querySelector("#CopyId");
let userID = document.querySelector("#userId");
let clipInfo = document.querySelector("p.clip-info");

let openSettings = document.querySelector("li#open-settings");
let closeSettings = document.querySelector("i#return-app");
let settingsInterface = document.querySelector(".settings-interface");

let darkThemeBtn = document.querySelector("input#darkTheme");
let lightThemeBtn = document.querySelector("input#lightTheme");

let taskSpace = document.querySelector("ul.body-tasks");
let taskText,
    taskCache,
    taskInner,
    task,
    checkBox,
    starBox

// Loader Function

// timeLoad = setInterval(loadFunc, 30);

// function loadFunc() {

//   timeElapsed += 1;

//   if ( timeElapsed  == 100) {
//     clearInterval(timeLoad);
//     loaderComponent.classList.add("load-hidden");
//   }

// }

window.addEventListener("load", () => {

  loaderComponent.classList.add("load-hidden");
  appComponent.classList.remove("hidden");

  appSettingsYear.innerHTML = settingsYear.getFullYear();

}, false);

// App Background Function

let abstractBg = 'url("assets/img/app-bg/abstract-ms.jpg")';
let circleBg = 'url("assets/img/app-bg/circle-ms.jpg")';
let foxBg = 'url("assets/img/app-bg/fox-ms.jpg")';
let gradientBg = 'url("assets/img/app-bg/gradient-ms.jpg")';
let grootBg = 'url("assets/img/app-bg/groot-w.jpg")';
let hillsBg = 'url("assets/img/app-bg/hills-ms.jpg")';
let lineBg = 'url("assets/img/app-bg/line-ms.jpg")';
let lightForestBg = 'url("assets/img/app-bg/light-forest.jpg")';
let minimalistBg = 'url("assets/img/app-bg/minimalist-ms.jpg")';
let mountainBg = 'url("assets/img/app-bg/mountain-ms.jpg")';
let techBg = 'url("assets/img/app-bg/tech-w.jpg")';
let samuraiBg = 'url("assets/img/app-bg/samurai-ms.jpg")';
let spidermanBg = 'url("assets/img/app-bg/spiderman-w.jpg")';
let waveLightBg = 'url("assets/img/app-bg/bg.png")';
let waveDarkBg = 'url("assets/img/app-bg/bg-dark.png")';
let waveColorBg = 'url("assets/img/app-bg/bg-ms.jpg")';

appBody.style.backgroundImage = spidermanBg;

// Taskbar Function

appTaskBar.addEventListener("focus", () => {

  addBtn.setAttribute("class", "bi bi-circle")

}, false);

appTaskBar.addEventListener("blur", () => {

  if (appTaskBar.value.trim() != 0) {
    addBtn.setAttribute("class", "bi bi-circle")
  }else {
    addBtn.setAttribute("class", "bi bi-plus")
  }

}, false);

document.addEventListener("keyup", (e) => {

  if (e.keyCode == 13) {

    if (appTaskBar.value.trim() != 0) {

      let taskValue = appTaskBar.value;
      taskText = document.createTextNode(taskValue);
      taskCache = document.createElement("p");
      taskCache.appendChild(taskText);
      task = document.createElement("li");
      task.setAttribute("class", "task");
      taskInner = document.createElement("div");
      taskInner.setAttribute("class", "task-inner");
      checkBox = document.createElement("i");
      checkBox.setAttribute("class", "task-options bi bi-circle");
      starBox = document.createElement("i");
      starBox.setAttribute("class", "task-options bi bi-star");
      taskInner.appendChild(checkBox);
      taskInner.appendChild(taskCache);
      taskInner.appendChild(starBox);
      task.appendChild(taskInner);
      taskSpace.appendChild(task);
      appTaskBar.value = "";

    }

    checkBox.addEventListener("click", (e) => {

      let currentBx = e.target;
      let currentParent = e.target.parentNode;

      if(currentBx.classList.contains("bi-check-circle-fill")) {
        currentBx.classList.remove("bi-check-circle-fill");
        currentBx.classList.add("bi-circle");
        currentParent.classList.remove("checked");
      }else {
        currentBx.classList.add("bi-check-circle-fill");
        currentBx.classList.remove("bi-circle");
        currentParent.classList.add("checked");
      }

    }, false);

    starBox.addEventListener("click", (e) => {

      let currentStar = e.target;

      if(currentStar.classList.contains("bi-star-fill")) {
        currentStar.classList.remove("bi-star-fill");
        currentStar.classList.add("bi-star");
      }else {
        currentStar.classList.add("bi-star-fill");
        currentStar.classList.remove("bi-star");
      }

    }, false);

  }

}, false);

// Network Status

function hasNetwork (online) {

  if(online) {
    networkStatus = "Online"
    networkDisplay.innerHTML = `<i class="network-bubble" id="bubble" style="background: #5fe487"></i> ${networkStatus}`;
    
    syncBtn.innerHTML = "Syncing";
    syncBtn.classList.add("syncing");

    let timeSynced = 0;
    timeSync = setInterval(syncFunc, 30);
    syncBtn.disabled = false;

    let syncTimeStatComponent = new Date();
    const options = {weekday : "long", month : "long", day : "numeric", time: "full"};
    let syncTimeStat = syncTimeStatComponent.toLocaleTimeString("en-US", options);
  
    function syncFunc() {
  
      timeSynced += 1;
  
      if ( timeSynced  == 100) {
        clearInterval(timeSync);
        syncBtn.classList.remove("syncing");
        syncBtn.innerHTML = "Sync";
        syncState.classList.remove("syncing");
        lastSyncStat.innerHTML = `Last succesful sync: ${syncTimeStat}`;
        syncState.innerHTML =  `<i class="bi bi-check-circle"></i> Everything is successfully synced. Lets go!`;
        syncState.classList.add("online");
      }
  
    }  
    
    syncBtn.addEventListener("click", () => {

      
      syncBtn.innerHTML = "Syncing";
      syncBtn.classList.add("syncing");
      syncState.classList.add("syncing");
    
      let syncTimeStatComponent = new Date();
      const options = {weekday : "long", month : "long", day : "numeric", time: "full"};
    
      let timeSyncedA = 0;
    
      timeSyncA = setInterval(syncFuncA, 30);
    
      function syncFuncA() {
    
        timeSyncedA += 1;
    
        if ( timeSyncedA  == 100) {
          clearInterval(timeSyncA);
          syncBtn.classList.remove("syncing");
          syncBtn.innerHTML = "Sync";
          syncState.classList.remove("syncing");
          let syncTimeStat = syncTimeStatComponent.toLocaleTimeString("en-US", options);
          lastSyncStat.innerHTML = `Last succesful sync: ${syncTimeStat}`;
        }
    
      }
    
    }, false);

  }else {
    networkStatus = "Offline"
    networkDisplay.innerHTML = `<i class="network-bubble" id="bubble" style="background: #ffbe31"></i> ${networkStatus}`;
    syncBtn.innerHTML = "Sync";
    syncBtn.classList.remove("syncing");
    syncState.classList.remove("online");
    syncState.innerHTML =  `<i class="bi bi-exclamation-circle"></i> Your offline. Please check your internet connection and try again.`;
    syncBtn.disabled = true;
  }

}


window.addEventListener("load", () => {

  hasNetwork(navigator.onLine);

  window.addEventListener("online", () => {

    hasNetwork(true);

  });

  window.addEventListener("offline", () => {

    hasNetwork(false);

  });

}, false);

// Search Function

searchBar.addEventListener("click", () => {

  if (searchBar.classList.contains("search-app")) {
    searchBar.classList.remove("search-app");
    searchInterface.classList.remove("search-visible");
  }else {
    searchBar.classList.add("search-app");
    searchInterface.classList.add("search-visible");
    appSearchBar.focus();
  }

}, false);

// User Settings

userProfile.addEventListener("click", () => {

  if (userSettingsComponent.classList.contains("user-visible")) {
    userSettingsComponent.classList.remove("user-visible");
  }else {
    userSettingsComponent.classList.add("user-visible");
  }

}, false);

copyIDBtn.addEventListener("click", () => {

  userID.select();
  document.execCommand("copy");

  let timeElapsed = 0;
    
  timeClip = setInterval(clipInfoFunc, 30);

  function clipInfoFunc() {

    clipInfo.classList.add("clipped");

    timeElapsed += 2;

    if ( timeElapsed  == 100) {
      clearInterval(timeClip);
      clipInfo.classList.remove("clipped");

    }

  }

}, false);

openSettings.addEventListener("click", () => {

  settingsInterface.classList.remove("hidden");

}, false);

closeSettings.addEventListener("click", () => {

  settingsInterface.classList.add("hidden");

}, false);

darkThemeBtn.addEventListener("click", () => {

  if (darkThemeBtn.checked) {
    appFramework.classList.add("dark");
    appBody.style.backgroundImage = waveDarkBg;
  }else if (lightThemeBtn.checked) {
    appFramework.classList.remove("dark");
    appBody.style.backgroundImage = waveLightBg;
  }

}, false);

lightThemeBtn.addEventListener("click", () => {

  if (darkThemeBtn.checked) {
    appFramework.classList.add("dark");
    appBody.style.backgroundImage = waveDarkBg;
  }else if (lightThemeBtn.checked) {
    appFramework.classList.remove("dark");
    appBody.style.backgroundImage = spidermanBg;
  }

}, false);