/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];
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
              <span>${timeago.format(tweet.created_at)}</span>
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
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(".tweets-container").prepend($tweet);
  }
};

function escape(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function errorMessage(msg) {
  const errorMsg = `
  <i class="fa-solid fa-triangle-exclamation"></i>
  <p>${msg}</p>
  `;
  return $(errorMsg);
}

$(() => {

  const loadTweets = function() {
    $.get("/tweets").done(function(tweets) {
      renderTweets(tweets);
    });
  };
  loadTweets();
  $("#tweet-entry").on("submit", function(event) {
    event.preventDefault();

    const tweetText = escape($("#tweet-text").val());

    if (!tweetText) {
      if ($("#validation-error-msg").hasClass("hidden")) {
      $("#validation-error-msg").removeClass("hidden");
      $("#validation-error-msg").append(errorMessage("Please enter text"));
      }
    } else if (tweetText.length > 140) {
      $("#validation-error-msg").removeClass("hidden");
      $("#validation-error-msg").append(errorMessage("Tweets must be 140 characters or less"));
    } else {
      if (!$("#validation-error-msg").hasClass("hidden")) {
        $("#validation-error-msg").addClass("hidden");
      }
      $.post("/tweets", { text: tweetText }).done(function(tweets) {
        $("tweets-container").empty();
        $("#tweet-text").val('');
        loadTweets();
      });
    }
  });
});
