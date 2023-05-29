/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// HTML markup for how tweet should appear
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

// adding new tweets to tweets container
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(".tweets-container").prepend($tweet);
  }
};

// required to prevent cross-site scripting
function escape(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// HTML markup for error message that is passed in
function errorMessage(msg) {
  const errorMsg = `
  <i class="fa-solid fa-triangle-exclamation"></i>
  <p>${msg}</p>
  `;
  return $(errorMsg);
}


// document ready function begins

$(() => {

  const loadTweets = function() {
    $.get("/tweets").done(function(tweets) {
      renderTweets(tweets);
    })
    .fail(function(error) {
      console.log("Error loading tweets:", error);  
    });
  };
  loadTweets();

  // event listener for submit
  $("#tweet-entry").on("submit", function(event) {
    event.preventDefault();

    // tweet validation
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
        $("#validation-error-msg").empty();
      }

      // send tweet to server db
      $.post("/tweets", { text: tweetText }).done(function(tweets) {
        $("#tweet-text").val('');
        $("#tweets-container").empty();
        $("#counter").val(140);
        loadTweets();
      });
    }
  });
});
