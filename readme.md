# Walk-In Lead API Automation (Playwright)

This project automates the Walk-In Lead creation and verification flow using Playwright API testing.

## The test suite:

Creates a Walk-In Lead through the creation API

Verifies the lead appears in Today's Follow-Up listing API

Validates merge / non-merge scenarios.

# Installation

#### Clone the repository

git clone <repo-url>
cd casa_api_automation

#### Install dependencies

npm install

#### Install Playwright

npx playwright install




### Test Scenarios Covered
1. Create Walk-In Lead

Create a new lead

Verify lead appears in Today's Follow-Up listing

2. Merge Duplicate Lead

Create the same lead twice

Verify lead is merged correctly.

3. Do Not Merge Different Products

Create lead with product A

Create lead with product B

Verify both entries exist.





# Run command 

```
npx cross-env TEST_ENV=qa TENANT_ID=256 TENANT_TOKEN=5PnDslyp68DkFNh9jp9lJrGUhMXDulzX BU_ID=215 playwright test ```
