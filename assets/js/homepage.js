// change the css
// add bulma
// add a local storage eleent to save the searches.


var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var savedSearches = [];


var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
};

var getUserRepos = function (user) {
  var apiUrl = 'https://api.github.com/users/' + user + '/repos';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};


// key: todoList Value: this is a message
let todoList = "this is an message";
// localStorage.setItem("todoList", todoList);
todoList = localStorage.getItem("todoList");
console.log(todoList);



var getFeaturedRepos = function (language) {
  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};


var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

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

    repoContainerEl.appendChild(repoEl);
  }
};


var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No projects found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

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

    repoContainerEl.appendChild(repoEl);
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


userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);

// loadSearchHistory();