/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac",
      },
      "content": {
        "text":
          "If I have seen further it is by standing on the shoulders of giants",
      },
      "created_at": 1461116232227,
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd",
      },
      "content": {
        "text": "Je pense , donc je suis",
      },
      "created_at": 1461113959088,
    },
  ];

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
            <div class="tweet-body active">${tweetData.content.text}</div>
          </div>
          <footer class="tweet-footer active">
            <div>${tweetData.created_at}</div>
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
    for (let tweetsData of tweets) {
      const $tweet = createTweetElement(tweetsData);
      $("#tweets-container").append($tweet);
    }
  }

  renderTweets(data);
  // const $tweet = createTweetElement(tweetData);

  // $("#tweets-container").append($tweet);
});
