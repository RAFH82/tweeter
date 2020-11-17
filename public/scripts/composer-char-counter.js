$(document).ready(function () {
  const $textArea = $("textarea");
  $textArea.on("keyup", function () {
    const $output = $("output");
    const count = 140;
    $output.val(count - $textArea.val().length);
    if (count - $textArea.val().length < 0) {
      $output.addClass("counterFull");
    } else {
      $output.removeClass("counterFull");
    }
  });
});
