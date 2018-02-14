$(document).ready(function() {
  var $app = $('.app');

  // Toggle NAVIGATION
  $('[data-action="open-left-panel"]').click(function() {
    $app.addClass('app__nav--visible');
    $('body').addClass('fixed');
  });
  $('[data-action="open-right-panel"]').on('click', function() {
    $app.addClass('user-menu--visible');
    $('body').addClass('fixed');
  });

});
