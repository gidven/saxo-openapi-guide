# Retrieving Entity Data

??? abstract
    TODO: add abstract

    Endpoints showcased in this article:

    - `root/v1/user`
    - `port/v1/users/`
    - `port/v1/clients/`
    - `port/v1/accounts/`

---

Information about the three key entities that make up the client space in Saxo's systems is available in the OpenAPI on different endpoints located in the Root and Portfolio service groups.

The configuration of these entities is static for the most part, and cannot be changed by users directly. The defaults that are used for developer accounts on the Saxo Developer Portal is shown in the examples below. This setup closely follows what a (direct) client of Saxo would be configured with in the live environment.

!!! note
    The developer account client has a single associated user, and a single trading account with access to a limited subset of Saxo's entire instrument universe.

The endpoints discussed below generally come in three flavors, which allows you to interact with each resource in multiple ways:

1. A `.../me` endpoint, which automatically returns the relevant information that is associated *only* to the currently logged-in client (identified by the token used to authorize the request). Example: `port/v1/accounts/me`.
2. A `.../{identifier}` endpoint, which returns information about a specific user, client, or account entity using its unique ID. Example: `port/v1/accounts/MXt3pDqb5VEujcdqBV1cmQ==`.
3. A collection such as `port/v1/accounts/`, which returns all accounts linked to a client in a list structure.

## User Permissions

Before retrieving user, client, and account information from the Portfolio service group, let's first check the permissions of the currently logged-in user through the `root/v1/user` endpoint. This endpoint lives in the Root service group, which provides basic functionality for diagnostics, permissions, and session features. This service group does not require permissions in order to be used (i.e. any user can call these endpoints).

