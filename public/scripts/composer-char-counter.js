$(document).ready(function () {
  const $textArea = $("textarea");
  const $output = $("output");
  const count = 140;

  $textArea.on("input", function () {
    $(".error-line").slideUp();
    $output.val(count - $textArea.val().length);
    if (count - $textArea.val().length < 0) {
      $output.addClass("counterFull");
    } else {
      $output.removeClass("counterFull");
    }
  });
});
