/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweet) {
  let $tweet = `
  <article>
            <header class="tweet-header">
              <div class="user">
              <img class="user-icon" src=${tweet.user.avatars} />
                <span>${tweet.user.name}</span>
              </div>
              <span class="handle">${tweet.user.handle}</span>
            </header>
            <p class="tweet-body">${tweet.content.text}</p>
            <footer class="tweet-footer">
              <span>?</span>
              <div class="tweet-icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-sharp fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`;
  return $tweet;
};

const renderTweets = function(tweets) {
  $(document).ready(() => {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $(".tweets-container").append($tweet);
    }
  });
};

renderTweets(data);

$(document).ready(function() {
  $("#tweet-submit").on("submit", function(event) {
    event.preventDefault();
    $.post("/tweets", $(this).sesrialize()).done(function(data) {
      console.log("Result:", data);
    });
  });
});