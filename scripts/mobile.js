$(function() {
  $(document).ready(function() {
    // PANEL TOGGLE
    $('.pmx-selector__value--comments, .pmx-selector__value--timeline').click(function(){
      const button = $(this);
      const timeline = button.hasClass('pmx-selector__value--timeline');
      const comments = button.hasClass('pmx-selector__value--comments');
      const selected = button.hasClass('pmx-selector__value--selected');

      const mobileContainer = $('main.mobile__container');

      if(comments) {
        if(selected) {
          mobileContainer.addClass("mobile_panel--left");
        }
        else {
          mobileContainer.removeClass("mobile_panel--left");
        }
        mobileContainer.removeClass("mobile_panel--right");
      }
      else if (timeline) {
        if(selected) {
          mobileContainer.addClass("mobile_panel--right");
        }
        else {
          mobileContainer.removeClass("mobile_panel--right");
        }
        mobileContainer.removeClass("mobile_panel--left");
      }

      // as the sticky header doesn't resize itself
      // I have to update it manually
      const newWidth = $('.mobile__document .panel__center .document__data').outerWidth(true);
      $('.sticky__mobile__document__header').css('width', newWidth);

    });

    //  SLIDERS
    $('.sliders .slider .slider__header .toggle').click(function(e) {
      e.preventDefault();

      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().parent().find('.slider__body').slideUp();
      } else {
        $(this).addClass('active');
        $(this).parent().parent().find('.slider__body').slideDown();
      }
    });

    // STICKY


    $(".sticky__mobile__app__header").sticky({
      zIndex: 10
    });

    $(".sticky__mobile__document__header, .sticky__mobile__comment__header").sticky({
      zIndex: 10,
      topSpacing: $('.sticky__mobile__app__header').outerHeight(true)
    });

  });
});
