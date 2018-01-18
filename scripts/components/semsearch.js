$(document).ready(function() {

  $('[data-action="open-semsearch"]').on('mouseover', function() {
    var $top = Math.round($(this).offset().top);
    var $left = Math.round($(this).offset().left);

    if ( $left > ($(window).width() / 2) ) {
      $('[data-popup="semsearch"]').css({
        'top': $top + 'px'
      });
    }
    else {
      $('[data-popup="semsearch"]').css({
        'top': $top + 'px'
      });
    }

    $('[data-popup="semsearch"]').addClass('multiSelector--visible');
  });

});
