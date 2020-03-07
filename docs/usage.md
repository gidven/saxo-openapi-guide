article_title: Using the OpenAPI Guide

The aim of this guide is to be as readable as possible, while it at the same time provides in-depth discussions of each topic and comprehensive code samples. To keep things clean, side-topics are relegated to separate blocks in each article, and concise sample code is woven into each discussion using multi-language code blocks and line highlighting.

## Structure

The individual sections in this guide are organized as much as possible in **chronological order**, taking you from the initial steps all the way to s fully-fledged OpenAPI integration. Although some of the articles might not directly apply to your use-case, it is recommended to start 'at the top' and click/skim through each of the provided articles using the `Next` navigation button in the bottom right of each page.

Every article is pre-faced by an **Abstract** providing a succinct summary of the article's contents. Important concepts, pitfalls, or useful notes are exhibited using (collapsible) notes, info boxes, and warnings.

!!! abstract
    This article explains how the OpenAPI guide is intended to be used and what features it includes, such as multi-language code blocks.

??? info "This is a collapsible block containing additional information"
    Blocks such as these provide supplementary context and are not necessarily required to be read in order to understand the concept being discussed.

!!! warning "Take care when you see these blocks!"
    Warning blocks like this one inform the reader that the topic under discussion might result in an adverse outcome if the reader applies the presented code or concepts incorrectly.

## Usage of Links

This guide provides links to many online resources to offer as much context as possible. All links annotated by the [](http://home.saxo)-symbol link *away* from these pages and will take you to a different domain. All other links that are not annotated refer to pages on this website.

Example of an **external** link: [go to Saxo's Developer Portal](https://developer.saxo)

Example of an **internal** links: [visit the home page of this  site](index.md)

## Sample Code

Where possible, **concise, stand-alone code samples** are provided in various programming languages to illustrate concepts under discussion with real-life code (see below). This code is meant to be testable and you are welcome to run it, but do bear in mind that it should *only* be used for educational purposes. Please administer proper due diligence if you are planning to use any of the provided code in production. No guarantees are offered for the correctness of the included samples (see [the Disclaimer](disclaimer.md)).

If required, certain lines in the code blocks will be **highlighted** in case they require special attention such as adding an access token, or if the line is particularly important in the context of the article. When copying sample code, please double-check the highlighted lines because it could be the reason your code won't run 'out of the box'. If you find an error in the sample code, feel free to send [our support](support.md) a message!

The OpenAPI is a RESTful Web API based entirely on HTTP methods, so all code blocks will typically include a generic, language-agnostic HTTP sample.

The below sample code demonstrates a simple request to the `/root/v1/diagnostics/get` endpoint, which constitutes a basic check to verify that `GET` requests are working fine in the client application, and the OpenAPI correctly received your request. For illustration purposes, each code sample highlights the location in the code where the `Host` header is defined:

```HTTP tab="HTTP" hl_lines="2"
GET /sim/openapi/root/v1/diagnostics/get HTTP/1.1
Host: gateway.saxobank.com
Accept: */*
Accept-Encoding: gzip, deflate
Connection: Keep-Alive
```

```Python tab="Python" hl_lines="6"
import requests

r = request.request(
    url='/sim/openapi/root/v1/diagnostics/get'
    headers={
        'Host': 'gateway.saxobank.com'
        'Accept': '*/*'
        'Accept-Encoding': 'gzip, deflate'
        'Connection': 'Keep-Alive'
    }
)
```

This request results in the following HTTP 200 OK response, indicating that the diagnostics check passed successfully:

```HTTP
HTTP/1.1 200 OK
Date: Wed, 05 Feb 2020 17:51:52 GMT
Content-Length: 0
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Correlation: ##6a6f4979-f2b9-4d54-9712-9cf505e3bdc9#82
```