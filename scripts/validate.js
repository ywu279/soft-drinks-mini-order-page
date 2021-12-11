function validateOrder(e) {
    e.preventDefault();

    var valid = true;

    if ($("#tip").val() === "") {
        $("#tipError").text("Please select or enter a tip");
        valid = false;
    }

    if (!$(":radio").is(":checked")) {
        $("#paymentMethodError").text("Please select a payment method");
        valid = false;
    }

    let nameLength = $("#fullName").val().length;
    if (nameLength < 1 ||  nameLength > 100) {
        $("#fullNameError").text("Full name length should be between 1 and 100");
        valid = false;
    }

    let phoneLength = $("#phone").val().length;
    if (phoneLength < 10 ||  phoneLength > 11) {
        $("#phoneError").text("There should be 10-11 digits");
        valid = false;
    }

    let deliveryDate = Date.parse($("#deliveryDate").val())
    if (deliveryDate <= Date.now()) {
        $("#dateError").text("Delivery date should be after today");
        valid = false;
    }

    if (!$("#term").is(":checked")) {
        $("#termError").text("This box should be checked");
        valid = false;
    }

    if (valid) {
        alert("Thank you");

        displayOrderInfo();

        displayDrinksInfo();
    }
}


function cleanup() {
    $("#tipError").text("");
    $("#paymentMethodError").text("");
    $("#fullNameError").text("");
    $("#phoneError").text("");
    $("#dateError").text("");
    $("#termError").text("");
}


function displayOrderInfo() {
    let tip = document.orderInfo.tip.value
    document.querySelector(".displayOrderInfo li:first-child").textContent= "Tip Given: " + tip + " %";

    let paymentMethod = document.orderInfo.paymentMethod.value
    document.querySelector(".displayOrderInfo li:nth-child(2)").textContent = "Payment Choice: " + paymentMethod;

    let fullName = document.orderInfo.fullName.value
    document.querySelector(".displayOrderInfo li:nth-child(3)").textContent = "Full Name: " + fullName;

    let phone = document.orderInfo.phone.value
    document.querySelector(".displayOrderInfo li:nth-child(4)").textContent = "Phone: " + phone;

    let deliveryDate = document.orderInfo.deliveryDate.value
    document.querySelector(".displayOrderInfo li:nth-child(5)").textContent = "Delivery Date: " + deliveryDate;
}


function displayDrinksInfo() {
    for(let n = 0; n < $(".rows ul").length; n++) {
        let quantity = $(".inCart").eq(n).text();
        let itemName = $(".itemName").eq(n).text();
        if (quantity != 0) {
          let li = document.createElement("li");
          li.textContent = quantity + " " + itemName;
          $(".displayDrinksInfo").append(li);
        }
    };
}
