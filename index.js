/** * * * * * * * * * * * *
       ** Smooth scroll
       ** * * * * * * * * * * * */
      // enquire.register("(min-width: 768px)", {
      //   match : function() {
      //     var $window = $(window);
      //     var scrollTime = 0.7;
      //     var scrollDistance = 300;

      //     $window.on("mousewheel DOMMouseScroll", function(event){
      //       event.preventDefault();

      //       var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
      //       var scrollTop = $window.scrollTop();
      //       var finalScroll = scrollTop - parseInt(delta*scrollDistance);

      //       TweenMax.to($window, scrollTime, {
      //           scrollTo : { y: finalScroll, autoKill:true },
      //               ease: Power1.easeOut,
      //               overwrite: 5
      //       });
      //     });
      //   }
      // });

      /** * * * * * * * * * * * *
       ** Init isotope
       ** * * * * * * * * * * * */
      var $grid = $('#grid');

      $grid.isotope({
        layoutMode: 'packery',
        itemSelector: '.grid-item',
        percentPosition: true,
        packery: {
          columnWidth: '.grid-sizer'
        }
      });

      /** * * * * * * * * * * * *
       ** Init iziModal
       ** * * * * * * * * * * * */
      $(document).on('click', '.trigger', function (event) {
        event.preventDefault();
        $(this).parents('article').children('.modal').iziModal('open');
      });

      $('.modal').iziModal({
        group: 'posts',
        fullscreen: true,
        radius: 2,
        padding: 0,
        overlayClose: true,
        width: 1170,
        bodyOverflow: true,
        appendTo: false,
        //restoreDefaultContent: true,
        onFullscreen: function() {
          $('.modal .post-media img').toggleClass('isFullscreen')
        //   ps.update();
        }
      });

      /** * * * * * * * * * * * *
       ** Init perfect-scrollbar
       ** * * * * * * * * * * * */
      //const ps = new PerfectScrollbar('.iziModal-wrap')

      /** * * * * * * * * * * * *
       ** Run stuff after each image loads
       ** * * * * * * * * * * * */
      $grid.imagesLoaded().progress( function() {

        // Give different sized frames to different aspect ratios
        $('.grid-content img').each( function() {
          var $img    = $(this);
          var $parent = $(this).parents('.grid-item');
          var $frame  = $(this).parent('.grid-content');

          // If: Images are in portrait, give them the double height frame.
          // Else if: Images are wider than 16:9, give them double width.
          if ($img.width() < $img.height()) {
            enquire.register('(min-width: 768px)', {
              match : function() {
                $frame.addClass('grid-content--height2');
              },
              unmatch : function() {
                $frame.removeClass('grid-content--height2');
              }
            });
          } else if ($img.width() / $img.height() > 16/9) {
            enquire.register('(min-width: 768px)', {
              match : function() {
                $parent.removeClass('col-md-4');
                $parent.addClass('col-md-8');
              },
              unmatch : function() {
                $parent.removeClass('col-md-8');
                $parent.addClass('col-md-4');
              }
            });
          }

          // Fit image to parent aspect ratio
          if ($img.width() / $img.height() > $parent.width() / $parent.height()) {
            $img.addClass('portrait');
          } else if ($img.hasClass('portrait')) {
            $img.removeClass('portrait');
          }
        });

        $('.modal .post-media').children('img').each( function() {
          img = this;
          // Give portrait class to images in portrait mode
          if (img.height > img.width) {
            $(this).addClass('portrait');
          };
        });

        // Relayout isotope
        $grid.isotope('layout');
      });

      /**
       **/
      new ResizeSensor(jQuery('.grid-item'), function() {
        // Re-fit image to parent aspect ratio
        $('.grid-content img').each( function() {
          var $img    = $(this);
          var $parent = $(this).parents('.grid-item');
          var $frame  = $(this).parent('.grid-content');
          if ($img.width() / $img.height() > $parent.width() / $parent.height()) {
            $img.addClass('portrait');
          } else if ($img.hasClass('portrait')) {
            $img.removeClass('portrait');
          }
        });
      });

      // Scroll to top
      $(".back-top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({scrollTop: 0}, 800);
        return false;
      });

      // Scroll to content
      $("#scroll-boop").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
          scrollTop: $("#content").offset().top
        }, 800);
      });

      // Scroll reveal
      var config = {
        viewFactor : 0.15,
        duration   : 800,
        distance   : "100px",
        scale      : 0.8,
        reset		: true,
        viewOffset: { top: 64 }
      };

      window.sr = ScrollReveal(config);

	  sr.reveal('.grid-content', 300);
	  