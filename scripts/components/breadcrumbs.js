$(document).ready(function() {
  var $app = $('.app');

  $('.breadcrumbs__item').on('click', function() {
    $app.toggleClass('overlay--visible');

    $(this).toggleClass('breadcrumbs__item--active');
  });
});
