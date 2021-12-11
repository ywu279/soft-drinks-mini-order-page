$(document).on("submit", validateOrder);
$(document).on("reset", cleanup);


$("#tip").on("blur", function() {
    if ($(this).val() !== "") {
        $("#tipError").text("");
    }
})

$(":radio").on("blur", function() {
    if ($(this).is(":checked")) {
        $("#paymentMethodError").text("");
    }
})

$("#fullName").on("blur", function() {
    let nameLength = $("#fullName").val().length;
    if (nameLength >=1 && nameLength <= 100) {
        $("#fullNameError").text("");
    }
})

$("#phone").on("blur", function() {
    let phoneLength = $("#phone").val().length;
    if (phoneLength >=10 && phoneLength <= 11) {
        $("#phoneError").text("");
    }
})

$("#deliveryDate").on("blur", function() {
    let deliveryDate = Date.parse($("#deliveryDate").val());
    if (deliveryDate > Date.now()) {
        $("#dateError").text("");
    }
})

$("#term").on("blur", function() {
    if ($("#term").is(":checked")) {
        $("#termError").text("");
    }
})
