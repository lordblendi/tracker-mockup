$('.field input, .field textarea').on('change', function() {
  if ($(this).val() != '') {
    $(this).parent('.field').removeClass('field--empty');
  }
  else {
    $(this).parent('.field').addClass('field--empty');
  };
});

$('.field input').on('focus', function() {
  $(this).parent().addClass('field--focus');
});
$('.field input').on('blur', function() {
  $(this).parent().removeClass('field--focus');
});
