# ⚙️ Implementation Details & Gotchas

This document outlines key **technical nuances**, **implementation considerations**, and **edge cases** to keep in mind when working with the **Account Aggregator (AA)** consent flow integrated with **CAMSFinserv**.

---

### 1. Consent Handles from Init Call

- The **init API** returns **two consent handles** — one corresponding to `bank` and another to `eq_mf_etf_others`.
- Either of these consent handles can be used to **create a session**, depending on the user’s selected financial entities.

---

### 2. Session Management

- The `session_id` obtained after session creation must be **persisted and reused** until it expires.
- Currently, there is **no dedicated API** to check session validity.
- The `getConsentDetails` API is used as a **proxy** to verify whether the `session_id` is still active.
- If the `getConsentDetails` call fails due to an invalid or expired session, a **new session** should be created, and the `session_id` value should be **updated in storage**.

---

### 3. Discovery Logic for Mutual Funds and Stocks

- When the user selects **Mutual Funds** or **Stocks** during entity selection, discovery is triggered across **all available FIPs** fetched from the `getFipList` API.
- The **FIP list** for Mutual Funds and Stocks is fetched **only when those entities are selected**, avoiding unnecessary API calls.

---

### 4. Conditional Flow without Bank Selection

- If the user **does not select any Bank accounts**, and only selects **Mutual Funds**, **Stocks**, or both:
  - The flow **skips the bank consent step**.
  - The app directly transitions to the **Discovery screen**.
  - **FIP fetching and discovery** for Mutual Funds and Stocks occur **in the background**.

---
