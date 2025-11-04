import { partnerLogoBasePath, partnerLogos, productList } from "./data.js";

$(function () {
  const container = document.getElementById("partner-logo-list");

  // partner-logo
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
