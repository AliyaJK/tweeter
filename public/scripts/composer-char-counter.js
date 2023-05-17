$(document).ready(function() {
  $("textarea").on("input", function() {
    let countChars = $(`#${this.id}`).val().length;
    const maxChars = 140;
    const counter = $(this).parents().find(".counter");
    
    let countDiff = maxChars - countChars;
    counter.val(countDiff);

    if (countDiff < 0) {
      counter.addClass("red-text");
    } else {
      counter.removeClass("red-text");
    }
  });
});