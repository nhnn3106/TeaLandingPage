/**
 * jQuery Animated Progressbar
 * Author: shakibdshy<shakibdshy@gmail.com>
 * Author URL: https://github.com/shakibdshy
 * Version: 1.0.0
 */

$(function () {
  // 1. Định nghĩa hàm chạy Animation
  function runAnimation($scope) {
    // SỬA LỖI 1: Đổi [progress-bars] thành [progress-bar] để khớp với HTML
    $scope.find("[progress-bar]").each(function () {
      var $bar = $(this);
      var percent = $bar.attr("data-percentage"); // Lấy ví dụ: "90%"

      // Reset về 0 trước khi chạy để đảm bảo hiệu ứng mượt mà
      $bar.find(".progress-fill").css("width", "0%");
      $bar.find(".progress-number-mark").css("left", "0%");
      $bar.find(".percent").html("0%");

      // Animation cho thanh màu (Width)
      // SỬA LỖI 2: Dùng biến percent (không có ngoặc kép)
      $bar
        .find(".progress-fill")
        .animate({ width: percent }, { duration: 1000 });

      // Animation cho con số (Left position + đếm số)
      $bar.find(".progress-number-mark").animate(
        { left: percent },
        {
          duration: 1000,
          step: function (now) {
            var data = Math.round(now);
            $(this)
              .find(".percent")
              .html(data + "%");
          },
        }
      );
    });
  }

  // 2. Chạy animation cho Slide đầu tiên khi trang vừa tải xong
  // Sử dụng setTimeout nhỏ để đảm bảo Slick Slider đã render xong DOM
  setTimeout(function () {
    // Tìm slide đang active (thường Slick thêm class .slick-active)
    var $firstSlide = $(".slider .slick-active");
    runAnimation($firstSlide);
  }, 100);

  // 3. Xử lý khi chuyển Slide (Sự kiện của Slick Carousel)
  $(".slider").on("afterChange", function (event, slick, currentSlide) {
    // Lấy element của slide hiện tại đang hiển thị
    var $currentSlide = $(slick.$slides[currentSlide]);

    // SỬA LỖI 3: Gọi hàm runAnimation để thanh bar chạy lại hiệu ứng
    runAnimation($currentSlide);
  });

  // Tùy chọn: Reset các slide khác về 0 khi bắt đầu chuyển để lần sau quay lại nó sẽ chạy lại từ đầu
  $(".slider").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      var $nextSlideEl = $(slick.$slides[nextSlide]);
      $nextSlideEl.find(".progress-fill").css("width", "0%");
      $nextSlideEl.find(".progress-number-mark").css("left", "0%");
    }
  );
});

// (function($) {
//     'use strict'

//     // Animated Prograssbar
//     $("[progress-bar]").each(function () {
//     $(this)
//         .find(".progress-fill")
//         .animate(
//         {
//             width: $(this).attr("data-percentage"),
//         },
//         2000
//         );

//     $(this)
//         .find(".progress-number-mark")
//         .animate(
//         { left: $(this).attr("data-percentage") },
//         {
//             duration: 2000,
//             step: function (now, fx) {
//             var data = Math.round(now);
//             $(this)
//                 .find(".percent")
//                 .html(data + "%");
//             },
//         }
//         );
//     });
// })(jQuery)
