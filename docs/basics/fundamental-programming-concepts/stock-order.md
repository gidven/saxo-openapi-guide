# This is a test for placing a Stock order directly from the documentation

ajfhsiajhdsajbd

??? summary "JS Sample File"
    ```JavaScript
    {!https://gidven.github.io/saxo-example-code/order-placement/demo-order-placement.js!}
    ```

# step 1

asdiasdsuoad

## step 1.1

```HTTP tab="HTTP"
GET /sim/openapi/port/v1/accounts/me/ HTTP/1.1
Host: gateway.saxobank.com
Authorization: Bearer [access token]
```

asdsad

Token (from <a href="https://developer.saxobank.com/openapi/token" target="_blank">developer.saxobank.com/openapi/token</a>):<br />
<input type="text" id="idBearerToken" value="" placeholder="Paste token here" style="width: 100%" /><br />
Order object:<br />
<textarea id="idNewOrderObject" rows="8"  style="width: 100%">
    {   "OrderType": "Limit",
        "AssetType": "Stock",
        "BuySell": "Buy",
        "Amount": 100,
        "Uic": 112809,
        "OrderDuration": { "DurationType": "DayOrder" },
        "ManualOrder": false,
        "OrderPrice": 5
    }
</textarea><br />
# hello
<input type="button" value="Demo new order placement" onclick="javascript: demoNewOrder();" /><br />
<textarea id="idNewOrderResponse" rows="8"  style="width: 100%"></textarea>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" defer></script>
<script type="text/javascript" src="https://gidven.github.io/saxo-example-code/order-placement/boilerplate.js" defer></script>
<script type="text/javascript" src="https://gidven.github.io/saxo-example-code/order-placement/demo-order-placement.js" defer></script>

# the end!  