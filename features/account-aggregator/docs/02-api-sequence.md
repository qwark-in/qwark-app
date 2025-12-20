# ⚙️ API Sequence: CAMSFinserv Account Aggregator Flow

This document outlines the **exact sequence of API calls** made during the Account Aggregator (AA) linking process using CAMSFinserv.

Each call depends on the previous one — the flow moves only when required identifiers (`consent_handles`, `session_id`, etc.) are available.

---

### 1. **Select Entities** → User will select which entities to link from the following.

- Bank accounts
- Mutual Funds
- Stocks

---

### 2. **Get Fip List** → Fetch list of fips supported by CAMSFinsev AA

Endpoint: **`GET /v1/fips`**

Implementation: [`useFetchFipList.ts`](/packages/data/src/api/aa/useFetchFipList.ts)

Triggered From: [`select-banks.tsx`](<../../../app/(app)/account-aggregator/select-banks.tsx>)

Response Example:

```ts
{
    "status": "ok",
    "data": {
        "fips": [
            {
                "fip_id": "ICICI-FIP",
                "fip_name": "ICICI Bank",
                "popular_bank": true,
                "asset_class_id": "BANK"
            },
            {
                "fip_id": "AUBank-FIP",
                "fip_name": "AU Small Finance Bank",
                "popular_bank": false,
                "asset_class_id": "BANK"
            },
            ...

        ]
    }
}
```

---

### 3. **Init Call** → After getting the fip list, the user shall select the bank accounts which are to be connected to the app. After making the selections, the init api call is made to generate consent handles.

Endpoint:
**`POST /v1/init`**

Implementation: [`useFIUInit.ts`](/packages/data/src/api/aa/useFIUInit.ts)

Triggered From: [`useInit.ts`](../hooks/useInit.ts). The `useInit.ts` is custom hook made for abstracting away the main init call. It is then used in [`select-banks.tsx`](<../../../app/(app)/account-aggregator/select-banks.tsx>)

Request Example:

```ts
{
    "mobile_number": "97379XXXXX",
    "pan": "ABCDE1234E",
    "fip_ids": ["ICICI-FIP", "CAMSRTAFIP", "CDSLFIP"]
}
```

Response Example:

```ts
{
    "status": "ok",
    "data": {
        "consent_handles": [
            {
                "fip_class": "BANK",
                "consent_handle": "c9c969d4-a698-4de4-9296-6cf5cdee0ace"
            },
            {
                "fip_class": "EQ_MF_ETF_OTHERS",
                "consent_handle": "76bbcc94-6a70-4cf5-bf51-e18556531736"
            }
        ]
    }
}
```

### 4. **Create Session** → Initialize CAMS session using consent handles. Session is created using following api calls.

