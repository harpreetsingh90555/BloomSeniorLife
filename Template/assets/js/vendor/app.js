var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.slick();
      Init.achivementCountdown();
      Init.wow();
      Init.donationmodal();
      Init.magnifying();
      Init.formValidation();
      Init.contactForm();
      Init.checkBoxes();
      Init.dropdown();
    },

    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },
    preloader: function () {
      setTimeout(function () {
        $("#preloader").fadeOut("slow");
      }, 2800);
    },

    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },

    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }
      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }
      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }
      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }
      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
      $(".donationmodal").click(function () {
        $("#myModal").fadeIn();
      });

      $("#myModal").click(function (e) {
        if (
          e.target.id === "myModal" ||
          $(e.target).hasClass("close-btn") ||
          $(e.target).closest(".close-btn").length > 0
        ) {
          $("#myModal").fadeOut();
        }
      });
    },

    slick: function () {
      if ($(".brand-slider").length) {
        $(".brand-slider").slick({
          autoplay: !0,
          autoplaySpeed: 0,
          speed: 10000,
          arrows: !1,
          swipe: !0,
          slidesToShow: 6,
          cssEase: "linear",
          pauseOnFocus: !1,
          pauseOnHover: !1,
          responsive: [
            { breakpoint: 1499, settings: { slidesToShow: 4 } },
            { breakpoint: 999, settings: { slidesToShow: 3 } },
            { breakpoint: 490, settings: { slidesToShow: 2 } },
          ],
        });
      }
      if ($(".testimonial-slider").length) {
        $(".testimonial-slider").slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          speed: 900,
          infinite: !0,
          autoplay: true,
          centerMode: true,
          centerPadding: "60px",
          dots: false,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          responsive: [
            {
              breakpoint: 1399,
              settings: { slidesToShow: 1, centerPadding: "0px" },
            },
            {
              breakpoint: 580,
              settings: {
                slidesToShow: 1,
                centerMode: false,
                centerPadding: "0",
              },
            },
          ],
        });
      }
      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });
      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },
    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow",
          animateClass: "animated",
          mobile: !0,
          live: !0,
        });
        wow.init();
      }
    },

    donationmodal: function () {
      $("#remember").on("change", function () {
        if ($(this).is(":checked")) {
          $(".popup").slideDown();
          $("input[type=radio][name=drRadio]").prop("checked", false); // uncheck other radios
        } else {
          $(".popup").slideUp();
        }
      });

      $(".donationmodal").click(function () {
        $("#myModal").fadeIn();
      });

      $("#myModal").click(function (e) {
        if (
          e.target.id === "myModal" ||
          $(e.target).hasClass("close-btn") ||
          $(e.target).closest(".close-btn").length > 0
        ) {
          $("#myModal").fadeOut();
        }
      });
      const $tabs = $(".nav-link");
      const $slider = $(".slider");

      $tabs.each(function (index) {
        $(this).on("click", function () {
          $tabs.removeClass("active");
          $(this).addClass("active");
          $slider.css("left", `${index * 51}%`); 
        });
      });
    },

    magnifying: function () {
      if ($(".video-popup").length) {
        $(".video-popup").magnificPopup({
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: true,
          fixedContentPos: false,
        });
      }
    },
    achivementCountdown: function () {
      var section = $(".counter-section");
      var hasEntered = false;

      if (section.length === 0) return;

      var initAnimate =
        $(window).scrollTop() + $(window).height() >= section.offset().top;
      if (initAnimate && !hasEntered) {
        hasEntered = true;
        this.counterActivate();
      }

      $(window).on(
        "scroll",
        function () {
          var shouldAnimate =
            $(window).scrollTop() + $(window).height() >= section.offset().top;

          if (shouldAnimate && !hasEntered) {
            hasEntered = true;
            this.counterActivate();
          }
        }.bind(this)
      );
    },

    counterActivate: function () {
      $(".counter-count .count").each(function () {
        var $this = $(this);
        $this.prop("Counter", 0).animate(
          {
            Counter: $this.text(),
          },
          {
            duration: 3000,
            easing: "swing",
            step: function (now) {
              $this.text(Math.ceil(now));
            },
          }
        );
      });
    },
    checkBoxes: function () {
      $(".sub-checkboxes").hide();
      $(".arrow-block").click(function () {
        var subCheckboxes = $(this).next(".sub-checkboxes");
        var chevronIcon = $(this).find("i");
        subCheckboxes.slideToggle("fast");
        chevronIcon.toggleClass("fa-chevron-down fa-chevron-up");
      });
      $(".check-block, .sub-check-box").click(function (event) {
        event.stopPropagation();
      });

      if ($(".customer-container").length) {
        $(".signin-button").click(function () {
          $(".sign-form").slideToggle();
        });
      }
      $(document).ready(function () {
        $("#remember").on("change", function () {
          const popup = $(".popup");
          const customPrice = $(".custom-price");

          if (this.checked) {
            popup.show();
            setTimeout(() => popup.addClass("show"), 10);
            customPrice.addClass("active");
          } else {
            popup.removeClass("show");
            setTimeout(() => popup.hide(), 500);
            customPrice.removeClass("active");
          }
        });
      });
    },
    dropdown: function () {
      $(document).ready(function () {
        $(".wrapper-dropdown").each(function () {
          let $dropdown = $(this);
          let $arrow = $dropdown.find("svg");
          let $options = $dropdown.find(".topbar-dropdown");
          let $display = $dropdown.find(".selected-display");

          $dropdown.on("click", function (event) {
            event.stopPropagation();
            $(".wrapper-dropdown").not($dropdown).removeClass("active");
            $(".wrapper-dropdown svg").not($arrow).removeClass("rotated");

            $dropdown.toggleClass("active");
            $arrow.toggleClass("rotated");
          });

          $options.find("li").on("click", function (event) {
            event.stopPropagation();
            $display.text($(this).text());
            closeAllDropdowns();
          });
        });

        $(document).on("click", function () {
          closeAllDropdowns();
        });

        function closeAllDropdowns() {
          $(".wrapper-dropdown").removeClass("active");
          $(".wrapper-dropdown svg").removeClass("rotated");
        }
      });

      $(document).ready(function () {
        $(".card-icon").on("click", function (e) {
          e.stopPropagation();

          let menu = $(this).find(".sm-menu");
          $(".sm-menu").not(menu).removeClass("active");
          menu.toggleClass("active");
        });

        $(document).on("click", function () {
          $(".sm-menu").removeClass("active");
        });
        $(".sm-menu").on("click", function (e) {
          e.stopPropagation();
        });
      });
    },
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".login-form").length) {
        $(".login-form").validate();
      }
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-16 mb-16'>Email Sent Successfully</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-16 mb-16'>There is an error</h5>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return !1;
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);