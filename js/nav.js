"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();

  //Stars
  favoriteIconEvent();
  updateStarIcons();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//When a user clicks on the "New Story" link, show the submission form.
function navNewStoryClick(evt){
  console.debug("navNewStoryClick", evt);
  $submissionForm.toggle();
}

$navNewStory.on("click", navNewStoryClick);

//When a user clicks on the "Favorites" link, show the favorites list.
function navFavoritesClick(evt){
  evt.preventDefault();
  console.debug("navFavoritesClick", evt);
  //Hide the main page content.
  hidePageComponents();
  //Show the favorites list.
  $favoriteStories.show();

  putFavoritesOnPage();
  favoriteIconEvent();
  updateStarIcons();
}

$navFavorites.on("click", navFavoritesClick);






//Copied the "putStoriesOnPage" code and redid it for favorite stories.


// function generateFavoriteMarkup(story) {
//   // console.debug("generateStoryMarkup", story);

//   const hostName = story.getHostName();
//   return $(`
//       <li id="${story.storyId}">
//         <i class="far fa-star" data-story-id = "${story.storyId}"></i>
//         <a href="${story.url}" target="a_blank" class="story-link">
//           ${story.title}
//         </a>
//         <small class="story-hostname">(${hostName})</small>
//         <small class="story-author">by ${story.author}</small>
//         <small class="story-user">posted by ${story.username}</small>
//       </li>
//     `);
// }

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $favoriteStories.empty();

  // loop through all of our favorite stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $favoriteStories.append($story);
  }

  $favoriteStories.show();
}







//Same code copies for favories to "My Stories"

//When a user clicks on the "My Stories" link, show the user stories list.
function navUserStoriesClick(evt){
  evt.preventDefault();
  console.debug("navUserStoriesClick", evt);
  //Hide the main page content.
  hidePageComponents();
  //Show the favorites list.
  $userStories.show();

  putUserStoriesOnPage();
  favoriteIconEvent();
  updateStarIcons();
}

$navUserStories.on("click", navUserStoriesClick);



function generateUserStoriesMarkup(story) {
  // console.debug("generateUserStoriesMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <i class="fas fa-trash" data-story-id = "${story.storyId}"></i>
        <i class="far fa-star" data-story-id = "${story.storyId}"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $userStories.empty();

  // loop through all of our UserStories stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateUserStoriesMarkup(story);
    $userStories.append($story);
  }

  $userStories.show();
  trashIconEvent();
}

