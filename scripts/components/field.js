
$('.field').each(function() {
  var label = $(this).find('.field__label');
  var input = $(this).find('.field__input');
  console.log($(this).find('.selector').length);

  if ( (input.val().length > 0) || ($(this).find('.selector').length > 0) ) {
    $(this).removeClass('field--empty');
  }
  else {
    $(this).addClass('field--empty');
  }
});

$('.field__input').on('focus', function() {
  $('overlay-body').addClass('pointer-events-auto opacity-100');
  $(this).parent().parent().addClass('field--focus');
});

$('.field__input').on('focusout', function() {
  $('overlay-body').removeClass('pointer-events-auto opacity-100');
  $(this).parent().parent().removeClass('field--focus');
});

/*

// error field, by default don't show errors
$('.JS_field--error').each(function(){
  const errorField = $(this);
  errorField.find('.JS_has-popup').removeClass('JS_has-popup--error');
});

*/
