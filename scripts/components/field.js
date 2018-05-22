checkEmptyFields();

$('.JS_field').click(function() {
  $(this).addClass('field--focus');
  checkEmptyFields();
});

$('.overlay-body').on('click', function() {
  $('.field').removeClass('field--focus');
  checkEmptyFields();
});

function checkEmptyFields() {
  $('.JS_field .field__input').each(function() {
    var thisLabel = $(this).parent().parent().find('.field__label');

    if ($(this).val().length > 0 || $(this).parent().find('.selector').length > 0) {
      thisLabel.removeClass('field__label--placeholder');
    }
    else {
      thisLabel.addClass('field__label--placeholder');
    }
  });
}

// error field, by default don't show errors
$('.JS_field--error').each(function(){
  const errorField = $(this);
  errorField.find('.JS_has-popup').removeClass('JS_has-popup--error');
});
