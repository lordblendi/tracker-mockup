var resizeTimer;
var extraRightTabsPadding = 10;
$(function() {
  // setup tabs for every tabs
  if ($(".toolbox-tabs-nav").length > 0) {
    setupTabs(".toolbox-tabs-nav");
  }


});

// setting up tabs
function setupTabs(tabsSelector) {
  const tab_nav = $(tabsSelector);

  const less = tab_nav.find('.toolbox-tabs-nav__slide--left');
  const more = tab_nav.find('.toolbox-tabs-nav__slide--right');

  const lessShadow = less.find('.toolbox-tabs-nav__slideShadow');
  const lessArrow = less.find('.toolbox-tabs-nav__slideArrow');

  const moreShadow = more.find('.toolbox-tabs-nav__slideShadow');
  const moreArrow = more.find('.toolbox-tabs-nav__slideArrow');

  const ul = tab_nav.find('ul');

  // INIT
  // don't show less
  $(less).addClass('toolbox-tabs-nav__slide--hidden');
  //  if there is enough place, don't show more
  if (isThereEnoughPlace()) {
    $(more).addClass('toolbox-tabs-nav__slide--hidden');
  }
  // calculations on RESIZE
  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {

      let duration = calculateDuration(ul);
      let max_width = parseInt(tab_nav.css('width'));
      let tablist = $(ul)[0];
      let translateText = "";
      if (tablist !== undefined && tablist != null) {
        translateText = tablist.style.transform;
      }
      let scrollWidth = (calculateListSize() - max_width) * -1;

      if (isThereEnoughPlace()) {
        // scroll to beginning, because we have enough space
        //  and hide less and more
        less.addClass('toolbox-tabs-nav__slide--hidden');
        more.addClass('toolbox-tabs-nav__slide--hidden');
        // if we would do it in the .then, they would fire later
        scrollList(ul, 0, 1000, function() {

        }, 'linear')
      } else {
        //  scroll to the end if not everything is visiable
        //  if there is translate text we calculate it
        if (translateText !== "" && translateText !== undefined && translateText != null) {
          let currentTranslate = parseFloat(translateText.substring(translateText.lastIndexOf("(") + 1, translateText.indexOf("px")))

          // if it's zero, just show the more shadow
          if (currentTranslate == 0) {
            more.removeClass('toolbox-tabs-nav__slide--hidden');
          }

          // if it's less than the current scrolling
          // so even after resizing there would be hidden things on the left
          // we move the whole thing to the right
          if (scrollWidth >= currentTranslate) {
            scrollList(ul, scrollWidth, 1000, function() {
              more.addClass('toolbox-tabs-nav__slide--hidden');
            }, 'linear');
          } else {
            more.removeClass('toolbox-tabs-nav__slide--hidden');
          }
        } else {
          // if there is not translate text, just show the more shadow
          more.removeClass('toolbox-tabs-nav__slide--hidden');
        }
      }
    }, 250);
  })

  // SCROLL
  // scroll right
  $(more).hover(function() {
    //  only when it's not hidden
    if (!$(this).hasClass('toolbox-tabs-nav__slide--hidden')) {
      // calculate scrollWidth and duration

      // -10 is to have some padding after the last item
      let max_width = parseInt(tab_nav.css('width')) - extraRightTabsPadding;
      let scrollWidth = (calculateListSize() - max_width) * -1;
      let duration = calculateDuration(ul);

      less.removeClass('stop');
      more.removeClass('stop');
      less.removeClass('toolbox-tabs-nav__slide--hidden');

      scrollList(ul, scrollWidth, duration, function() {
        setTimeout(() => {
          if (!more.hasClass('stop')) {
            more.addClass('toolbox-tabs-nav__slide--hidden');
            more.removeClass('stop');
          }
        }, 250);
      }, 'easeInOutSine');
    }

  }, function() {
    $(more).addClass('stop');
    $(ul).velocity("stop");

  });
  // scroll left
  $(less).hover(function() {
    //  only when it's not hidden
    if (!$(this).hasClass('toolbox-tabs-nav__slide--hidden')) {
      let duration = calculateDuration(ul);

      less.removeClass('stop');
      more.removeClass('stop');
      more.removeClass('toolbox-tabs-nav__slide--hidden');

      scrollList(ul, 0, duration, function() {
        setTimeout(() => {
          if (!(less.hasClass('stop'))) {
            less.addClass('toolbox-tabs-nav__slide--hidden');
            less.removeClass('stop');
          }
        }, 250);
      }, 'easeInOutSine');
    }

  }, function() {
    $(less).addClass('stop');
    $(ul).velocity("stop");
  });

  // SCROLL HELPERS
  // calculate size of list
  function calculateListSize() {
    let listItems = Array.from(ul[0].children);
    let listWidth = listItems.map(function(item) {
      if (item.nodeName.toLocaleLowerCase() == 'li') {
        // return parseInt(item.scrollWidth) + parseInt($(item).css('margin-left')) + parseInt($(item).css('margin-right'));
        return parseInt($(item).outerWidth(true));
      }
      return 0;
    });
    return listWidth.reduce(function(a, b) {
      return a + b
    });
  }
  // check if the list is longer than the provided space
  function isThereEnoughPlace() {
    let tabWidth = parseInt(tab_nav.css('width'));
    let listItems = Array.from(ul[0].children);
    let listWidth = calculateListSize();
    // we don't need the first margin-left and last margin-right
    listWidth -= 5;
    return listWidth < tabWidth;
  }

  // ARROW ACTIONS

  // setup arrow actions
  $(moreArrow).hover(function() {
    $(more).addClass('stop');
    $(ul).velocity("stop");
  });
  $(lessArrow).hover(function() {
    $(less).addClass('stop');
    $(ul).velocity("stop");
  });

  $(moreArrow).click(function() {
    $(more).addClass('stop');
    $(ul).velocity("stop");

    const distance = calculateArrowJump(true) * -1;
    const max_width = parseInt(tab_nav.css('width'));
    const max = (calculateListSize() - max_width + extraRightTabsPadding) * -1;
    $(more).removeClass('stop');

    scrollList(ul, distance, 500, function() {
      if (distance === max) {
        if (!more.hasClass('stop')) {
          more.addClass('toolbox-tabs-nav__slide--hidden');
          more.removeClass('stop');
        }
      }
    }, 'easeInOutSine');

  });
  $(lessArrow).click(function() {
    $(less).addClass('stop');
    $(ul).velocity("stop");

    const distance = calculateArrowJump(false) * -1;
    $(less).removeClass('stop');
    scrollList(ul, distance, 500, function() {
      if (distance === 0) {
        if (!less.hasClass('stop')) {
          less.addClass('toolbox-tabs-nav__slide--hidden');
          less.removeClass('stop');
        }
      }
    }, 'easeInOutSine');
  });

  function calculateArrowJump(right) {
    // calculate where are we now
    let translateText = "";
    let currentTranslate = 0;
    const ulElement = ul[0];
    // if existing item, get translate text
    if (ulElement !== undefined && ulElement != null) {
      translateText = ulElement.style.transform;

      // if existing translateText, get value
      if (translateText !== "" && translateText !== undefined && translateText != null) {
        currentTranslate = parseFloat(translateText.substring(translateText.lastIndexOf("(") + 1, translateText.indexOf("px")));
      }

      // let's calculate with positive numbers
      if (currentTranslate < 0) {
        currentTranslate *= -1;
      }
    }

    const scrollableElements = $(ulElement).find('li');

    let currentScroll = 0;
    let newScroll = 0;
    // calculate next distance depending on the direction
    $.each(scrollableElements, function(index, item) {
      let possibleNextOne = currentScroll + parseInt($(item).outerWidth(true));
      if (right === true) {
        // if the next one would be bigger, we need that column
        if (possibleNextOne > currentTranslate) {
          newScroll = possibleNextOne;
          return false;
        }
      } else {
        // if the next one is bigger/same as current, we need a previous column
        if (possibleNextOne >= currentTranslate) {
          newScroll = currentScroll;
          return false;
        }
      }
      currentScroll = possibleNextOne;
    });

    // if we are going to the right
    if (right === true) {
      const max_width = parseInt(tab_nav.css('width')) ;
      const max = (calculateListSize() - max_width);
      if (newScroll < max) {
        return newScroll;
      }
      return max + extraRightTabsPadding;
    }
    // if we are going to the left
    else {
      if (newScroll > 0) {
        return newScroll;
      }
    }
    return 0;
  }

  setupTabsLinkOnclick();

};

