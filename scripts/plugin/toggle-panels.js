$(document).ready(function() {
  var $app = $('body');

  // app-navigator toggle action
  $('.JS_toggle-app-navigator').on('click', function() {
    // making sure, that the line is positioned
    $('.app-navigator__nav .tabs-nav').each(function() {
      var activeLink = $(this).find('.tabs-nav__link--active');
      var li = $(activeLink).closest('li');
      var barWidth = activeLink.width();
      var barLeft = $(activeLink).position().left + $(li).position().left;

      $(this).find('.tabs-nav__linkBar').css({
        'left': barLeft + 'px',
        'width': barWidth + 'px'
      });
    });

    $app.addClass('app-navigator--visible');
    $('body').addClass('fixed');
  });

  // user-menu toggle action
  $('.JS_toggle-user-menu').on('click', function() {
    $app.addClass('user-menu--visible');
    $('body').addClass('fixed');
  });

  // applicable-sliders click actions
  $('.appl-slider__headerToggle').on('click', function(e) {
    e.preventDefault();

    if ($(this).hasClass('appl-slider__headerToggle--active')) {
      $(this).removeClass('appl-slider__headerToggle--active');
      $(this).parent().parent().find('.appl-slider__body').slideUp();
    } else {
      $(this).addClass('appl-slider__headerToggle--active');
      $(this).parent().parent().find('.appl-slider__body').slideDown();
    }
  });

  // app overlay click action
  // to remove app-navigator or user-menu
  // and make the body scrollable again
  $('.app__overlay').on('click', function() {
    if ($app.hasClass('app-navigator--visible')) {
      $app.removeClass('app-navigator--visible');
      $('body').removeClass('fixed');
    }

    if ($app.hasClass('user-menu--visible')) {
      $app.removeClass('user-menu--visible');
      $('body').removeClass('fixed');
    }

    if ($app.hasClass('assistance--visible')) {
      $app.removeClass('assistance--visible');
      $('.assistance').removeClass('visible');
    }

    if ($app.hasClass('overlay--visible')) {
      $app.removeClass('overlay--visible');

      $('.breadcrumbs__item').removeClass('breadcrumbs__item--active');
    }
  });

  // Panel toggles
  $('.JS_panels-state-1').on('click', function() {
    $app.removeClass('panels-state-1 panels-state-2 panels-state-3');
    $app.addClass('panels-state-1');
  });
  $('.JS_panels-state-2').on('click', function() {
    $app.removeClass('panels-state-1 panels-state-2 panels-state-3');
    $app.addClass('panels-state-2');
  });
  $('.JS_panels-state-3').on('click', function() {
    $app.removeClass('panels-state-1 panels-state-2 panels-state-3');
    $app.addClass('panels-state-3');
  });
});
