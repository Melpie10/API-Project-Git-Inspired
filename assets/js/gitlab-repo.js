// add api key for gitlab
// make a search bar for gitlab
// change the css
// add bulma
// add a local storage element to save the searches.




var usergitlabFormEl = document.querySelector('#usergitlab-form');
var namegitlabInputEl = document.querySelector('#usernamegit');
var repogitlabContainerEl = document.querySelector('#reposgitlab-container');
var repogitlabSearchTerm = document.querySelector('#repogitlab-search-term');
var savedSearches = [];
var apiKey= "glpat-ebyHazYuFrunYaM18Eug"

var formSubmitHandler = function (event) {
  event.preventDefault();

  var usernamegit = namegitlabInputEl.value.trim();

  if (usernamegit) {
    getUserGitlabRepos(usernamegit);

    repogitlabContainerEl.textContent = '';
    namegitlabInputEl.value = '';
  } else {
    alert('Please enter a GitLab username');
  }
};

// var buttonClickHandler = function (event) {
//   var language = event.target.getAttribute('data-language');

//   if (language) {
//     getFeaturedRepos(language);

//     repogitlabContainerEl.textContent = '';
//   }
// };

var getUserGitlabRepos = function (userid) {
  var apiUrl = 'https://gitlab.com/api/v4//users/' + userid + '/projects';
  

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayGitlabRepos(data, userid);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitLab');
    });
};



var displayGitlabRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repogitlabContainerEl.textContent = 'No projects found.';
    return;
  }

  repogitlabSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoGitlabName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoGitlabName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoGitlabName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repogitlabContainerEl.appendChild(repoEl);
  }
};

// // make list of previously searched repos
// var searchHistoryList = function(user) {
//   $('.past-search:contains("' + user + '")').remove();

//   // create entry with repo username
//   var searchHistoryEntry = $("<p>");
//   searchHistoryEntry.addClass("past-search");
//   searchHistoryEntry.text(user);

//   // create container for entry
//   var searchEntryContainer = $("<div>");
//   searchEntryContainer.addClass("past-search-container");

//   // append entry to container
//   searchEntryContainer.append(searchHistoryEntry);

//   // append entry container to search history container
//   var searchHistoryContainerEl = $("#search-history-container");
//   searchHistoryContainerEl.append(searchEntryContainer);

//   if (savedSearches.length > 0){
//       // update savedSearches array with previously saved searches
//       var previousSavedSearches = localStorage.getItem("savedSearches");
//       savedSearches = JSON.parse(previousSavedSearches);
//   }

//   // add username to array of saved searches
//   savedSearches.push(user);
//   localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

//   // reset search input
//   $("#search-input").val("");

// };

// // load saved search history entries into search history container
// var loadSearchHistory = function() {
//   // get saved search history
//   var savedSearchHistory = localStorage.getItem("savedSearches");

//   // return false if there is no previous saved searches
//   if (!savedSearchHistory) {
//       return false;
//   }

//   // turn saved search history string into array
//   savedSearchHistory = JSON.parse(savedSearchHistory);

//   // go through savedSearchHistory array and make entry for each item in the list
//   for (var i = 0; i < savedSearchHistory.length; i++) {
//       searchHistoryList(savedSearchHistory[i]);
//   }
// };


usergitlabFormEl.addEventListener('submit', formSubmitHandler);


// loadSearchHistory();