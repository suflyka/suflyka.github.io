(function ($) {
  "use strict";

  // jQuery
  // @codekit-prepend "plugins/jquery.js";

  // Bootstrap JS
  // @codekit-prepend "bootstrap/util.js";
  // @codekit-prepend "bootstrap/carousel.js";
  // @codekit-prepend "bootstrap/collapse.js";
  // @codekit-prepend "bootstrap/dropdown.js";
  // @codekit-prepend "bootstrap/modal.js";

  // Video JS
  // @ codekit-prepend "plugins/video.js";

  // Vimeo modal autoplay
  // @ codekit-prepend "plugins/jquery.vimeo.api.js";

  // owl
  // @codekit-prepend "plugins/owl.carousel.js";

  function htmlVideo() {
    videojs("demo_video", {
      controlBar: {
        timeDivider: false,
        fullscreenToggle: false,
        playToggle: false,
        remainingTimeDisplay: false
      },
      "height": "auto",
      "width": "auto"
    }).ready(function() {
      var myPlayer = this;
      var aspectRatio = 5 / 12; // aspect ratio 12:5 (video frame 960x400)
      function resizeVideoJS() {
          var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
          myPlayer.width(width).height(width * aspectRatio);
      }
      resizeVideoJS();
      window.onresize = resizeVideoJS;
    });
  }

  function scrollToTop() {
    $('.scroll-top').on( 'click', function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
  }

  function videoModal() {

    // VIMEO

    $('#videoModal').on('shown.bs.modal', function () {
      $("#vimeo-play").vimeo("play");
    });

    $('#videoModal').on('hidden.bs.modal', function () {
      $("#vimeo-play").vimeo("pause");
    });

    // YOUTUBE

    $('#youtube-trigger').click(function () {

      var videoSRC     = $(this).attr("data-video"),
          videoSRCauto = videoSRC + "?autoplay=1&html5=1&rel=0&showinfo=0";

      $('#youtubeModal').on('shown.bs.modal', function () {
        $('#youtube-play').attr('src', videoSRCauto);
      });

      $('#youtubeModal').on('hidden.bs.modal', function () {
        $('#youtube-play').attr('src', videoSRC);
      });

    });
  }

  function social() {
    var nFormatter = function(num, digits) {
      var si = [
        { value: 1E9,  symbol: "B" },
        { value: 1E6,  symbol: "M" },
        { value: 1E3,  symbol: "k" }
      ], i;
      for (i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
          return (num / si[i].value).toFixed(digits).replace(/\.?0+$/, "") + si[i].symbol;
        }
      }
      return num;
    };

    $('.facebook-count').each(function () {
      $.getJSON('//wms-api.herokuapp.com/suflyka/facebook?callback=?', function(data) {
        $(this).html(nFormatter(data.likes, 1));
        $(this).addClass('loaded');
      }.bind(this));
    });

    $('.instagram-count').each(function () {
      $.getJSON('//wms-api.herokuapp.com/suflyka/instagram?callback=?', function(data) {
        $(this).html(nFormatter(data.data.counts.followed_by, 1));
        $(this).addClass('loaded');
      }.bind(this));
    });

    $('.blockquote-instagram').each(function () {
      $.getJSON('//wms-api.herokuapp.com/suflyka/instagram/feed?callback=?', function(data) {
        var quotes = data.data;
        var fullcaption, thequote, quote, cite, template;
        $.each(quotes, function(i, item) {
          fullcaption = item.caption.text.replace(/^\s*|\s*$/g, '');
          thequote = fullcaption.split(/\n/);
          if (thequote.length === 2) { // is a quote
            quote = thequote[0].replace(/^\s*\"|\"\s*$/g, '');
            cite = thequote[1].replace(/^-\s*|\s*/g, '');

            template = $('<div class="blockquote-inner item"><p class="ig-quote">' + quote + '</p><footer class="ig-quote-footer">' + cite + '&nbsp;<a href="' + item.link + '"><i class="fa fa-external-link-square"></i></a></footer></div>');

            $('.instagram-quotes').append(template);
          }

          // var imgurl = item.images.standard_resolution.url;
          // var templatepic = $('<div class="item ig-pic"><a href="' + item.link + '"><img src="' + imgurl + '" alt=""></a></div>');
          // $('.instagram-pics').append(templatepic);

        });

        // owl
        $('.instagram-quotes').owlCarousel({
          loop: true,
          margin: 0,
          nav: false,
          dots: false,
          items: 1,
          autoplay: true,
          autoplayTimeout: 10000,
          autoplaySpeed: 1500
        })
        // $('.instagram-pics').owlCarousel({
        //   loop: true,
        //   margin: 15,
        //   nav: false,
        //   dots: false,
        //   autoplay: true,
        //   autoplayTimeout: 10000,
        //   autoplaySpeed: 1500,
        //   responsive: {
        //     0: { items: 1 },
        //     544: { items: 2 },
        //     768: { items: 3 },
        //   }
        // })

        $(this).addClass('loaded');
      }.bind(this));
    });
  }

  function setBgImage() {
    $('[data-bg-image]').each(function() {
      var _elem = $(this)
      var defaults = {
        bgImage: "",
        overlayColor: '',
        overlayClass: '',
        overlayOpacity: 0,
      }
      var data = _elem.data();
      $.extend(defaults, data);
      var url = defaults.bgImage;
      var color = defaults.overlayColor;
      var opacity = defaults.overlayOpacity;

      var overlay = $('<div class="bg-overlay"></div>');
      overlay.addClass(defaults.overlayClass);
      overlay.css({
        'background-color': color,
        'opacity': 1
      });
      _elem.append(overlay);

      var img = new Image();
      img.src = url;
      img.onload = function() {
        _elem.css({
          'background-image': 'url(' + url + ')'
        });
        _elem.children('.bg-overlay').css({
          'opacity': opacity
        });
      }

    })
  }

  function init() {
    setBgImage();
    // onScrollAnimations();
    // inputPlaceholders();
    // navMobileCollapse();
    // navSearch();
    // htmlVideo();
    // donutChart();
    // videoModal();
    scrollToTop();
    social();
  }

  init();

})(jQuery);

// @codekit-append "plugins/TweenLite.min.js";
// @codekit-append "plugins/EasePack.min.js";
// @codekit-append "plugins/rAF.js";
// @codekit-append "starheader.js";
