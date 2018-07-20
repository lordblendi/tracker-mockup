setupFieldActions();

function setupFieldActions(){
  $('.toolbox-field').each(function() {
    var field = $(this);
    var label = $(this).find('.toolbox-field__label');
    var input = $(this).find('.toolbox-field__input');

    if (input.val()) {
      field.addClass('toolbox-field--not-empty');
    }

    input.on('focus', function() {
      field.addClass('toolbox-field--focus');
      openOverlay(true, false, false);
    });

    input.on('focusout', function() {
      field.removeClass('toolbox-field--focus');
      closeOverlay();

      if (input.val()) {
        field.addClass('toolbox-field--not-empty');
      }
      else {
        field.removeClass('toolbox-field--not-empty');
      }
    });
  });

  $('.header__inputTitle').on('focus', function() {
    $(this).addClass("header__inputTitle--focused");
    openOverlay(true, false, false);
    $(this).select();

  });
  $('.header__inputTitle').on('focusout', function() {
    $(this).removeClass("header__inputTitle--focused");
    closeOverlay();
  });

  // for inputs outside of fields show toolbox-overlay--text on focus
  $('.toolbox-field__input').on('focus', function() {
    openOverlay(true, false, false);
  }).on('focusout', function() {
    closeOverlay();
  });
}



/*

// error field, by default don't show errors
$('.JS_field--error').each(function(){
  const errorField = $(this);
  errorField.find('.JS_has-popup').removeClass('JS_has-popup--error');
});

*/
