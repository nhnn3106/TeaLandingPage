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
