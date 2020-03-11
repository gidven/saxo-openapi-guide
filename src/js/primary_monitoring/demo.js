﻿/*jslint this: true, browser: true, for: true, long: true */
/*global window console WebSocket accountKey run processError */

var connection;

/**
 * This is an example of getting the trading settings of an instrument.
 * @return {void}
 */
function createConnection() {
    var accessToken = document.getElementById("idBearerToken").value;
    var contextId = encodeURIComponent(document.getElementById("idContextId").value);
    var streamerUrl = "wss://gateway.saxobank.com/sim/openapi/streamingws/connect?authorization=" + encodeURIComponent("BEARER " + accessToken) + "&contextId=" + contextId;

    connection = new WebSocket(streamerUrl);
    document.getElementById("idResponse").innerText = "Connection created. ReadyState: " + connection.readyState;
    // Documentation on readyState: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    // 0 = CONNECTING, 1 = OPEN
}

/**
 * This is an example of getting the trading settings of an instrument.
 * @return {void}
 */
function startListener() {

    function parseStreamingMessage(data) {
        try {
            var message = new DataView(data);
            var bytes = new Uint8Array(data);
            var messageId = message.getInt8();
            var refBeginIndex = 10;
            var refIdLength = message.getInt8(refBeginIndex);
            var refId = String.fromCharCode.apply(String, bytes.slice(refBeginIndex + 1, refBeginIndex + 1 + refIdLength));
            var payloadBeginIndex = refBeginIndex + 1 + refIdLength;
            var payloadLength = message.getUint32(payloadBeginIndex + 1, true);
            var segmentEnd = payloadBeginIndex + 5 + payloadLength;
            var payload = String.fromCharCode.apply(String, bytes.slice(payloadBeginIndex + 5, segmentEnd));
            var block = JSON.parse(payload);
            console.log("Message " + messageId + " parsed with referenceId " + refId + " and payload: " + payload);
            block.ReferenceId = refId;
            block.MessageID = messageId;
            switch (refId) {
            case "MyTradeLevelChangeEvent":
                document.getElementById("idResponse").innerText = "Streaming message received: " + payload;
                break;
            case "_heartbeat":
                break;
            default:
                console.log("No processing implemented for message with reference " + refId);
            }
            return {
                "segmentEnd": segmentEnd,
                "messages": block
            };
        } catch (error) {
            console.error("Parse message failed: " + error);
        }
    }

    connection.onmessage = function (event) {
        // Documentation on message format: https://www.developer.saxo/openapi/learn/plain-websocket-streaming#PlainWebSocketStreaming-Receivingmessages
        var reader = new FileReader();
        console.log("Streaming message received");
        reader.readAsArrayBuffer(event.data);
        reader.onloadend = function () {
            var beginAt = 0;
            var data = reader.result;
            var parsedMessage;
            do {
                parsedMessage = parseStreamingMessage(data);
                beginAt = parsedMessage.segmentEnd;
                data = data.slice(beginAt);
            } while (data.byteLength > 0);
        };
    };
    document.getElementById("idResponse").innerText = "Connection subscribed to events. ReadyState: " + connection.readyState;
}

/**
 * This is an example of getting the trading settings of an instrument.
 * @return {void}
 */
function subscribe() {
    var data = {
        "ContextId": encodeURIComponent(document.getElementById("idContextId").value),
        "ReferenceId": "MyTradeLevelChangeEvent"
    };

    fetch("https://gateway.saxobank.com/sim/openapi/root/v1/sessions/events/subscriptions", {
        "method": "POST",
        "headers": {
            "Authorization": "Bearer " + document.getElementById("idBearerToken").value,
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    });
    document.getElementById("idResponse").innerText = "Subscription created. ReadyState: " + connection.readyState;
}

/**
 * This is an example of making the current app primary, so real time prices can be shown. Other apps are notified and get delayed prices.
 * @return {void}
 */
function becomePrimary() {
    fetch(
        "https://gateway.saxobank.com/sim/openapi/root/v1/sessions/capabilities",
        {
            "headers": {
                "Authorization": "Bearer " + document.getElementById("idBearerToken").value,
                "Content-Type": "application/json; charset=utf-8"
            },
            "body": JSON.stringify({
                "TradeLevel": "FullTradingAndChat"
            }),
            "method": "PUT"
        }
    ).then(function (response) {
        if (response.ok) {
            document.getElementById("idResponse").innerText = "Requested to become primary";
        } else {
            processError(response);
        }
    }).catch(function (error) {
        processError(error);
    });
}

document.getElementById("idContextId").value = "MyApp_" + Date.now();
document.getElementById("idBtnCreateConnection").addEventListener("click", function () {
    run(createConnection);
});
document.getElementById("idBtnStartListener").addEventListener("click", function () {
    run(startListener);
});
document.getElementById("idBtnSubscribe").addEventListener("click", function () {
    run(subscribe);
});
document.getElementById("idBtnBecomePrimary").addEventListener("click", function () {
    run(becomePrimary);
});
