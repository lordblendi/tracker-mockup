$(document).ready(function() {

  $('[data-action="open-semsearch"]').on('mouseover', function() {
    $('[data-popup="semsearch"]').addClass('multiSelector--visible');
  });

  $('[data-popup="semsearch"]').on('mouseout', function() {
    $(this).removeClass('multiSelector--visible');
  });

});
