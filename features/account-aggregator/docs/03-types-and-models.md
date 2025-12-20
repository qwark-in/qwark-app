# 🧩 Types and Models

This document describes all the **TypeScript types** and **data models** used throughout the Account Aggregator (AA) integration with **CAMSFinserv**.

---

| Category                                                       | Description                                                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [**Types**](/packages/data/src/api/aa/types.ts)                | TypeScript interfaces used for API calls, requests and responses.                                                   |
| [**Models** ](/packages/data/src/models/account-aggregator.ts) | TypeScript interfaces that represent AA domain entities used in the zustand store dedicated for AA consent journey. |

### The models for zustand store are largely just a derivation from the types defined for handling APIs.
