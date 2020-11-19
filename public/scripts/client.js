/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  function createTweetElement(tweetData) {
    const dayInMs = 1000 * 60 * 60 * 24;

    const daysPassed = Math.floor(
      (Date.now() - tweetData.created_at) / dayInMs
    );
    const $tweet = `
    <article class="tweet">
          <header class="tweet-header active">
            <div class="avatar-container">
              <div>
                <img class="avatar-img active" src="${tweetData.user.avatars}" />
              </div>
              <div class="avatar-name active">${tweetData.user.name}</div>
            </div>
            <div class="avatar-handle">${tweetData.user.handle}</div>
          </header>
          <div class="tweet-body-container">
            <div class="tweet-body active">${tweetData.content.text}</div>
          </div>
          <footer class="tweet-footer active">
            <div>${daysPassed} days ago</div>
            <div>
              <i class="fa fa-flag" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
            </div>
          </footer>
        </article>
        `;
    return $tweet;
  }

  function renderTweets(tweets) {
    $("#tweets-container").empty(); // Empty the section before loading all the tweets, as a reset
    
    for (let tweetsData of tweets) {
      const $tweet = createTweetElement(tweetsData);
      $("#tweets-container").append($tweet);
    }
  }

  function loadTweets() {
    $.ajax("/tweets", { type: "GET" })
      .then(data => {
        renderTweets(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadTweets(); // load tweets upon page load

  $(".new-tweet form").submit(function (event) {
    event.preventDefault();
    const $formData = $("#tweet-text").serialize();
    const $tweetText = $("#tweet-text").val();

    if ($tweetText.length >= 140) {
      alert("Cannot tweet more than 140 characters! Silly goose!");
    } else if ($tweetText !== "") {
      $.ajax("/tweets", {
        type: "POST",
        data: $formData,
      })
        .then(() => {
          $("#tweet-text").val(""); // empty the tweet form box upon completion
          loadTweets(); // load tweets without having to refresh page
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("Cannot submit an empty tweet! Silly goose!");
    }
  });

  // renderTweets(data);
});
