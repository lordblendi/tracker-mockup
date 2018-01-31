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
    $(".sticky__mobile__document__header, .sticky__mobile__comment__header").sticky({
      zIndex: 10
    });

  });
});