1.  Trigger AA OTP: This will trigger an OTP request which will be to the user's mobile.

    Endpoint: **`POST /v1/auth/create`**

    Implementation: [`useTriggerAuthOTP.ts`](/packages/data/src/api/aa/useTriggerAuthOTP.ts)

    Triggered From: [`LinkAccountsBottomSheet.tsx`](../components//bottom-sheets//LinkAccountsBottomSheet.tsx) & [`create-session.tsx`](<../../../app/(app)/account-aggregator/create-session.tsx>)

    Request Example:

    ```ts
    {
        "mobile_number": "97379XXXXX",
        "consent_handle": "c9c969d4-a698-4de4-9296-6cf5cdee0ace"
    }
    ```

    Response Example:

    ```ts
    {
        "status": "ok",
        "data": null
    }
    ```

2.  Verify AA OTP: This will verify the OTP received on the user's mobile.

    Endpoint: **`POST /v1/auth/validate`**

    Implementation: [`useValidateAuthOTP.ts`](/packages/data/src/api/aa/useValidateAuthOTP.ts)

    Triggered From: [`LinkAccountsBottomSheet.tsx`](../components//bottom-sheets//LinkAccountsBottomSheet.tsx) & [`create-session.tsx`](<../../../app/(app)/account-aggregator/create-session.tsx>)

    Request Example:

    ```ts
    {
        "mobile_number": "97379XXXXX",
        "consent_handle": "c9c969d4-a698-4de4-9296-6cf5cdee0ace",
        "otp": "123456"
    }
    ```

    Response Example:

    ```ts
    {
        "status": "ok",
        "data": {
            "session_id": "246e09a1-8545-4865-ad73-e8d205be0ac5"
        }
    }
    ```

    > The received session_id is persisted and these requests are NOT made if a valid session is present in subsequent consent journeys.

---

### 5. **Discover Accounts** → Fetches a list of accounts discovered in the selected entities.

Endpoint: **`POST /v1/fip/discover`**

Implementation: [`useDiscoverAccounts.ts`](/packages/data/src/api/aa/useDiscoverAccounts.ts)

Triggered From: [`useDiscoverMultipleAccounts.ts`](/packages/data/src/api/aa/useDiscoverMultipleAccounts.ts). This is a custom hook which acts as a wrapper over main discover api to abstract away chaining of multiple discover api calls, one for each selected fip. It is then used in [`account-discovery.tsx`](<../../../app/(app)/account-aggregator/account-discovery.tsx>)

Request Example:

```ts
{
    "mobile_number": "9737927175",
    "pan": "EEJPM4774J",
    "fip_id": "ICICI-FIP",
    "session_id": "246e09a1-8545-4865-ad73-e8d205be0ac5",
    "consent_handle": "c9c969d4-a698-4de4-9296-6cf5cdee0ace"
}
```

Response Example:

```ts
{
     "status": "ok",
     "data": {
         "fip_name": "ICICI Bank",
         "accounts": [
             {
                 "fip_type": "DEPOSIT",
                 "account_type": "CURRENT",
                 "account_ref_number": "7f01a2c3b90608b154adae5320f80c19",
                 "account_number": "XXXXXXXX4849",
                 "account_link_ref": ""
             },
             {
                 "fip_type": "DEPOSIT",
                 "account_type": "SAVINGS",
                 "account_ref_number": "127fb8219492ecc7141d07ba4f4c960e",
                 "account_number": "XXXXXXXX8438",
                 "account_link_ref": ""
             }
         ]
     }
 }

```

> If any discovered account has `account_link_ref` value **_non-empty_**, that means the account is already linked to the CAMSFinserv AA eco-system.

---

### 6. **Link Accounts** → Link selected accounts to CAMFinserv AA

After the discovery of accounts, user will select the accounts that he/she wants to connect and track in the app. If the accounts are already linked with CAMSFinserv, there is no need for calling link accounts apis for those accounts. Only the unlinked accounts need to be linked to CAMSFinserv using the following apis.

1. Link Account: This will trigger an OTP request via the **FIP** to which the account belongs to.

   Endpoint:
   **`POST /v1/fip/link`**

   Implementation: [`useLinkAccounts.ts`](/packages/data/src/api/aa/useLinkAccounts.ts)

   Triggered From: [`AuthoriseBanksSliderItem.tsx`](../components/authorise-banks-slider/AuthoriseBanksSliderItem.tsx)

   Request Example:

   ```ts
   {
       "mobile_number": "97379XXXXX",
       "fip_id": "ICICI-FIP",
       "session_id": "246e09a1-8545-4865-ad73-e8d205be0ac5",
       "consent_handle": "c9c969d4-a698-4de4-9296-6cf5cdee0ace",
       "accounts": [
           {
               "account_number": "XXXXXXXX4849",
               "account_ref_number": "7f01a2c3b90608b154adae5320f80c19",
               "account_type": "CURRENT",
               "fip_type": "DEPOSIT"
           }
       ]
   }
   ```

   Response Example:

   ```ts
   {
       "status": "ok",
       "data": {
           "ref_number": "f636ea54-6eec-4140-a937-493be81d96d9"
       }
   }
   ```

   This `ref_number` is used in the subsequent link verify api as `account_ref_number`.

   ***

2. Link Account Verify: This will verify the OTP sent to the user via the FIP.

   Endpoint:
   **`POST /v1/fip/link/verify`**

   Implementation: [`useLinkAccountsVerify.ts`](/packages/data/src/api/aa/useLinkAccountsVerify.ts)

   Triggered From: [`AuthoriseBanksSliderItem.tsx`](../components/authorise-banks-slider/AuthoriseBanksSliderItem.tsx)

   Request Example:

   ```ts
   {
       "mobile_number": "97379XXXXX",
       "consent_handle": "c9c969d4-a698-4de4-9296-6cf5cdee0ace",
       "session_id": "246e09a1-8545-4865-ad73-e8d205be0ac5",
       "fip_id": "ICICI-FIP",
       "account_ref_number": "f636ea54-6eec-4140-a937-493be81d96d9",
       "otp": "123456"
   }
   ```

   Response Example:

   ```ts
   {
        "status": "ok",
        "data": {
            "accounts": [
                {
                    "fip_account_link_ref": "1ff21932-aef6-4538-a647-ce0425b132fe",
                    "fip_account_ref_number": "7f01a2c3b90608b154adae5320f80c19"
                }
            ]
        }
    }
   ```

   > The `fip_account_link_ref` and `fip_account_ref_number` are then used to identify the discovered account for which the link reference has been generated. This will be crucial for the next api call.

---

### 7. **Accept Consent** → Finalize consent and linkage

Endpoint: **`POST /v1/consent/accept`**

Implementation: [`useAcceptConsent.ts`](/packages/data/src/api/aa/useAcceptConsent.ts)

Triggered From: [`AuthoriseBanksSuccess.tsx`](../components/authorise-banks-slider/AuthoriseBanksSuccess.tsx)

Request Example:

```ts
{
     "mobile_number": "97379XXXXX",
     "consent_handle": "c9c969d4-a698-4de4-9296-6cf5cdee0ace",
     "session_id": "246e09a1-8545-4865-ad73-e8d205be0ac5",
     "fip_details_list": [
         {
             "fip_id": "ICICI-FIP",
             "fip_account_number": "XXXXXXXX4849",
             "fip_account_link_ref": "1ff21932-aef6-4538-a647-ce0425b132fe",
             "fip_account_ref_number": "7f01a2c3b90608b154adae5320f80c19",
             "fip_account_type": "CURRENT",
             "fip_type": "DEPOSIT"
         }
     ]
 }
```

Response Example:

```ts
{
     "status": "ok",
     "data": {
        "consent_id": "abcasdfsdaf-sadfasdf-sdfasdffaf"
     }
 }
```

---

### _Hereafter, the consent_id is saved in a persisted storage and used to fetch data from backend._

---
