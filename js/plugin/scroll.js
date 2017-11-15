$(function() {
  $(document).ready(function() {

    $('table').stickyTableHeaders({fixedOffset: $(".sticky__header__wrapper").outerHeight() + $(".sticky__document__header").outerHeight()});

    $(".sticky__header__wrapper").sticky({
      zIndex: 10
    });

    $(".sticky__document__header").sticky({
      zIndex: 10,
      topSpacing: $(".sticky__header__wrapper").outerHeight(),
      className: 'is-sticky-docheader'
    });

    $('.document__comments .tabs').scroll(function(){
      var tabs = $('.document__comments .tabs');
      if (tabs.scrollTop() > 0) {
        $('.document__comments').addClass('scrolled');
      }
      else {
        $('.document__comments').removeClass('scrolled');
      }
    });

  });
});
