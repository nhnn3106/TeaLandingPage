import { partnerLogoBasePath, partnerLogos, productList } from "./data.js";

// nav
$(function () {
  // hide show nav
  $(".navbar").hidescroll();

  const toggleBtn = $("#toggle_btn");
  const dropdownMenu = $(".dropdown-menu");

  toggleBtn.click(function () {
    dropdownMenu.toggleClass("open");
  });
});

// partner-logo
$(function () {
  const container = document.getElementById("partner-logo-list");
  partnerLogos.forEach((logo) => {
    const img = document.createElement("img");
    img.src = partnerLogoBasePath + logo.fileName;
    img.alt = logo.alt;
    img.classList.add("logo-ticker-image");
    container.appendChild(img);
  });
});

// products
$(function () {
  $("li:first").addClass("activeTab");

  $("li").on("click", function () {
    $("li").removeClass("activeTab");
    $(this).addClass("activeTab");
  });

  $("#products-tabs").responsiveTabs({
    animation: "slide",
  });
});

// Best Sellers
$(function () {
  $(".slider").slick({
    autoplay: true,
    dots: true,
  });
});

// Stats
$(function () {
  // Kiểm tra xem thư viện đã load chưa để tránh lỗi
  if (typeof window.counterUp === "undefined") {
    console.error("Thư viện CounterUp2 chưa được load!");
    return;
  }

  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      // intersectionRatio > 0 đảm bảo phần tử thực sự xuất hiện
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 1000,
          delay: 16,
        });
        el.classList.add("is-visible");
      }
    });
  };

  // Threshold 0.5: Khi lướt thấy 50% số thì bắt đầu chạy
  const IO = new IntersectionObserver(callback, { threshold: 0.5 });

  // Chọn đúng class .counter trong span
  const els = document.querySelectorAll(".counter");
  els.forEach((node) => IO.observe(node));
});
