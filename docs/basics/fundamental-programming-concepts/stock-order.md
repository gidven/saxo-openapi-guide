# This is a test for placing a Stock order directly from the documentation

Token (from <a href="https://developer.saxobank.com/openapi/token" target="_blank">developer.saxobank.com/openapi/token</a>):<br />

<input type="text" id="idOrderBearerToken" value="eyJhbGciOiJFUzI1NiIsIng1dCI6IkQ2QzA2MDAwMDcxNENDQTI5QkYxQTUyMzhDRUY1NkNENjRBMzExMTcifQ.eyJvYWEiOiI3Nzc3NyIsImlzcyI6Im9hIiwiYWlkIjoiMTA5IiwidWlkIjoiZzJXekR0UDZEVVR5TEN3aGphOXpodz09IiwiY2lkIjoiZzJXekR0UDZEVVR5TEN3aGphOXpodz09IiwiaXNhIjoiRmFsc2UiLCJ0aWQiOiIyMDAyIiwic2lkIjoiMjc1M2MyYWI3YTA2NDA5ZmE0OTU1Y2VhNzE3Y2U2YTIiLCJkZ2kiOiI4NCIsImV4cCI6IjE1ODEyNzc4NDYifQ.ou7x16_RcPSuwviQNbYHpc-FP0poQTKtWiUD9dYsukzfTXd9hzcMbwEYuvHS8ZvlFv7CrU56vB44cx7bF4vGMA" style="width: 100%" /><br />

Order object:<br />

<textarea id="idNewOrderObject" rows="8"  style="width: 100%">
{"OrderType": "Limit",
 "AssetType": "Stock",
    "BuySell": "Buy",
    "Amount": 100,
    "Uic": 112809,
    "OrderDuration": { "DurationType": "DayOrder" },
    "ManualOrder": false,
    "OrderPrice": 5
}
</textarea><br />

<input type="button" value="Demo new order placement" onclick="javascript: demoNewOrder();" /><br />


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script>

function demoNewOrder() {

    $.ajax({

            "dataType": "json",

            "type": "POST",

            "url": "https://gateway.saxobank.com/sim/openapi/trade/v2/orders",

            "data": document.getElementById("idNewOrderObject").value,

            "headers": {

                "Accept": "application/json; charset=utf-8",

                "Content-Type": "application/json; charset=utf-8",

                "Authorization": "Bearer " + document.getElementById("idOrderBearerToken").value

            },

            "success": function (response) {

                console.log(response);

            },

            "error": function (jqXhr) {

                console.error(jqXhr);

            }

        });

}

</script>