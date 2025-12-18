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

  const logoList = document.getElementById("partner-logo-list");
  if (logoList) {
    const originalContent = logoList.innerHTML;
    logoList.innerHTML = originalContent + originalContent;
  }
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

// Tất cả sản phẩm
$(function () {
  productList.map((product) => {
    $("#product-items-container").append(`
        <div data-filterable 
        data-filter-category=${product.category}
        class="relative col-span-3 overflow-hidden group hover:shadow-md">
            <div class="portfolio-item">
                <div>
                    <img src=${product.img} alt="product-img">
                    <div class="product-item-overlay">
                        <div class="product-details">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
  });

  $.fn.filterjitsu();

  // xử lí active tab
  function getAllUrlParam(url) {
    url = url || window.location.href;
    const param = {};

    const queryString = url.split("?")[1];
    if (!queryString) return param;

    const [key, value] = queryString.split("=");
    if (key) {
      param[key] = value ? value : "";
    }
    return param;
  }
  const urlParam = getAllUrlParam();

  $("#allProduct-filters a").removeClass("activeFilter");

  const category = urlParam["filter-category"];
  switch (category) {
    case "whitea":
      $("#f-whitetea").addClass("activeFilter");
      break;
    case "blacktea":
      $("#f-blacktea").addClass("activeFilter");
      break;
    case "oolong":
      $("#f-oolong").addClass("activeFilter");
      break;
    case "matcha":
      $("#f-matcha").addClass("activeFilter");
      break;
    default:
      $("#f-all").addClass("activeFilter");
  }
});
