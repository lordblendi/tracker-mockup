$(document).ready(function() {
  var $app = $('.app');

  // app-navigator toggle action
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

  // user-menu toggle action
  $('.JS_toggle-user-menu').on('click', function() {
    $app.addClass('user-menu--visible');
    $('body').addClass('fixed');
  });

  // semsearch hover over action
  $('.JS_toggle-semsearch-1').on('mouseover', function() {
    $('.JS_semsearch-1').addClass('multiSelector--visible');
  });

  // semsearch hover out action
  $('.JS_semsearch-1').on('mouseout', function() {
    $(this).removeClass('multiSelector--visible');
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

  // Toggle COMMENTS-ATTACHMENTS-HISTORY
  $('.JS_toggle-comments').on('click', function() {
    $app.toggleClass('item-comments--visible');
  });

  // Toggle INFO
  $('.JS_toggle-progress').on('click', function() {
    $app.toggleClass('item-progress--visible');
  });
});
