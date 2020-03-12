article_title: How to Place Orders for Stock Instruments

## Introduction

This article demonstrates how to place order for `Stock` instruments.

The below interactive order placement tool is generated using the sample in the repository located here: <a href="https://github.com/gidven/saxo-openapi-guide/tree/master/src/js/order_placement">view standalone code sample on GitHub</a>

Follow these steps to run the sample:

1. Grab a 24-hour token from Saxo's developer portal and plug it into the input box. This will allow the JS sample to connect to the OpenAPI.
2. Pick your instrument and order type.
3. Adjust the parameters of your order by directly changing the JSON object in the window below.

!!! note
    The `AccountKey` is automatically added to the JSON request by the sample using the `/port/v1/accounts/me/` endpoint.

## Sample:


{!./src/js/order_placement/index.html!}
<script>{!./src/js/order_placement/boilerplate.js!}</script>
<script>{!./src/js/order_placement/demo.js!}</script>