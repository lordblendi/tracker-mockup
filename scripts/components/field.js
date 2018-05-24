
$('.field').each(function() {
  var field = $(this);
  var label = $(this).find('.field__label');
  var input = $(this).find('.field__input');

  if (input.val()) {
    field.addClass('field--not-empty');
  }

  input.on('focus', function() {
    field.addClass('field--focus');
    $('.overlay-body').addClass('pointer-events-auto opacity-100');
  });

  input.on('focusout', function() {
    field.removeClass('field--focus');
    $('.overlay-body').removeClass('pointer-events-auto opacity-100');

    if (input.val()) {
      field.addClass('field--not-empty');
    }
    else {
      field.removeClass('field--not-empty');
    }
  });
});


/*

// error field, by default don't show errors
$('.JS_field--error').each(function(){
  const errorField = $(this);
  errorField.find('.JS_has-popup').removeClass('JS_has-popup--error');
});

*/
