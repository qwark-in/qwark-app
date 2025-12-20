# 🏦 Account Aggregator (CAMSFinserv) Integration

## 📘 Overview

This document explains the flow, data models, and implementation details of the **Account Aggregator (AA)** feature in our app.  
The goal is to enable users to link their financial entities — such as **bank accounts, mutual funds, and other investment accounts** — via the **CAMSFinserv** Account Aggregator ecosystem.

Read more on AA Ecosystem [here.](https://sahamati.org.in/what-is-account-aggregator/)

## 🎯 Purpose

This module:

1. Initiates user consent journey with CAMSFinserv.
2. Creates a session for discovery and linking.
3. Fetches discoverable financial accounts.
4. Allows the user to link selected accounts.
5. Accepts the consent to finalize linking.

## 🧭 High-Level Flow

_**(Add 'Markdown Preview Mermaid Support' extension in VSCode)**_

```mermaid
sequenceDiagram
    participant User
    participant App
    participant CAMSFinserv

    User->>App: Starts linking flow<br>(Selects entities)
    App->>CAMSFinserv: Get list of supported FIPs
    CAMSFinserv-->>App: Returns list of supported FIPs


    User->>App: Selects banks to link

    App->>CAMSFinserv: Init call (request consent handles)
    CAMSFinserv-->>App: Returns consent handles (bank, eq_mf_others)
    App->>CAMSFinserv: Create session using consent handles
    CAMSFinserv-->>App: Returns sessionId
    App->>CAMSFinserv: Discover accounts (with sessionId)
    CAMSFinserv-->>App: List of available accounts
    App->>CAMSFinserv: Get Consent Details
    CAMSFinserv-->>App: Consent Details
    User->>App: Selects accounts to link
    App->>CAMSFinserv: Link accounts API
    CAMSFinserv-->>App: Returns linked account reference numbers
    App->>CAMSFinserv: Accept consent API
    CAMSFinserv-->>App: Success response
```