// function to animate scrolling through the list
function scrollList(item, translate, duration, callback, easing) {
  let options = {};
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
  let duration = 425;
  let numberOfChildren = 1;
  if (tablist.length > 0) {
    let listItems = Array.from(tablist[0].children);
    numberOfChildren = listItems.length;
  }

  return numberOfChildren * 425;
}

function setupTabsLinkOnclick(){
    setTimeout(function(){
      // for every tabnav set the position of the line
      $('.toolbox-tabs-nav').each(function() {
        let activeLink = $(this).find('.toolbox-tabs-nav__link--active');
        if (activeLink.length > 0) {
          let barWidth = activeLink.width();
          let barLeft = $(activeLink).position().left;
          $(this).find('.toolbox-tabs-nav__linkBar').css({
            'left': barLeft + 'px',
            'width': barWidth + 'px'
          });
        }
      });
    }, 400);

    // click tab link
    $('.toolbox-tabs-nav__link').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      // getting .tabs
      let tabs = $(this).closest('.toolbox-tabs');
      let _tabindex = $(this).attr('tabindex');

      // Change panel
      tabs.find('.toolbox-tabs-panels__panel').hide().removeClass('toolbox-tabs-panels__panel--active');
      tabs.find('.toolbox-tabs-panels__panel[tabindex="' + _tabindex + '"]').fadeIn().addClass('toolbox-tabs-panels__panel--active');

      tabs.find('.toolbox-tabs-nav__link').removeClass('toolbox-tabs-nav__link--active');
      $(this).addClass('toolbox-tabs-nav__link--active');
    });

    // new position for bar if clicking on link
    $('.toolbox-tabs-nav__link').on('click', function(e) {
      let bar = $(this).closest('.toolbox-tabs-nav').find('.toolbox-tabs-nav__linkBar');
      let barWidth = $(this).outerWidth(true);
      let barLeft = $(this).closest('li').position().left;

      // Slide bar
      bar.css({
        'left': barLeft + 10 + 'px',
        'width': barWidth + 'px'
      });
    });
}
