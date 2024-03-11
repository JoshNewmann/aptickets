document.addEventListener("DOMContentLoaded", function() {
    const paymentButtonSpan = document.getElementById("paymentButtonSpan");

    // Detect device type
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
    const isMobile = isIOS || isAndroid;
    const isDesktop = !isMobile;

    // Update button text based on device type
    if (isIOS) {
        paymentButtonSpan.textContent = "Card or Apple Pay";
    } else if (isAndroid) {
        paymentButtonSpan.textContent = "Card or Google Pay";
    } else if (isDesktop) {
        paymentButtonSpan.textContent = "Pay with Card";
    } else {
        paymentButtonSpan.textContent = "Card or Mobile Payment";
    }

    const cardLink = document.getElementById("cardlink");
    const otherWaysToPayUrl = "./alreadypaid/";

    cardLink.addEventListener("click", function() {
        window.location.href = otherWaysToPayUrl;
    });

});
