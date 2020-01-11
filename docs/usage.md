# Using the OpenAPI Guide

## Structure

The individual sections in this guide are organised as much as possible in **chronological order**, taking you from the initial steps all the way to fully-fledged OpenAPI interactions. Although some of the articles might not directly apply to your use-case, we recommend starting 'at the top' and clicking/skimming through each of the included articles using the `Next` navigation button in the bottom right of every page.

Every article is pre-faced by an **Abstract** providing a succinct summary of the artcile's contents. Important concepts, pitfalls, or useful notes are exhibited using (collapsable) notes, info boxes, and warnings.

!!! abstract
    This article explains how the OpenAPI guide is intended to be used and what features it includes, such as multi-language code blocks.

??? info "This is a collapsable block containing additional information"
    Blocks such as these provide supplementary context and are not necessarily required to be read in order to understand the concept being discussed.

!!! warning "Take care when you see these blocks!"
    Warning blocks like this one inform the reader that the topic under discussion might result in an adverse outcome if the reader applies the presented code or concepts incorrectly.

## Sample Code

Where possible, we provide **concise, stand-alone code samples** in numerous programming languages to illustrate concepts with real-life code (see below). We fully expect you to copy the provided samples and try them yourself - we actually encourage this! Please administer proper due diligence if you are planning to use any of this code in production. We **cannot provide guarantees** for the correctness of the included samples (see [the Disclaimer](disclaimer.md)).

If required, certain lines in the code blocks will be **highlighted** in case they require special attention such as adding an access token, or if the line is particularly important in the context of the article. If you copy sample code, please double-check the highlighted lines because it could be the reason your code won't run directly 'out of the box'. If you find an error in our code, feel free to send [our support](support.md) a message!

The below sample code demonstrates a simple `GET` request to the `/isalive` endpoint of the Chart service group, which constitutes a basic diagnostics check to ensure endpoints included in the `/openapi/chart/` collection are up-and-running. For demonstration purposes, each code sample highlights the location in the code where the `Host` header is defined. The OpenAPI is a RESTful Web API based entirely on HTTP methods, so all code blocks will typically include generic, language-agnostic HTTP code as the primary example:


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
