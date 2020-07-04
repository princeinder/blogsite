/*
 Template Name: BlogsCloud
 File Name: custom.js
 Author Name: ThemeVault
 Author URI: http://www.themevault.net/
 License URI: http://www.themevault.net/license/
 */



$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 180) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    $('#back-to-top').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 0,
        freeMode: false,
        nav: true,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            450: {
                slidesPerView: 1,
                spaceBetween: 0,
            }

        },
    });


    $(function () {

        $('#tv-grid').gridrotator({
            rows: 1,
            columns: 5,
            animType: 'fadeInOut',
            animSpeed: 2000,
            interval: 1000,
            step: 1,
            w1024: {rows: 1, columns: 5},
            w768: {rows: 1, columns: 5},
            w480: {rows: 1, columns: 3},
            w320: {rows: 1, columns: 3},
            w240: {rows: 1, columns: 3},
        });

    });

    var swiper_one = new Swiper('.tv-featured-blog-slider-style-one', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    $('.tv-widget-posts-slider').each(function () {
        var cust_slider = $(this);
        $(cust_slider).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            infinite: false,
            speed: 900,
            cssEase: 'ease-in-out',
            autoplay: false,
            dots: false,
            appendArrows: $(cust_slider).parent().find('.tv-widget-slider-arrows'),
            prevArrow: '<button type="button" class="slick-next"><i class="ti-arrow-circle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-circle-right"></i></button>'
        });
    });
    $('.tv-featured-posts-slider').each(function () {
        var cust_slider_one = $(this);
        $(cust_slider_one).slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            infinite: false,
            speed: 900,
            cssEase: 'ease-in-out',
            autoplay: false,
            dots: false,
            appendArrows: $(cust_slider_one).parent().find('.tv-widget-slider-arrows'),
            prevArrow: '<button type="button" class="slick-next"><i class="ti-arrow-circle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-circle-right"></i></button>',
            responsive: [
                {breakpoint: 750,
                    settings: {slidesToShow: 1, slidesToScroll: 1}
                }

            ]
        });
    });

    $(window).on('scroll', function () {

        var topheight = $(".tv-top-header").outerHeight() + $(".tv-middle-header").outerHeight();
        /* Full Width */
        ($(window).scrollTop() > topheight) ? $('.tv-sticky-header').addClass('tv-sticky-header-active') : $('.tv-sticky-header').removeClass('tv-sticky-header-active');
    });

    openNav();
    closeNav();
});
/*Search Toggle*/
function openNav() {
    document.getElementById("search_nav").style.opacity = 1;
    document.getElementById("search_nav").style.width = "auto";
    document.getElementById("search_nav").style.height = "auto";
}

function closeNav() {
    document.getElementById("search_nav").style.opacity = 0;
    document.getElementById("search_nav").style.width = "0";
    document.getElementById("search_nav").style.height = "0";
}

$('.card.card-pricing').on('click',function(){
    $('.card.card-pricing').removeClass('popular shadow');
    $(this).addClass('popular shadow');
    var memid=$(this).attr('attr-id');
    $('.select-membership').attr('href','/register/'+memid);
    $('.select-membership').removeClass('disabled');
})

var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"]; 
$("#pimage").change(function(){
    if (this.type == "file") {
        var sFileName = this.value;
         if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
             
            if (!blnValid) {
                alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                this.value = "";
                return false;
            }
        }
    }
    return true;

});


$("#pimage").change(function(){
    if (this.type == "file") {
        var sFileName = this.value;
         if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
             
            if (!blnValid) {
                alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                this.value = "";
                return false;
            }
        }
    }
    return true;

});

$("#register-form").on('submit',function(e){
    var pass= $('#pass').val();
    var repass=$('#re_pass').val();
    if(pass == repass){
    return true;
    }
    else{
    $(".error-message").html('<div class="alert alert-danger">Password and Confrim password not matched</div>');
    return false;
    }
});



/*==========================End====================================*/
