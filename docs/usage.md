# Using the OpenAPI Guide

## Structure

The individual sections in this guide are organized as much as possible in **chronological order**, taking you from the initial steps all the way to fully-fledged OpenAPI interactions. Although some of the articles might not directly apply to your use-case, it is recommended to start 'at the top' and click/skim through each of the provided articles using the `Next` navigation button in the bottom right of each page.

Every article is pre-faced by an **Abstract** providing a succinct summary of the article's contents. Important concepts, pitfalls, or useful notes are exhibited using (collapsible) notes, info boxes, and warnings.

!!! abstract
    This article explains how the OpenAPI guide is intended to be used and what features it includes, such as multi-language code blocks.

??? info "This is a collapsible block containing additional information"
    Blocks such as these provide supplementary context and are not necessarily required to be read in order to understand the concept being discussed.

!!! warning "Take care when you see these blocks!"
    Warning blocks like this one inform the reader that the topic under discussion might result in an adverse outcome if the reader applies the presented code or concepts incorrectly.

## Sample Code

Where possible, **concise, stand-alone code samples** are provided in various programming languages to illustrate concepts under discussion with real-life code (see below). This code is meant to be testable on your end, but do bear in mind that it should only be used for educational purposes. Please administer proper due diligence if you are planning to use any of this code in production. No guarantees are offered for the correctness of the included samples (see [the Disclaimer](disclaimer.md)).

If required, certain lines in the code blocks will be **highlighted** in case they require special attention such as adding an access token, or if the line is particularly important in the context of the article. When copying sample code, please double-check the highlighted lines because it could be the reason your code won't run directly 'out of the box'. If you find an error in the sample code, feel free to send [our support](support.md) a message!

The OpenAPI is a RESTful Web API based entirely on HTTP methods, so all code blocks will typically include a generic, language-agnostic HTTP sample.

The below sample code demonstrates a simple `GET` request to the `/isalive` endpoint of the Chart service group, which constitutes a basic diagnostics check to ensure endpoints included in the `/openapi/chart/` collection are up-and-running. For demonstration purposes, each code sample highlights the location in the code where the `Host` header is defined:

```HTTP tab="HTTP" hl_lines="2"
GET /sim/openapi/chart/isalive HTTP/1.1
Host: gateway.saxobank.com
Content-Type: text/plain; charset=UTF-8
Accept-Encoding: gzip, deflate
Connection: Keep-Alive
```

```Python tab="Python" hl_lines="6"
import requests

r = request.request(
    url='https://gateway.saxobank.com/sim/openapi/chart/isalive'
    headers={
        'Host': 'gateway.saxobank.com'
        'Content-Type': 'text/plain; charset=UTF-8'
        'Accept-Encoding': 'gzip, deflate'
        'Connection': 'Keep-Alive'
    }
)
```
