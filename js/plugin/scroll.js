$(function() {
  $(document).ready(function() {
    $(".sticky__header__wrapper").sticky({
      zIndex: 10
    });

    $(".sticky__document__header").sticky({
      zIndex: 10,
      topSpacing: $(".sticky__header__wrapper").height() + 10
    });
  });
});
