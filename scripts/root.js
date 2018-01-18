$(document).ready(function() {
  var $app = $('.app');

  $('.app__overlay').click(function() {
    if ($app.hasClass('app__nav--visible')) {
      $app.removeClass('app__nav--visible');
      $('body').removeClass('fixed');
    }
    if ($app.hasClass('notifications--visible')) {
      $app.removeClass('notifications--visible');
      $('body').removeClass('fixed');
    }
    if ($app.hasClass('assistance--visible')) {
      $app.removeClass('assistance--visible');
      $('.assistance').removeClass('visible');
    }

    if ($app.hasClass('overlay--visible')) {
      $app.removeClass('overlay--visible');

      $('.breadcrumbs__item').removeClass('breadcrumbs__item--active');
    }
  });







  $('.app__nav__wrapper').click(function(e) {
    var pWidth = $(this).innerWidth(); //use .outerWidth() if you want borders
    var pOffset = $(this).offset();
    var x = e.pageX - pOffset.left;

    if (pWidth / 2 < x) {
      if ($app.hasClass('app__nav--visible')) {
        $app.removeClass('app__nav--visible');
        $('body').removeClass('fixed');
      }
    }


  });

  // Toggle COMMENTS-ATTACHMENTS-HISTORY
  $('.media--toggle').click(function() {
    if ($app.hasClass('document__comments--visible') === false) {
      setCommentHeight();
    }
    $app.toggleClass('document__comments--visible');

  });




  // Toggle INFO
  $('.process--toggle').click(function() {
    $app.toggleClass('document__info--visible');
  });



  $('.document__comments .add-comment .add-comment__input').focus(function() {
    $app.addClass('add-comment--visible');
  });

  $('.document__comments .add-comment .add-comment__input').blur(function() {
    $app.removeClass('add-comment--visible');
  });



  // Sliders
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

  /// TO CHECK
  // assistance
  $('.assistance--toggle').click(function() {
    $app.addClass('assistance--visible');

    $('.assistance').addClass('visible');
  });


  // change top of comment on body scroll

  $(window).scroll(function() {
    setCommentHeight();
  });

}); // END


function setCommentHeight() {
  const appHeaderHeight = $('.app__header').outerHeight();
  const docHeaderHeight = $('.sticky__header__wrapper').outerHeight();
  const currentScroll = $(window).scrollTop();

  const minimumDiff = docHeaderHeight + 1;
  const currentState = appHeaderHeight - currentScroll;
  if (currentState > 0) {
    $('.document__comments').css('top', currentState + minimumDiff + 'px');
  } else {

    $('.document__comments').css('top', minimumDiff + 'px');
  }
};


/* Change doc types */
/*
(function(f){
  var doctypes = ['story', 'bug', 'meeting'];
  var i = 0;
  var int = window.setInterval(function(){
    updateBadge(i++);

    if(i === 3) {
      i = 0;
    }
  }, 5000);

  var badgeNum;

  function updateBadge(alertNum) {
    $('.app__document').removeClass('app__document--story');
    $('.app__document').removeClass('app__document--bug');
    $('.app__document').removeClass('app__document--meeting');

    $('.app__document').addClass('app__document--' + doctypes[alertNum]);
    $('.app__document .document__visual-identifier span').html('' + doctypes[alertNum])
  }
})(document);
*/
