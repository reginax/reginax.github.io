/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for navbar
(function($) {

  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        breakpoint: 768,
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.find('li ul').parent().addClass('has-sub');
        if (settings.format != 'select') {
          cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) { 
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });

          multiTg = function() {
            cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
            cssmenu.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };

          if (settings.format === 'multitoggle') multiTg();
          else cssmenu.addClass('dropdown');
        }

        else if (settings.format === 'select')
        {
          cssmenu.append('<select style="width: 100%"/>').addClass('select-list');
          var selectList = cssmenu.find('select');
          selectList.append('<option>' + settings.title + '</option>', {
                                                         "selected": "selected",
                                                         "value": ""});
          cssmenu.find('a').each(function() {
            var element = $(this), indentation = "";
            for (i = 1; i < element.parents('ul').length; i++)
            {
              indentation += '-';
            }
            selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
          });
          selectList.on('change', function() {
            window.location = $(this).find("option:selected").val();
          });
        }

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($(window).width() > settings.breakpoint) {
            cssmenu.find('ul').show();
            cssmenu.removeClass('small-screen');
            if (settings.format === 'select') {
              cssmenu.find('select').hide();
            }
            else {
              cssmenu.find("#menu-button").removeClass("menu-opened");
            }
          }

          if ($(window).width() <= settings.breakpoint && !cssmenu.hasClass("small-screen")) {
            cssmenu.find('ul').hide().removeClass('open');
            cssmenu.addClass('small-screen');
            if (settings.format === 'select') {
              cssmenu.find('select').show();
            }
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
$(document).ready(function(){

$(window).load(function() {
  $("#cssmenu").menumaker({
    title: "Menu",
    format: "dropdown"
  });


$('#cssmenu').prepend("<div id='menu-indicator'></div>");

var foundActive = false, activeElement, indicatorPosition, indicator = $('#cssmenu #menu-indicator'), defaultPosition;

$("#cssmenu > ul > li").each(function() {
  if ($(this).hasClass('active')) {
    activeElement = $(this);
    foundActive = true;
  }
});

if (foundActive === false) {
  activeElement = $("#cssmenu > ul > li").first();
}

defaultPosition = indicatorPosition = activeElement.position().left + activeElement.width()/2 - 5;
console.log(activeElement);
console.log(activeElement.position().left);
console.log(activeElement.width());
indicator.css("left", indicatorPosition);

$("#cssmenu > ul > li").hover(function() {
  activeElement = $(this);
  indicatorPosition = activeElement.position().left + activeElement.width()/2 - 5;
  indicator.css("left", indicatorPosition);
}, 
function() {
  indicator.css("left", defaultPosition);
});

});

});
})(jQuery);


// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


// Modal

$(document).ready(function(){    
    var activeWindow;

$('a.modalLink').click(function(e){
    // cancel the default link behaviour
    e.preventDefault();
    // find the href of the link that was clicked to use as an id
    var id = $(this).attr('href');
    // assign the window with matching id to the activeWindow variable, move it to the center of the screen and fade in
    activeWindow = $('.window#' + id)
        .css('opacity', '0') // set to an initial 0 opacity
        .css('top', '50%') // position vertically at 50%
        .css('left', '50%') // position horizontally at 50%
        .fadeTo(500, 1); // fade to an opacity of 1 (100%) over 500 milliseconds

    // create blind and fade in
    $('#modal')
        .append('<div id="blind" />') // create a <div> with an id of 'blind'
        .find('#blind') // select the div we've just created
        .css('opacity', '0') // set the initial opacity to 0
        .fadeTo(500, 0.8) // fade in to an opacity of 0.8 (80%) over 500 milliseconds
        .click(function(e){
            closeModal(); // close modal if someone clicks anywhere on the blind (outside of the window)
        });
    });
    $('a.close').click(function(e){
            // cancel default behaviour
            e.preventDefault();
            // call the closeModal function passing this close button's window
            closeModal();
    });     

    function closeModal()
    {

        // fade out window and then move back to off screen when fade completes
        activeWindow.fadeOut(250, function(){ $(this).css('top', '-1000px').css('left', '-1000px'); });

        // fade out blind and then remove it
        $('#blind').fadeOut(250,    function(){ $(this).remove(); });
    }
});