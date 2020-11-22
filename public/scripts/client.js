/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  // Load tweets upon page load
  loadTweets();

  // Toggle Tweet Box
  $(".new-tweet").hide();
  $("#tweet-arrow").click(() => {
    $(".new-tweet").slideToggle("slow");
    $("#tweet-text").focus();
  });

  function timeCreatedAt(tweetTime) {
    let timeStamp = Date.now() - tweetTime;
    const date = {
      millisecond: 1000,
      second: 60,
      minute: 60,
      hour: 24,
    };

    for (let key in date) {
      if (timeStamp / date[key] < 1) {
        return timeStamp === 1 ? `${timeStamp} ${key} ago` : `${timeStamp} ${key}s ago`;
      }
      timeStamp = Math.floor(timeStamp / date[key]);
    }
    return timeStamp === 1 ? `${timeStamp} day ago` : `${timeStamp} days ago`;
  }

  // Protect against code injection
  function escape(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweetData) {
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
            <div class="tweet-body active">${escape(tweetData.content.text)}</div>
          </div>
          <footer class="tweet-footer active">
            <div>${timeCreatedAt(tweetData.created_at)}</div>
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
    // Empty the section before loading all the tweets, as a reset
    $("#tweets-container").empty();
    for (let tweetsData of tweets) {
      const $tweet = createTweetElement(tweetsData);
      // Load newest tweets first
      $("#tweets-container").prepend($tweet);
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
  // Tweet Form Logic & Error handling
  $(".new-tweet form").submit(event => {
    event.preventDefault();
    const $formData = $("#tweet-text").serialize();
    const $tweetText = $("#tweet-text").val();

    if ($tweetText.length > 140) {
      $(".error-line").slideDown().removeAttr("open");
      $(".error-line span").text("Cannot tweet more than 140 characters! Silly goose!");
    } else if ($tweetText !== "") {
      $.ajax("/tweets", {
        type: "POST",
        data: $formData,
      })
        .then(() => {
          $("#tweet-text").val(""); // empty the tweet form box upon completion
          $("output").val(140); // reset count back to 140
          $("#tweet-text").focus(); // refocus on text area
          loadTweets(); // load tweets without having to refresh page
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      $(".error-line").slideDown().removeAttr("open");
      $(".error-line span").text("Cannot send an empty tweet, Silly goose!");
    }
  });
});
