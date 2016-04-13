jQuery(function($) {

  // Fixed nav
  $.fn.checkElementPositioning = function($el, $offsetHeightEl, scrollClass) {
    if(((this.offset().top - $(window).scrollTop()) <= $offsetHeightEl.outerHeight()) && !$el.hasClass(scrollClass)) {
      $el.addClass(scrollClass);
    } else if(((this.offset().top - $(window).scrollTop()) >= $offsetHeightEl.outerHeight()) && $el.hasClass(scrollClass)) {
      $el.removeClass(scrollClass);
    }
  }

  // Mobile sidebars
  $.fn.expandableSidebar = function(expandedClass) {
    var $me = this;

    $me.on('click', function() {
      if(!$me.hasClass(expandedClass)) {
        $me.addClass(expandedClass);
      } else {
        $me.removeClass(expandedClass);
      }
    });
  }

  var impactController = {
    init: function(opts) {
      var base = this;

      // Add classes to elements
      base._addClasses();
      base._attachEvents();
      
      setTimeout(function(){
        base._checkCartItems(); 
      }, 1000);
    },

    _addClasses: function() {
      var base = this;

      // Add placeholder text to inputs
      $('.wsite-form-sublabel').each(function(){
        var sublabel = $(this).text();
        $(this).prev('.wsite-form-input').attr('placeholder', sublabel);
      });

      // Add fullwidth class to gallery thumbs if less than 6
      $('.imageGallery').each(function(){
        if ($(this).children('div').length <= 6) {
          $(this).children('div').addClass('fullwidth-mobile');
        }
      });
    },

    _stickyFooter: function() {    
      var stickyFooterMargin = $('#footer-wrap').height();
      
      $('.wrapper').css('margin-bottom', -stickyFooterMargin);
      $('#footer-wrap, .sticky-footer-push').css('height', stickyFooterMargin);
    },

    _checkCartItems: function() {
      var base = this;
      
      if($('#wsite-mini-cart').find('li.wsite-product-item').length > 0) {
        $('body').addClass('cart-full');
      } else {
        $('body').removeClass('cart-full');
      }
    },

    _attachEvents: function() {
      var base = this;

        // Nav toggle
        $('label.hamburger').on('click', function() {
            if(!$('body').hasClass('nav-open')) {
                $('body').addClass('nav-open');
            } else {
                $('body').removeClass('nav-open');
            }
        });

      $(window).on('scroll', function(){

        // Affix nav
        if($('body.page-has-banner').length > 0) {
          $('.banner-wrap').checkElementPositioning($('body'), $('.menu-controls-wrap'), 'affix');
        } else {
          $('.main-wrap').checkElementPositioning($('body'), $('.menu-controls-wrap'), 'affix');
        }
      });

      // Store category dropdown
      $('.wsite-com-sidebar').expandableSidebar('sidebar-expanded');

      // Search filters dropdown
      $('#wsite-search-sidebar').expandableSidebar('sidebar-expanded');

      // Init fancybox swipe on mobile
      if('ontouchstart' in window) {
        $('body').on('click', 'a.w-fancybox', function() {
          base._initSwipeGallery();
        });
      }

      // Init sticky footer
      if($(window).width() > 767) {
        base._stickyFooter();
      }

      // Copy login to mobile nav
		var login = $("#member-login").clone(true);
		$("#navmobile .wsite-menu-default").append(login);
    },

    _initSwipeGallery: function() {
      var base = this;

      setTimeout(function(){
        var touchGallery = document.getElementsByClassName('fancybox-wrap')[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          base._initSwipeGallery();
        });
      }, 500);
    }
  }

  $(document).ready(function(){
    impactController.init();
  });
});
