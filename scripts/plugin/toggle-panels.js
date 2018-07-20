$(document).ready(function() {
  var $body = $('body');

  // app-navigator toggle action
  $('.JS_toggle-app-navigator').on('click', function() {
    // making sure, that the line is positioned
    $('.app-navigator__nav .toolbox-tabs-nav').each(function() {
      var activeLink = $(this).find('.toolbox-tabs-nav__link--active');
      var li = $(activeLink).closest('li');
      var barWidth = activeLink.width();
      var barLeft = $(activeLink).position().left + $(li).position().left;

      $(this).find('.toolbox-tabs-nav__linkBar').css({
        'left': barLeft + 'px',
        'width': barWidth + 'px'
      });
    });

    $body.addClass('app-navigator--visible');
    openOverlay(false, false, false);
    $('body').addClass('fixed');
  });

  // user-menu toggle action
  $('.JS_toggle-user-menu').on('click', function() {
    $body.addClass('user-menu--visible');
    openOverlay(false, false, false);
    $('body').addClass('fixed');
  });

  // applicable-sliders click actions
  $('.appl-slider__headerToggle').on('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('appl-slider__headerToggle--active')) {
      $(this).removeClass('appl-slider__headerToggle--active');
      $(this).closest('.appl-slider').find('.appl-slider__body').slideUp();
    } else {
      $(this).addClass('appl-slider__headerToggle--active');
      $(this).closest('.appl-slider').find('.appl-slider__body').slideDown();
    }
  });

  // app overlay click action
  // to remove app-navigator or user-menu
  // and make the body scrollable again
  $('.toolbox-overlay').on('click', function() {
    if ($body.hasClass('app-navigator--visible')) {
      $body.removeClass('app-navigator--visible');
      closeOverlay();
      $('body').removeClass('fixed');
    }

    if ($body.hasClass('user-menu--visible')) {
      $body.removeClass('user-menu--visible');
      closeOverlay();
      $('body').removeClass('fixed');
    }

    if ($body.hasClass('assistance--visible')) {
      $body.removeClass('assistance--visible');
      $('.assistance').removeClass('visible');
    }

    if ($body.hasClass('overlay--visible')) {
      $body.removeClass('overlay--visible');

      $('.breadcrumbs__item').removeClass('breadcrumbs__item--active');
    }
  });

  // Panel toggles
  $('.JS_panels-state-1').on('click', function() {
    $body.removeClass('panels-state-1 panels-state-2 panels-state-3');
    $body.addClass('panels-state-1');

    const panelname = $(this).attr("panel-name");
    const panel = $body.find(`.JS-old-panel[panel-name='${panelname}']`);
    if(panel.length > 0) {
      $body.find('.JS-old-panel').css('display', 'none');
      panel.css('display', 'block');
    }
  });
  $('.JS_panels-state-2').on('click', function() {
    $body.removeClass('panels-state-1 panels-state-2 panels-state-3');
    $body.addClass('panels-state-2');

    const panelname = $(this).attr("panel-name");
    const panel = $body.find(`.JS-old-panel[panel-name='${panelname}']`);
    if(panel.length > 0) {
      $body.find('.JS-old-panel').css('display', 'none');
      panel.css('display', 'block');
    }
  });
  $('.JS_panels-state-3').on('click', function() {
    $body.removeClass('panels-state-1 panels-state-2 panels-state-3');
    $body.addClass('panels-state-3');
  });
});
