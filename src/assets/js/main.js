"use strict";

var html, st =0, lastScroll = 0;
var breakpoints = {
            sm: 568,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1600
        };
var APP = {
    init: function() {
        html = document.documentElement;
        var _t = this;
        
        _t.isDevice();
        _t.loader();
        _t.alertBrowser.init();
        _t.backTop();
        _t.lazy();
        _t.fancy.init();
        _t.menu();
        _t.sliderHome();
        _t.sliderHomeVilla();
        _t.sliderHomeComment();
        _t.sliderHomeRent();
        _t.sliderVillaList();
        
        _t.inputMask();
        _t.initScroll();
        _t.picker();
        
        _t.readMore();
        _t.fullWidthSticky();
        _t.villaDetailScrollBtn();
        _t.sliderBlogDetail();
        
        $('[data-toggle="tooltip"]').tooltip();
        
        
        var forms = document.querySelectorAll("FORM");
        if(forms.length >0) {
            for(var i=0;i<forms.length;i++) {
                APP.form.validation(forms[i], function(form) {
                    form.submit();
                });
            }
        }
        
        /*
        $(document).click(function(e) {
            if ($(e.target).closest('.collapse').length===0) {
                $('.collapse').collapse('hide');	    
            }
        });
        */
        window.addEventListener('scroll', function(e) {
            _t.scroll();
        });
    },
    scroll: function() {
        st = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    },
    header: function() {
        var header = document.getElementById('header');
        if(!header) {
            return false;
        }
        if(st > 60) {
            $(html).addClass("header--fixed");
        } else {
            $(html).removeClass("header--fixed");
        }
    },
    menu: function() {
        var toggleBtn = document.getElementById('burger'),
            navItem =  document.querySelectorAll(".nav-item"),
            bgNavbar = document.querySelector('.bg-mainmenu'),
            btnClose = document.querySelector(".mainmenu-close"),
            mainMenu =  document.getElementById("mainMenu"),
            setTop = function() {
                if(mainMenu) {
                    if(window.innerWidth < breakpoints.lg) {
                        mainMenu.style.marginTop = document.getElementById("header").offsetHeight + "px";
                    } else {
                        mainMenu.removeAttribute("style");
                    }
                }
            };
        if(toggleBtn) {
            toggleBtn.addEventListener("click", function () {
                $(html).toggleClass("menu--open");
            });
        }
        if(bgNavbar) {
            bgNavbar.addEventListener("click", function () {
                $(html).removeClass("menu--open");
            });
        }
        
        if(btnClose) {
            btnClose.addEventListener("click", function () {
                $(html).removeClass("menu--open");
            });
        }
        
        
        var drpToggles = document.querySelectorAll(".dropdown--toggle"),
            openCL = "show";
            if(drpToggles.length == 0) {return false;}
        for(var i=0;i<drpToggles.length;i++) {
            drpToggles[i].addEventListener("click", function (e) {
                var target = $(this).data("target");
                $(target).toggleClass(openCL);
                $(this).toggleClass(openCL);
                $(html).toggleClass("dropdown--open");
            });
        }

        var drpCloseToggles = document.querySelectorAll(".dropdown-toggle-close"),
            openCL = "show";
            if(drpCloseToggles.length == 0) {return false;}
        for(var i=0;i<drpCloseToggles.length;i++) {
            drpCloseToggles[i].addEventListener("click", function (e) {
                var target = $(this).data("target");
                $(target).removeClass(openCL);
                $(html).removeClass("dropdown--open");
            });
        }

    },
    toggleMore: function() {
        $(".btn-show-more").on("click",function() {
            var t = $(this).data("show-area");
            $(t).toggleClass("expanded");
            if($(t).hasClass("expanded")) {
                $(this).html($(this).data("expanded-title"));
            } else {
                $(this).html($(this).attr("title"));
            }
        });
    },
    sliderHome: function() {
        var el = document.querySelector('.home-slider');
        if(!el) {return false;}
        var slider = el.querySelector(".swiper-container"),    
            pagination = el.querySelector(".swiper-pagination"),
            opt = {
                    lazy: true,
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween:0,
                    effect: 'fade',
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: pagination,
                        clickable: true
                    },
                    keyboard: true
            };
        var swiper = new Swiper(slider, opt);
        
    },
    sliderHomeVilla: function() {
        var categories = document.querySelectorAll(".category-villa");
        if(categories.length < 1) {return false;}
        var setSlider = function(el) {
                var slider = el.querySelector(".swiper-container"),    
                pagination = el.querySelector(".swiper-pagination"),
                prev = el.querySelector(".swiper-button-prev"),  
                next = el.querySelector(".swiper-button-next"),
                allowTouch = (window.innerWidth >= breakpoints.md) ? false : true,
                opt = {
                    slidesPerView: 3,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                    allowTouchMove:allowTouch,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: pagination,
                        clickable: true
                    },
                    navigation: {
                        nextEl: next,
                        prevEl: prev
                    },
                    keyboard: true,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                            slidesPerColumn: 1
                        },
                        567: {
                            slidesPerView: 2,
                            slidesPerColumn: 1
                        },
                        768: {
                            slidesPerView: 2,
                            slidesPerColumn: 1,
                            allowTouchMove:false
                        },
                        992: {
                            slidesPerView: 3,
                            slidesPerColumn: 2
                        }
                    }
                };
            var swiper = new Swiper(slider, opt);
        }
       
       for(var i=0;i<categories.length;i++) {
           setSlider(categories[i]);
       }
        
    },
    sliderHomeComment: function() {
        var el = document.querySelector('.home-comment');
        if(!el) {return false;}
        var slider = el.querySelector(".swiper-container"),    
            pagination = el.querySelector(".swiper-pagination"),
            opt = {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween:0,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: pagination,
                        clickable: true
                    },
                    keyboard: true
            };
        var swiper = new Swiper(slider, opt);
        
    },
    sliderHomeRent: function() {
        var el = document.querySelector('.home-rent-table');
        if(!el) {return false;}
        var slider = el.querySelector(".swiper-container"),    
            pagination = el.querySelector(".swiper-pagination"),
            opt = {
                    loop: false,
                    slidesPerView: 1,
                    spaceBetween:5,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: pagination,
                        clickable: true
                    },
                    keyboard: true,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        567: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 3
                        },
                        992: {
                            slidesPerView: 4
                        },
                        1200: {
                            slidesPerView: 5
                        },
                        1360: {
                            slidesPerView: 6
                        }
                    }
            };
        var swiper = new Swiper(slider, opt);
    },
    sliderVillaList: function() {
        var list = document.querySelectorAll(".villa-list-item-media");
        if(list.length < 1) {return false;}
        if(window.innerWidth >= breakpoints.lg) {return false;}
        var setSlider = function(el) {
            var slider = el.querySelector(".swiper-container"),    
            pagination = el.querySelector(".swiper-pagination"),
            opt = {
                    lazy: true,
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween:0,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: pagination,
                        clickable: true
                    },
                    keyboard: true
            };
            var swiper = new Swiper(slider, opt);
        };
        
        for(var i=0;i<list.length;i++) {
           setSlider(list[i]);
       }
    },
    fullWidthSticky: function() {
        if(window.innerWidth < breakpoints.lg){return false;}
        var sticky = document.querySelector(".fullwidth-sticky");
        if(!sticky) {return false;}
        var stickyWrap = sticky.parentNode,
            stickyNav = sticky.querySelector(".sticky-nav"),
            stickyNavItems = $(stickyNav).find("a"),
            lastID,
            stickyScrollItems = stickyNavItems.map(function(){
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            });
            
        /* Scrolling Fixed */
        window.addEventListener('scroll', function(e) {
            
            /* Stick Scrolling */
            var stickyOffset = $(stickyWrap).offset().top; 
            if(st >= stickyOffset) {
                $(sticky).addClass("sticky-fixed");
            } else {
                $(sticky).removeClass("sticky-fixed");
            }
            
            /* Menu scrolling*/
            var fromTop = st + $(stickyNav).outerHeight() +90;
            // Get current ıteö
            var currentItem = stickyScrollItems.map(function(){
                if ($(this).offset().top < fromTop) return this;
            });
            
            currentItem = currentItem[currentItem.length-1];
            var id = currentItem && currentItem.length ? currentItem[0].id : "";
            if (lastID !== id) {
		lastID = id;
                stickyNavItems.removeClass("active");
		stickyNavItems.filter("[href='#"+id+"']").addClass("active");
            }  
        });
        
        /* Menu */
        stickyNavItems.on("click",function(e) {
            stickyNavItems.removeClass("active");
            var linkHref = $(this).attr("href"),
                offsetTop = $(linkHref).offset().top - 40;
                
            $(this).addClass("active");
            $('html, body').animate({ 
		scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });
    },
    villaDetailScrollBtn: function() {
        if(window.innerWidth > breakpoints.lg){return false;}
        var sticky = document.querySelector(".villa-scroll-btn");
        if(!sticky) {return false;}
        var stickyWrap = sticky.parentNode,
            stickyLink = $(sticky).find("a"),
            reservationForm = document.querySelector(".reservation-form");
            
        /* Scrolling Fixed */
        window.addEventListener('scroll', function(e) {
            /* Scrolling */
            var stickyOffset = $(stickyWrap).offset().top,
                formOffset =  $(reservationForm).offset().top;
            if(st >= stickyOffset && st < formOffset) {
                $(sticky).addClass("fixed");
            } else {
                $(sticky).removeClass("fixed");
            }
        });
        
        stickyLink.on("click",function(e) {
            var linkHref = $(this).attr("href"),
                offsetTop = $(linkHref).offset().top - 40;
                
            $('html, body').animate({ 
		scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });
    },
    sliderBlogDetail: function() {
        var list = document.querySelector(".blog-detail-other");
        if(!list) {return false;}
            var slider = list.querySelector(".swiper-container"),    
            pagination = list.querySelector(".swiper-pagination"),
            opt = {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween:15,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: pagination,
                        clickable: true
                    },
                    keyboard: true,
                    breakpoints: {
                        0: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2
                        },
                        992: {
                            slidesPerView: 3
                        }
                    }
            };
            var swiper = new Swiper(slider, opt);
        
    },
    inputMask: function p() {
        if ($.fn.inputmask()) {
            var element = document.querySelectorAll(".mask"),
                    maskARRAY = {
                        "date": "99/99/9999",
                        "phone": "9 (999) 999 9999",
                        "creditCart":"9999 9999 9999 9999"
                    };
            if (element.length > 0) {
                for (var i = 0; i < element.length; i++) {
                    var el = element[i],
                            maskType = el.getAttribute("data-mask");
                    $(el).inputmask(maskARRAY[maskType]);
                }
            }
        }
    },
    form: {
        checkCaptcha: function(res) {
            console.log(res);
        },
        validatePassword: function (password) {
            var t = /^(0[(])([0-9]){3}([)])([0-9]){3}(-)([0-9]){2}(-)([0-9]){2}$/;
            return t.test(password);
        },
        matchPassword: function (p1, p2) {
            return (p1.value === p2.value) ? true :  false;
        },
        clearInput: function p() {
            var element = document.querySelectorAll(".btn-clear-input");
            if (element !== null || element.length > 0) {
                for (var i = 0; i < element.length; i++) {
                    var el = element[i];
                    el.addEventListener("click", function () {
                        var input = el.previousElementSibling;
                        input.value = "";
                    });
                }
            }
        },
        validation: function (form, callback, opt) {
            var newObj = {},
                    defaultOpt = {
                        errorPlacement: function (error, element) {
                            error.addClass("help-block");

                            if (element.prop("type") === "checkbox") {
                                error.insertAfter(element.parent("label"));
                            } else {
                                error.insertAfter(element.closest(".form-control"));
                            }
                        },
                        highlight: function (element, errorClass, validClass) {
                            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
                        },
                        unhighlight: function (element, errorClass, validClass) {
                            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
                        }
                    };
            if (opt !== null) {
                newObj = $.extend({}, defaultOpt, opt);
            } else {
                newObj = APP.addObj(defaultOpt, newObj);
            }
            $(form).validate({
                ignore: ':hidden:not(:checkbox)',
                errorPlacement: function (error, element) {
                    error.addClass("help-block");
                            if (element.prop("type") === "checkbox") {
                                error.insertAfter(element.parent("label"));
                            } else {
                                element.closest(".form-group").append(error);
                            }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
                },
                submitHandler: callback,
                showErrors: function (errorMap, errorList) {
                    var errors = this.numberOfInvalids();  // <- NUMBER OF INVALIDS
                    //console.log(errorList);
                    this.defaultShowErrors(); // <- ENABLE default MESSAGES
                }
            });
        },
        resetValidation: function (form) {
            $(form).validate().resetForm();
            var formGroups = form.querySelectorAll(".form-group");
            for (var i = 0; i < formGroups.length; i++) {
                APP.removeClass(formGroups[i], "has-error");
            }
            this.resetInput(form);
        },
        resetInput: function (form) {
            form.reset();
        }
    },
    lazy: function() {
        var lazyElements = [].slice.call(document.querySelectorAll(".lazy"));
        var loadVideo = function(element) {
            for (var source in element.children) {
                var videoSource = element.children[source];
                if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                    videoSource.src = videoSource.dataset.src;
                }
            }
            element.load();
        };
        if ("IntersectionObserver" in window) {
            var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    var lazyElement = entry.target;
                    if(lazyElement.tagName =="VIDEO") {
                        loadVideo(lazyElement);
                    } else {
                        lazyElement.src = lazyElement.dataset.src;
                    }
                    setTimeout(function() {
                        lazyElement.classList.add("loading");
                    },50);
                    lazyImageObserver.unobserve(lazyElement);
                  }
                });
            });
            lazyElements.forEach(function(lazyElement) {
                lazyImageObserver.observe(lazyElement);
            });
        } else {
            lazyElements.forEach(function(lazyElement) {
                if(lazyElement.tagName =="VIDEO") {
                    loadVideo(lazyElement);
                } else {
                    lazyElement.src = lazyElement.dataset.src;
                }
            });
        }
    },
    fancy: {
        init: function p() {
            if ($.fn.fancybox()) {
                var element = document.querySelectorAll(".fancybox");
                if (element !== null || element.length > 0) {
                    for (var i = 0; i < element.length; i++) {
                        var el = element[i];
                        $(el).fancybox();
                    }
                    $('[data-fancybox]').fancybox({
                        afterShow: function (instance, current) {}
                    });
                }
            }
        },
        open: function (el, type) {
            type = (type !== "") ? type : "inline";
            $.fancybox.open({
                src: el,
                type: type,
                opts : {
                    transitionDuration: 2000,
                    protect: true,
                    keyboard: false,
                    touch: false,
                    smallBtn : true,
                    clickSlide:false,
                    beforeLoad  : function( instance, current ) {
                        instance.showLoading();
                        instance.$refs.toolbar.show();
                    },
                    afterClose: function( instance, current ) {
                        $(el).remove();
                        return false;
                    }
                }
            });
        }
    },
    picker: function(element, opt) {
        if ($.fn.datetimepicker()) {
            element = element || document.querySelectorAll(".picker");
            var mFormat = 'MM/DD/YYYY',
                    dateFormat = 'DD/MM/YYYY',
                    monthFormat = "MM/YYYY",
                    timezone = "Europe/Istanbul",
                    today = moment(new Date()).format(mFormat),
                    defaultOpt = {
                        locale: LANG,
                        format: dateFormat,
                        allowInputToggle: true,
                        icons: {
                            time: "fa fa-clock-o",
                            date: "fa fa-calendar",
                            up: "fa fa-arrow-up",
                            down: "fa fa-arrow-down",
                            previous: 'fa fa-angle-left',
                            next: 'fa fa-angle-right'
                        }
                    };
            if (element.length > 0) {
                for (var i = 0; i < element.length; i++) {
                    var el = element[i],
                            newObj = {};
                    if (el.getAttribute("value") || el.getAttribute("data-value")) {
                        var elVal = (el.getAttribute("value")) ? el.getAttribute("value") : el.getAttribute("data-value");
                        defaultOpt["defaultDate"] = moment(elVal).format(mFormat);
                    }
                    if (typeof $(el).attr("data-min") !== "undefined") {
                        defaultOpt["minDate"] = moment($(el).attr("data-min")).format(mFormat);
                    }
                    if (typeof $(el).attr("data-max") !== "undefined") {
                        defaultOpt["maxDate"] = moment($(el).attr("data-max")).format(mFormat);
                    }
                    if (opt !== null) {
                        newObj = $.extend({}, defaultOpt, opt);
                    } else {
                        newObj = APP.addObj(defaultOpt, newObj);
                    }
                    $(el).datetimepicker(newObj);
                }
            }
        }
    },
    readMore: function() {
        $("[data-toggle='readmore']").on("click", function() {
            var target = $(this).attr("aria-controls");
            $("#" + target).toggleClass("show");
        });
    },
    initScroll: function() {
        $('[data-scroll="true"], .scrollable').each(function() {
            var el = $(this),
            h = el.outerHeight();
            if(el.data('mobile-height') && el.data('height')) {
                if (window.innerWidth < breakpoints.md) {
                    h = el.data('mobile-height');
                } else {
                    h= el.data('height');
                }
            } else {
                if (window.innerWidth < breakpoints.md) {
                    h = 200;
                
                } 
            }
            var childHeight = el.children().outerHeight();
            if (window.innerWidth >= breakpoints.md) {
            APP.scrollInit(this, {
                    mobileNativeScroll: true,
                    handleWindowResize: true,
                    rememberPosition: (el.data('remember-position') == 'true' ? true : false),
                    height: h
                });
            }
        });   
    },
    scrollInit: function(element, options) {
            if(!element) return;
            function init() {
                var ps;
                var height;

                if (options.height instanceof Function) {
                    height = parseInt(options.height.call());
                } else {
                    height = parseInt(options.height);
                }
                
                if (height > 0) {
                    $(element).height(height);
                }
                
                if (options.desktopNativeScroll) {
                    $(element).css('overflow', 'auto');
                    return;
                }
                /* Init scroll */
                $(element).css('overflow', 'hidden');
                
                $(element).addClass('em-scroll');;
                
                ps = new PerfectScrollbar(element, {
                    wheelSpeed: 0.2,
                    swipeEasing: true,
                    wheelPropagation: (options.windowScroll === false ? false : true),
                    minScrollbarLength: 40,
                    maxScrollbarLength: 300,
                    suppressScrollX: true
                });
                
                 ps.update();
                
            }    
            
            init();

            // Handle window resize
            if (options.handleWindowResize) {
                $(window).on("resize", function() {
                    init();
                });
            }
        },
    isNumber: function(evt) {
         var theEvent = evt || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
    },
    getOffset: function(el) {
        var rect = el.getBoundingClientRect();
        return {
          left: parseInt(rect.left) + parseInt(window.scrollX),
          top: parseInt(rect.top) + parseInt(window.scrollY)
        };
    },
    setAttr: function(el,attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
          }
    },
    isDevice: function p() {
        var check = false,
                userClass = "",
                isMac = navigator.appVersion.indexOf("Mac") >= 0,
                isIpad = navigator.userAgent.match(/iPad/i) != null;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);

        if (isMac) {
            userClass += " mac ";
        }
        if (isIpad) {
            userClass += " ipad ";
        }
        if (check) {
            userClass = " mobile ";
        }
        var browserARR = this.browserSpecs(),
                bName = (browserARR.name).toLowerCase(),
                bVersion = browserARR.version;
        if (bName === 'msie' && browserARR.version < 10) {
            bVersion = "old";
        }
        userClass += bName + " " + bName + "_" + bVersion;
        document.documentElement.className += userClass.trim();
    },
    loader: function () {
        var loader = document.getElementById("loader"),
            lSVG = '<svg class="loader-svg" height="48px" width="48px"><circle class="path-bg" cx="24" cy="24" fill="none" r="22" stroke="#eeeeee" stroke-width="4"></circle><circle class="path" cx="24" cy="24" fill="none" r="22" stroke="#d50032" stroke-miterlimit="10" stroke-width="4"></circle></svg></div>',
            active = "show",
            timeOut = parseInt(performance.now()) + 200,
            browserARR = APP.browserSpecs();
            if(loader === null) {
                loader = document.createElement("DIV");
                loader.id = "loader";
                loader.className = "fullscreen";
                loader.className += " " + active;
                loader.innerHTML = lSVG;
                document.body.appendChild(loader);
            }
        if (browserARR.version < 10) {
            loader.parentNode.removeChild(loader);
        } else {
            setTimeout(function() {
                //APP.removeClass(loader,active)
                var reg = new RegExp('(\\s|^)' + active + '(\\s|$)');
                loader.className = loader.className.replace(reg, ' ');
            },timeOut);
        }
    },
    backTop: function() {
        var el = document.querySelector(".back-to-top");
        if (!el) {return false;}
        el.addEventListener("click", function () {
            $('html, body').animate({
                scrollTop: 0
            }, 300);
        });   
    },
    alertBrowser: {
        init: function () {
            var sb = {
                host: (BASE_URL !== "") ? BASE_URL : window.location.host,
                asset_host: "assets/img/browser/",
                message: "Tarayıcınızın versiyonu çok eski ve sitemiz tarafından desteklenmemektedir.<br />Sitemizi düzgün görüntülemek istiyorsanız aşağıdak tarayıcılardan birini bilgisayarınıza yükleyerek devam edebilirsiniz.",
                br: [
                    {
                        icon: "firefox.png",
                        text: "Mozilla Firefox",
                        url: "https://www.mozilla.org/tr/firefox/"
                    },
                    {
                        icon: "chrome.png",
                        text: "Google Chrome",
                        url: "https://www.google.com/chrome/"
                    },
                    {
                        icon: "opera.png",
                        text: "Opera",
                        url: "https://www.opera.com/tr"
                    },
                    {
                        icon: "edge.png",
                        text: "Internet Explorer (10+)",
                        url: "https://www.microsoft.com/tr-tr/windows/microsoft-edge"
                    }
                ]
            },
                    browserARR = APP.browserSpecs(),
                    bName = (browserARR.name).toLowerCase();

            if (bName === 'msie' && browserARR.version < 10) {
                this.addPopupCSS();

                var pHTML = '<p>' + sb.message + '</p>',
                        pb = sb.br;

                pHTML += '<div class="e-p-browsers">';
                for (var i = 0; i < pb.length; i++) {
                    var bIMG_URL = sb.host + sb.asset_host + pb[i].icon;
                    pHTML += '<div class="e-browser-item"><a href="' + pb[i].url + '" target="_blank"><b>' + pb[i].text + '</b><div><img src="' + bIMG_URL + '" alt="" /></div></a></div>';
                }

                pHTML += '</div>';
                this.addPopupHTML(pHTML);
                document.body.style.overflow = "hidden";
            }
        },
        addPopupHTML: function (c) {
            var popupHTML = '<div class="e-popup"><div class="e-popup-body"><div class="e-popup-content">' + c + '</div></div><div class="e-popup-bg"></div></div>';
            document.body.innerHTML += popupHTML;
        },
        addPopupCSS: function () {
            var sheet = '.e-popup {position:fixed;display:table;top:0;left:0;bottom:0;right:0;width:100%;height:100%;z-index:9990;}.e-popup-bg{display:block;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000000; opacity: 0.9;filter: alpha(opacity=90)} .e-popup-body {display: table-cell;width: 100%;height: 100%;vertical-align: middle;position:relative;z-index:99999;}.e-popup-content{text-align: center;background: #ffffff;margin: 0 auto;max-width: 800px;padding:50px 30px;font-size:18px;}.e-popup-content p {margin-bottom:35px;}.e-p-browsers{display: table;width:100%;}.e-browser-item{display: table-cell;text-align:center;}',
                    sheetEl = document.createElement('style');
            document.getElementsByTagName('head')[0].appendChild(sheetEl);
            sheetEl.setAttribute('type', 'text/css');
            sheetEl.styleSheet.cssText = sheet;
        }
    },
    browserSpecs: function () {
        var ua = navigator.userAgent, tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name: 'IE', version: (tem[1] || '')};
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null)
                return {name: tem[1].replace('OPR', 'Opera'), version: tem[2]};
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1]);
        return {name: M[0], version: M[1]};
    }
};


$(document).ready(function() {
    APP.init();
});

