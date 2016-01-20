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

  // Waypoints
  // @codekit-prepend "plugins/jquery.waypoints.js"

  // Placeholders
  // @codekit-prepend "plugins/jquery.placeholder.js";

  // Video JS
  // @ codekit-prepend "plugins/video.js";

  // Vimeo modal autoplay
  // @ codekit-prepend "plugins/jquery.vimeo.api.js";

  // Donut Chart
  // @ codekit-prepend "plugins/chart.js";

  function onScrollAnimations() {
    $('.wp-1').waypoint(function() {
      $('.wp-1').addClass('animated fadeInUp');
    }, {
      offset: '75%'
    });
    $('.wp-2').waypoint(function() {
      $('.wp-2').addClass('animated fadeInUp');
    }, {
      offset: '75%'
    });
    $('.wp-3').waypoint(function() {
      $('.wp-3').addClass('animated fadeInUp');
    }, {
      offset: '75%'
    });
    $('.wp-4').waypoint(function() {
      $('.wp-4').addClass('animated fadeIn');
    }, {
      offset: '75%'
    });
    $('.wp-5').waypoint(function() {
      $('.wp-5').addClass('animated fadeInRight');
    }, {
      offset: '50%'
    });
    $('.wp-6').waypoint(function() {
      $('.wp-6').addClass('animated fadeInLeft');
    }, {
      offset: '50%'
    });
    $('.wp-7').waypoint(function() {
      $('.wp-7').addClass('animated fadeInUp');
    }, {
      offset: '60%'
    });
    $('.wp-8').waypoint(function() {
      $('.wp-8').addClass('animated fadeInUp');
    }, {
      offset: '60%'
    });
  }

  function inputPlaceholders() {
    $('input, textarea').placeholder();
  }

  function navMobileCollapse() {
    // avoid having both mobile navs opened at the same time
    $('#collapsingMobileUser').on('show.bs.collapse', function () {
      $('#collapsingNavbar').removeClass('in');
      $('[data-target="#collapsingNavbar"]').attr('aria-expanded', 'false');
    });
    $('#collapsingNavbar').on('show.bs.collapse', function () {
      $('#collapsingMobileUser').removeClass('in');
      $('[data-target="#collapsingMobileUser"]').attr('aria-expanded', 'false');
    });
    // dark navbar
    $('#collapsingMobileUserInverse').on('show.bs.collapse', function () {
      $('#collapsingNavbarInverse').removeClass('in');
      $('[data-target="#collapsingNavbarInverse"]').attr('aria-expanded', 'false');
    });
    $('#collapsingNavbarInverse').on('show.bs.collapse', function () {
      $('#collapsingMobileUserInverse').removeClass('in');
      $('[data-target="#collapsingMobileUserInverse"]').attr('aria-expanded', 'false');
    });
  }

  function navSearch() {
    // hide first nav items when search is opened
    $('.nav-dropdown-search').on('show.bs.dropdown', function () {
      $(this).siblings().not('.navbar-nav .dropdown').addClass('sr-only');
    })
    // cursor focus
    $('.nav-dropdown-search').on('shown.bs.dropdown', function () {
      $('.navbar-search-input').focus();
    });
    // show all nav items when search is closed
    $('.nav-dropdown-search').on('hide.bs.dropdown', function () {
      $(this).siblings().removeClass('sr-only');
    });
  }

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

  function donutChart() {
    var doughnutData = [
      {
        value: 324,
        color:"#5e98e3",
        highlight: "#424753",
        label: "Completed"
      },
      {
        value: 34,
        color: "#59d0bd",
        highlight: "#424753",
        label: "In backlog"
      },
      {
        value: 20,
        color: "#e8e9ec",
        highlight: "#424753",
        label: "Without ticket"
      }
    ];
    window.onload = function(){
      var c = document.getElementById("chart-area");
      if (c != null) {
        var ctx = c.getContext("2d");
        window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {
          responsive : true,
          percentageInnerCutout : 80
        });
      } else {
        return false
      }
    };
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
        { value: 1E18, symbol: "E" },
        { value: 1E15, symbol: "P" },
        { value: 1E12, symbol: "T" },
        { value: 1E9,  symbol: "G" },
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

    $('.instagram-quote').each(function () {
      $.getJSON('//wms-api.herokuapp.com/suflyka/instagram/feed?callback=?', function(data) {
        var arr = data.data[0].caption.text.split(/\n/);
        var quote = arr[0].replace(/^\s*\"|\"\s*$/g, '');
        var cite = arr[1].replace(/^-\s*|\s*/g, '');
        $('.ig-quote').text(quote);
        $('.ig-quote-footer').text(cite);
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
