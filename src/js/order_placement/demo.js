/*jslint this: true, browser: true, for: true, long: true */
/*global window console accountKey run processError */

var orderSequenceNumber = 1;
var lastOrderId = 0;

/**
 * This is an example of getting the trading settings of an instrument.
 * @return {void}
 */
function getConditions() {
    var newOrderObject = JSON.parse(document.getElementById("idNewOrderObject").value);
    newOrderObject.AccountKey = accountKey;
    fetch(
        "https://gateway.saxobank.com/sim/openapi/ref/v1/instruments/details?Uics=" + newOrderObject.Uic + "&AssetTypes=" + newOrderObject.AssetType + "&AccountKey=" + newOrderObject.AccountKey + "&FieldGroups=OrderSetting",
        {
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + document.getElementById("idBearerToken").value
            },
            "method": "GET"
        }
    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (responseJson) {
                // Test for SupportedOrderTypes and TickSizeScheme
                document.getElementById("idResponse").innerText = "Successful request with response: \n" + JSON.stringify(responseJson.Data);
            });
        } else {
            processError(response);
        }
    }).catch(function (error) {
        processError(error);
    });
}

/**
 * This is an example of getting the costs of this order.
 * @return {void}
 */
function getOrderCosts() {
    // https://www.developer.saxo/openapi/learn/mifid-2-cost-reporting
    throw "Order costs are not implemented yet.";
}

/**
 * This is an example of getting the Key Information Document of this instrument.
 * @return {void}
 */
function getKid() {
    throw "KID is not implemented yet.";
}

/**
 * This is an example of an order validation.
 * @return {void}
 */
function preCheckNewOrder() {
    // Bug: Preview doesnt check for limit outside market hours
    var newOrderObject = JSON.parse(document.getElementById("idNewOrderObject").value);
    newOrderObject.AccountKey = accountKey;
    fetch(
        "https://gateway.saxobank.com/sim/openapi/trade/v2/orders/precheck",
        {
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + document.getElementById("idBearerToken").value
            },
            "body": JSON.stringify(newOrderObject),
            "method": "POST"
        }
    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (responseJson) {
                // Response must have PreCheckResult property being "Ok"
                document.getElementById("idResponse").innerText = "Successful request with response: \n" + JSON.stringify(responseJson);
            });
        } else {
            processError(response);
        }
    }).catch(function (error) {
        processError(error);
    });
}

/**
 * This is an example of placing a single leg order.
 * @return {void}
 */
function placeNewOrder() {
    var newOrderObject = JSON.parse(document.getElementById("idNewOrderObject").value);
    newOrderObject.AccountKey = accountKey;
    fetch(
        "https://gateway.saxobank.com/sim/openapi/trade/v2/orders",
        {
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                // https://www.developer.saxo/openapi/learn/rate-limiting
                "X-Request-ID": "Reference_Insert_" + orderSequenceNumber,  // Warning! Prevent error 409 (Conflict) from identical orders within 15 seconds
                "Authorization": "Bearer " + document.getElementById("idBearerToken").value
            },
            "body": JSON.stringify(newOrderObject),
            "method": "POST"
        }
    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (responseJson) {
                // Response must have an OrderId
                document.getElementById("idResponse").innerText = "Successful request with sequence " + response.headers.get("X-Request-ID") + " and response: \n" + JSON.stringify(responseJson);
                orderSequenceNumber += 1;
                lastOrderId = responseJson.OrderId;
            });
        } else {
            processError(response);
        }
    }).catch(function (error) {
        processError(error);
    });
}

/**
 * This is an example of updating a single leg order.
 * @return {void}
 */
function modifyLastOrder() {
    var newOrderObject = JSON.parse(document.getElementById("idNewOrderObject").value);
    newOrderObject.AccountKey = accountKey;
    newOrderObject.OrderId = lastOrderId;
    newOrderObject.Amout = newOrderObject.Amount * 2;
    fetch(
        "https://gateway.saxobank.com/sim/openapi/trade/v2/orders",
        {
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                "X-Request-ID": "Reference_Update_" + orderSequenceNumber,  // Warning! Prevent error 409 (Conflict) from identical orders within 15 seconds
                "Authorization": "Bearer " + document.getElementById("idBearerToken").value
            },
            "body": JSON.stringify(newOrderObject),
            "method": "PATCH"
        }
    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (responseJson) {
                // Response must have an OrderId
                document.getElementById("idResponse").innerText = "Successful request with sequence " + response.headers.get("X-Request-ID") + " and response: \n" + JSON.stringify(responseJson);
                orderSequenceNumber += 1;
            });
        } else {
            processError(response);
        }
    }).catch(function (error) {
        processError(error);
    });
}

/**
 * This is an example of removing an order from the book.
 * @return {void}
 */
function cancelLastOrder() {
    fetch(
        "https://gateway.saxobank.com/sim/openapi/trade/v2/orders/" + lastOrderId + "?AccountKey=" + accountKey,
        {
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + document.getElementById("idBearerToken").value
            },
            "method": "DELETE"
        }
    ).then(function (response) {
        if (response.ok) {
            response.json().then(function (responseJson) {
                // Response must have an OrderId
                document.getElementById("idResponse").innerText = "Successful request with response: \n" + JSON.stringify(responseJson);
            });
        } else {
            processError(response);
        }
    }).catch(function (error) {
        processError(error);
    });
}

document.getElementById("idBtnGetConditions").addEventListener("click", function () {
    run(getConditions);
});
document.getElementById("idBtnPreCheckOrder").addEventListener("click", function () {
    run(preCheckNewOrder);
});
document.getElementById("idBtnGetOrderCosts").addEventListener("click", function () {
    run(getOrderCosts);
});
document.getElementById("idBtnGetKid").addEventListener("click", function () {
    run(getKid);
});
document.getElementById("idBtnPlaceNewOrder").addEventListener("click", function () {
    run(placeNewOrder);
});
document.getElementById("idBtnModifyLastOrder").addEventListener("click", function () {
    run(modifyLastOrder);
});
document.getElementById("idBtnCancelLastOrder").addEventListener("click", function () {
    run(cancelLastOrder);
});
