$(function() {
  $(document).ready(function() {

    $('table').stickyTableHeaders({fixedOffset: $(".sticky__header__wrapper").height() + $(".sticky__header__wrapper").height()});

    $(".sticky__header__wrapper").sticky({
      zIndex: 10
    });

    $(".sticky__document__header").sticky({
      zIndex: 10,
      topSpacing: $(".sticky__header__wrapper").height()
    });
  });
});
