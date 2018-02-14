$(document).ready(function() {
  var $app = $('.app');

  // app-navigator
  $('.JS_toggle-app-navigator').on('click', function() {
    $app.addClass('app-navigator--visible');
    $('body').addClass('fixed');
  });

  // user-menu
  $('.JS_toggle-user-menu').on('click', function() {
    $app.addClass('user-menu--visible');
    $('body').addClass('fixed');
  });


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


  // Toggle COMMENTS-ATTACHMENTS-HISTORY
  $('.media--toggle').on('click', function() {
    $app.toggleClass('document__comments--visible');
  });

  // Toggle INFO
  $('.process--toggle').on('click', function() {
    $app.toggleClass('document__info--visible');
  });

  $('.document__comments .add-comment .add-comment__input').focus(function() {
    $app.addClass('add-comment--visible');
  });

  $('.document__comments .add-comment .add-comment__input').blur(function() {
    $app.removeClass('add-comment--visible');
  });

  // Sliders
  $('.sliders .slider .slider__header .toggle').on('click', function(e) {
    e.preventDefault();

    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).parent().parent().find('.slider__body').slideUp();
    } else {
      $(this).addClass('active');
      $(this).parent().parent().find('.slider__body').slideDown();
    }
  });

});
