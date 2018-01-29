var resizeTimer;

$(function() {
  setup(".app__nav .tabs__nav");

  // init
  $('.tabs__nav').each(function() {
    var _parent = $(this).parent();
    var _activeLink = $(this).find('.active');
    var _tabindex = _activeLink.attr('tabindex');
    var barLeft = _activeLink.parent().position().left;
    var barWidth = _activeLink.parent().width();

    _parent.find('.tabs__panel').hide();
    _parent.find('.tabs__panel[tabindex="' + _tabindex + '"]').fadeIn().addClass('active');

    $(this).find('.tab__active-link-bar').css({
      'left': barLeft + 10 + 'px',
      'width': barWidth + 'px'
    });
  });

  // click tab link
  $('.tab__link').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var _parent = $(this).parent().parent().parent().parent();
    var _tabindex = $(this).attr('tabindex');
    var bar = _parent.find('.tab__active-link-bar');
    var barLeft = $(this).parent().position().left;
    var barWidth = $(this).parent().width();

    // Slide bar
    bar.css({
      'left': barLeft + 10 + 'px',
      'width': barWidth + 'px'
    });

    // Change panel
    _parent.find('.tabs__panel').hide().removeClass('active');
    _parent.find('.tabs__panel[tabindex="' + _tabindex + '"]').fadeIn().addClass('active');

    _parent.find('.tab__link').removeClass('active');
    $(this).addClass('active');
  });
});

function setup(tabsSelector){
  const tab_nav = $(tabsSelector);
  const more = tab_nav.find('.tab__more');
  const moreShadow = more.find('.tab__shadow');
  const moreArrow = more.find('.tab__arrow');
  const less = tab_nav.find('.tab__less');
  const lessShadow = less.find('.tab__shadow');
  const lessArrow = less.find('.tab__arrow');
  const ul = tab_nav.find('ul');

  $(moreArrow).hover(function(){
    $(more).addClass('stop');
    $(ul).velocity("stop");
  });
  $(lessArrow).hover(function(){
    $(less).addClass('stop');
    $(ul).velocity("stop");
  });

  // init setup
  // don't show less
  $(less).addClass('hide');

  //  if there is enough place, don't show more
  if (isThereEnoughPlace()) {
    $(more).addClass('hide');
  }

  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {

      var duration = calculateDuration(ul);
      var max_width = parseInt(tab_nav.css('width'));
      var tablist = $(ul)[0];
      var translateText = "";
      if (tablist !== undefined && tablist != null) {
        translateText = tablist.style.transform;
      }
      var scrollWidth = (calculateListSize() - max_width) * -1;

      if (isThereEnoughPlace()) {
        // scroll to beginning, because we have enough space
        //  and hide less and more
        less.addClass('hide');
        more.addClass('hide');
        // if we would do it in the .then, they would fire later
        scrollList(ul, 0, 1000, function() {

        }, 'linear')
      } else {
        //  scroll to the end if not everything is visiable
        //  if there is translate text we calculate it
        if (translateText !== "" && translateText !== undefined && translateText != null) {
          var currentTranslate = parseFloat(translateText.substring(translateText.lastIndexOf("(") + 1, translateText.indexOf("px")))

          // if it's zero, just show the more shadow
          if (currentTranslate == 0) {
            more.removeClass('hide');
          }

          // if it's less than the current scrolling
          // so even after resizing there would be hidden things on the left
          // we move the whole thing to the right
          if (scrollWidth >= currentTranslate) {
            scrollList(ul, scrollWidth, 1000, function() {
              more.addClass('hide');
            }, 'linear');
          } else {
            more.removeClass('hide');
          }
        } else {
          // if there is not translate text, just show the more shadow
          more.removeClass('hide');
        }
      }
    }, 250);
  })

  // scroll right
  $(more).hover(function() {
    //  only when it's not hidden
    if (!$(this).hasClass('hide')) {
      // var tab_nav = $(this).parent();
      // var less = tab_nav.find('.tab__less');
      // var more = tab_nav.find('.tab__more');
      // var ul = tab_nav.find('ul');
      // calculate scrollWidth and duration
      var max_width = parseInt(tab_nav.css('width'));
      var scrollWidth = (calculateListSize() - max_width) * -1;
      var duration = calculateDuration(ul);

      less.removeClass('stop');
      more.removeClass('stop');
      less.removeClass('hide');

      scrollList(ul, scrollWidth, duration, function() {
        if (!more.hasClass('stop')) {
          more.addClass('hide');
        }
        more.removeClass('stop');
      }, 'easeInOutSine');
    }

  }, function() {
    $(more).addClass('stop');
    $(ul).velocity("stop");

  });

  // scroll left
  $(less).hover(function() {
    //  only when it's not hidden
    if (!$(this).hasClass('hide')) {
      var duration = calculateDuration(ul);

      less.removeClass('stop');
      more.removeClass('stop');
      more.removeClass('hide');

      scrollList(ul, 0, duration, function() {
        if (!(less.hasClass('stop'))) {
          less.addClass('hide');
        }
        less.removeClass('stop');
      }, 'easeInOutSine');
    }

  }, function() {
    $(less).addClass('stop');
    $(ul).velocity("stop");
  });

  // calculate size of list
  function calculateListSize() {
    var listItems = Array.from(ul[0].children);
    var listWidth = listItems.map(function(item) {
      if (item.nodeName.toLocaleLowerCase() == 'li') {
        return parseInt(item.scrollWidth) + parseInt($(item).css('margin-left')) + parseInt($(item).css('margin-right'));
      }
      return 0;
    });
    return listWidth.reduce(function(a, b) {
      return a + b
    });
  }

  // check if the list is longer than the provided space
  function isThereEnoughPlace() {
    var tabWidth = parseInt(tab_nav.css('width'));
    var listItems = Array.from(ul[0].children);
    var listWidth = calculateListSize();
    // we don't need the first margin-left and last margin-right
    listWidth -= 5;
    return listWidth < tabWidth;
  }
};



// function to animate scrolling through the list
function scrollList(item, translate, duration, callback, easing) {
  var options = {};
  if (duration) {
    options.duration = duration;
  }
  if (easing) {
    options.easing = easing;
  }

  $.Velocity.animate($(item), {
    translateX: translate
  }, options).then(callback);
}



// calculate duration
function calculateDuration(tablist) {
  // have default values so we can return something when there are no children
  var duration = 425;
  var numberOfChildren = 1;
  if (tablist.length > 0) {
    var listItems = Array.from(tablist[0].children);
    numberOfChildren = listItems.length;
  }

  return numberOfChildren * 425;
}