```HTTP tab="HTTP" hl_lines="3"
GET /sim/openapi/root/v1/user HTTP/1.1
Host: gateway.saxobank.com
Authorization: Bearer [token]
Accept: */*
Cache-Control: no-cache
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

The response from the OpenAPI contains the below JSON object. Notice that the role assigned to this standard demo user (the developer account in the simulation system) is `"Default"`, which enables the `"OAPI.OP.View"` operation required to use the portfolio endpoints below and pull out additional client details. Furthermore, this user has access right flag `"CanTrade"` set to `true`, so it can place orders on the accounts owned by this client.

```JSON hl_lines="5 12"
{
  "AccessRights": {
    ...
    "CanTakePriceSession": true,
    "CanTrade": true,
    ...
  },
  "ClientId": 9073876,
  "Operations": [
    ...
    "OAPI.OP.ViewOwnedClients",
    "OAPI.OP.View",
    ...
  ],
  "Roles": [
    "OAPI.Roles.Default"
  ],
  "UserId": 9073876
}
```

## Retrieving Details on Each Entity

The procedure to obtain details on the configuration of users, clients, and accounts is very similar. All of the below functionality is provided by the Portfolio service group, which not only contains configuration data for static entities, but also provides functionality to retrieve dynamic client data such as positions, orders, exposures, and account balances (which will be discussed in a later article).

The below table describes each of the provided endpoints and their use cases. For most intends and purposes, the `.../me` endpoint suffices as it provides details that are directly relevant to the context of a single end-client user. The endpoints that return data by ID or in bulk are intended to be used by top-level client users to manage their hierarchy, although a single end-client user can obtain their data through these endpoints as well.
            
| Endpoint                             | Functionality                                                          |
|                                      |                                                                        |
| `port/v1/users/me`                  | Returns user data for currently logged-in user.                        |
| `port/v1/users/{ID}`                | Returns user data by specific ID.                                      |
| `port/v1/users/?ClientKey={KEY}`    | Return a list of all users associated to the provided client key.      |
| `port/v1/clients/me`                | Returns client data for client that the logged-in user belongs to.     |
| `port/v1/clients/{ID}`              | Returns client data by specific ID.                                    |
| `port/v1/clients/?OwnerKey={KEY}`   | Return a list of clients owned by the provided owner key (client key). |
| `port/v1/accounts/me`               | Returns all accounts for client that the logged-in user belongs to.    |
| `port/v1/accounts/{ID}`             | Returns account data by specific ID.                                   |
| `port/v1/accounts/?ClientKey={KEY}` | Return a list of all accounts linked to the provided client key.       |

## Examples

### User Details

Continuing the above example with the basic end-client user, let's retrieve data on the user by sending the below request to the OpenAPI.

```HTTP tab="HTTP"
GET /sim/openapi/port/v1/user/me HTTP/1.1
Host: gateway.saxobank.com
Authorization: Bearer [token]
```

!!! note
    The above request (and all following requests) are abbreviated for demonstration purposes.

The response from the OpenAPI contains the below JSON object. Notice that this entity contains some important configuration such as localization settings, asset types that this user is allowed to trade, and whether the client is enabled to retrieve market data through the OpenAPI (details will be discussed in a later article).

```JSON hl_lines="4 7 13"
{
  "ClientKey": "X1JlUyeXTMK3mBxzd-D2UA==",
  "Culture": "en-US",
  "Language": "en",
  "LastLoginStatus": "Successful",
  "LastLoginTime": "2020-02-06T13:12:45.560000Z",
  "LegalAssetTypes": [
    "FxSpot",
    "Stock",
    "CfdOnIndex",
    ...
  ],
  "MarketDataViaOpenApiTermsAccepted": true,
  "Name": "User Name",
  "TimeZoneId": 26,
  "UserId": "9073876",
  "UserKey": "X1JlUyeXTMK3mBxzd-D2UA=="
}
```

### Client Details

In a similar vein, let's get more info on the client that this user belongs to through the below request.

```HTTP tab="HTTP"
GET /sim/openapi/port/v1/clients/me HTTP/1.1
Host: gateway.saxobank.com
Authorization: Bearer [token]
```

The below details are returned by the OpenAPI. Notice that accessible assets are controlled on the client level too, and the response includes further configuration such as position netting settings, the default currency, and the account protection limit (which is enforced on the client level as aggregate of the entire client's holdings). These concepts will be discussed in-depth in later articles.

```JSON hl_lines="2 5 20"
{
  "AccountValueProtectionLimit": 500000,
  "ClientId": "9073876",
  ...
  "DefaultCurrency": "EUR",
  "ForceOpenDefaultValue": false,
  "IsMarginTradingAllowed": true,
  "IsVariationMarginEligible": false,
  "LegalAssetTypes": [
    "FxSpot",
    "Stock",
    "CfdOnIndex",
    ...
  ],
  "LegalAssetTypesAreIndicative": false,
  "MarginCalculationMethod": "Default",
  "MarginMonitoringMode": "Margin",
  "MutualFundsCashAmountOrderCurrency": "Instrument",
  "Name": "User Name",
  "PositionNettingMode": "EndOfDay",
  "SupportsAccountValueProtectionLimit": true
}
```

### Account Details

And finally, let's check which accounts belong to this client. Notice the trailing slash at the end of the URI. In true REST fashion, this resource is a collection of account objects and therefore ends in a trailing slash (as opposed to the above examples which only return single user or client objects).

```HTTP tab="HTTP"
GET /sim/openapi/port/v1/accounts/me/ HTTP/1.1
Host: gateway.saxobank.com
Authorization: Bearer [token]
```

The API response contains a lot of settings and configurations that will be discussed in later articles. To highlight a few: accounts can be restricted to certain assets like the users and clients, and some important configuration is included such as the account currency, display name, and type.

!!! note
    Endpoints that return collections of objects generally follow the same structure with a `"Data"` field at the root of the returned JSON object.

```JSON
{
  "Data": [
    {
      "AccountGroupKey": "X1JlUyeXTMK3mBxzd-D2UA==",
      "AccountId": "9073876",
      "AccountKey": "X1JlUyeXTMK3mBxzd-D2UA==",
      "AccountSubType": "None",
      "AccountType": "Normal",
      "Active": true,
      "CanUseCashPositionsAsMarginCollateral": true,
      "CfdBorrowingCostsActive": false,
      "ClientId": "9073876",
      "ClientKey": "X1JlUyeXTMK3mBxzd-D2UA==",
      "CreationDate": "2018-11-01T13:55:34.000000Z",
      "Currency": "EUR",
      "CurrencyDecimals": 2,
      "DirectMarketAccess": false,
      "DisplayName": "My default account",
      "IndividualMargining": false,
      "IsCurrencyConversionAtSettlementTime": false,
      "IsMarginTradingAllowed": true,
      "IsShareable": false,
      "IsTrialAccount": true,
      "LegalAssetTypes": [
        "FxSpot",
        "Stock",
        "CfdOnIndex",
        ...
      ],
      "MarginCalculationMethod": "Default",
      "Sharing": [
        "NoSharing"
      ],
      "SupportsAccountValueProtectionLimit": false,
      "UseCashPositionsAsMarginCollateral": true
    },
    {
      "AccountId": "9073876_USD",
      "AccountType": "Normal",
      ...
    },
    ...
  ]
}
```