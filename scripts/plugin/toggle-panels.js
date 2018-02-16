$(document).ready(function() {
  var $app = $('.app');

  // app-navigator
  $('.JS_toggle-app-navigator').on('click', function() {
    // making sure, that the line is positioned
    $('.app-navigator__nav .tabs-nav').each(function() {
      var activeLink = $(this).find('.tabs-nav__link--active');

      var barWidth = activeLink.width();
      var barLeft = $(activeLink).position().left;

      $(this).find('.tabs-nav__linkBar').css({
        'left': barLeft + 'px',
        'width': barWidth + 'px'
      });

    });

    $app.addClass('app-navigator--visible');
    $('body').addClass('fixed');
  });

  // user-menu
  $('.JS_toggle-user-menu').on('click', function() {
    $app.addClass('user-menu--visible');
    $('body').addClass('fixed');
  });

  // semsearch
  $('.JS_toggle-semsearch-1').on('mouseover', function() {
    $(this).addClass('app-header-inner__item--active');
    $('.JS_semsearch-1').addClass('multiSelector--visible');
  });

  $('.JS_semsearch-1').on('mouseout', function() {
    $('.JS_toggle-semsearch-1').removeClass('app-header-inner__item--active');
    $(this).removeClass('multiSelector--visible');
  });

  // applicable-sliders
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



});
