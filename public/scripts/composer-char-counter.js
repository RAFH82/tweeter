$(document).ready(function () {
  const $textArea = $("textarea");
  const $output = $("output");
  const count = 140;
  let $tweetLength;
  $textArea.on("input", function () {
    $tweetLength = count - $textArea.val().length;
    $(".error-line").slideUp();
    $output.val($tweetLength);
    if ($tweetLength < 0) {
      $output.addClass("counterFull");
    } else {
      $output.removeClass("counterFull");
    }
  });
});
