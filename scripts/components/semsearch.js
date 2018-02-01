$(document).ready(function() {

  $('[data-action="open-semsearch"]').on('mouseover', function() {
    $(this).addClass('shown');
    $('[data-popup="semsearch"]').addClass('multiSelector--visible');
  });

  $('[data-popup="semsearch"]').on('mouseout', function() {
    $('[data-action="open-semsearch"]').removeClass('shown');
    $(this).removeClass('multiSelector--visible');
  });

});
