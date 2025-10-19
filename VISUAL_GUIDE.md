# 📸 Visual Step-by-Step Guide

## Part 1: Import the Workflow

### Step 1: Open n8n
![Open n8n](screenshot-placeholder)
- Go to: https://falco.app.n8n.cloud
- Login to your account

### Step 2: Import Workflow
![Import Menu](screenshot-placeholder)
- Click the **"+"** button (top left corner)
- Select **"Import from File"**
- Choose: `/Users/macbookair/Downloads/Hackathon/quantum-sync/n8n-workflow-base.json`
- Click **"Open"** or **"Import"**

### Step 3: Workflow Imported!
![Imported Workflow](screenshot-placeholder)
You'll see:
- **Webhook** node (blue)
- **Route by Type** node (switch)
- **Two branches** (HR and Finance)
- **Merge** node at the end
- **Respond to Webhook** node (final)

---

## Part 2: Add Email Nodes

### HR Branch - High Score Email

#### Step 1: Find the "Route by Score" node
![Route by Score](screenshot-placeholder)
- It has 3 outputs: High Score, Medium Score, Low Score

#### Step 2: Click "High Score" output
![Add Node](screenshot-placeholder)
- Click the **"+"** on the "High Score" output line

#### Step 3: Search for "Email"
![Search Email](screenshot-placeholder)
- Type "email" in the search box
- Select **"Send Email"** node

#### Step 4: Configure Email
![Email Config](screenshot-placeholder)
```
To Email: {{ $json.email }}
Subject: 🎉 Interview Invitation - {{ $json.name }}
Message:
Dear {{ $json.name }},

Congratulations! Your score: {{ $json.score }}/100

We'd like to invite you for an interview!

Best regards,
HR Team
```

#### Step 5: Add Credentials
![Email Credentials](screenshot-placeholder)
- Click **"Create New Credential"**
- Choose **Gmail** or **SMTP**
- Follow the OAuth flow or enter SMTP details
- Click **"Save"**

#### Step 6: Connect to Merge
![Connect to Merge](screenshot-placeholder)
- Drag from email node output to **"Merge"** node input

### Repeat for Medium and Low Score Emails

Just change the subject and message:

**Medium:**
```
Subject: 📋 Application Under Review
Message: We're reviewing your application (Score: {{ $json.score }}/100)
```

**Low:**
```
Subject: Application Update
Message: Thank you for your interest. We're moving forward with other candidates.
```

---

## Part 3: Finance Branch Emails

### Same process as HR, but 3 different emails:

**Auto-Approve (<$500):**
```
To: finance@yourcompany.com
Subject: ✅ Auto-Approved - {{ $json.invoiceNumber }}
Message: Invoice auto-approved. Amount: ${{ $json.amount }}
```

**Manager ($500-$5K):**
```
To: manager@yourcompany.com
Subject: 📋 Manager Approval Required
Message: Please review invoice {{ $json.invoiceNumber }} for ${{ $json.amount }}
```

**CFO (≥$5K):**
```
To: cfo@yourcompany.com
Subject: ⚠️ CFO Approval Required
Message: High-value invoice {{ $json.invoiceNumber }} for ${{ $json.amount }}
```

---

## Part 4: Optional - Add Slack Nodes

### Step 1: After each email node
![Add Slack](screenshot-placeholder)
- Click **"+"** after email node
- Search for **"Slack"**
- Select **"Slack"** node

### Step 2: Configure Slack
![Slack Config](screenshot-placeholder)
```
Channel: #hiring (for HR) or #finance (for Finance)
Message:
🆕 New Candidate: {{ $json.name }}
⭐ Score: {{ $json.score }}/100
```

### Step 3: Add Slack Credentials
![Slack OAuth](screenshot-placeholder)
- Click **"Create New Credential"**
- Click **"Connect my account"**
- Authorize n8n in Slack
- Select workspace
- Click **"Save"**

---

## Part 5: Optional - Add Google Sheets

### Step 1: After Slack (or Email)
![Add Sheets](screenshot-placeholder)
- Click **"+"**
- Search for **"Google Sheets"**
- Select it

### Step 2: Configure Sheets
![Sheets Config](screenshot-placeholder)
```
Operation: Append
Document: Select your spreadsheet
Sheet: "Candidates" (for HR) or "Invoices" (for Finance)
Columns: Map fields like name, email, score, etc.
```

### Step 3: Add Google Credentials
![Google OAuth](screenshot-placeholder)
- Click **"Create New Credential"**
- Click **"Connect my account"**
- Authorize n8n
- Click **"Save"**

---

## Part 6: Activate Workflow

### Step 1: Save Everything
![Save](screenshot-placeholder)
- Click **"Save"** button (top right)

### Step 2: Activate
![Activate Toggle](screenshot-placeholder)
- Find the **toggle switch** at the top
- Click it to turn **ON** (it should turn blue/green)
- You'll see "Workflow activated"

### Step 3: Copy Webhook URL
![Webhook URL](screenshot-placeholder)
- Click on the **"Webhook"** node
- Copy the webhook URL
- It should be: `https://falco.app.n8n.cloud/webhook/automation`

---

## Part 7: Test the Workflow

### From n8n (Test Button)

#### Step 1: Click Webhook Node
![Webhook Test](screenshot-placeholder)
- Click the **"Webhook"** node
- Click **"Test step"** or **"Listen for test event"**

#### Step 2: Send Test Request
![Test Request](screenshot-placeholder)
Open new terminal and run:
```bash
curl -X POST https://falco.app.n8n.cloud/webhook/automation \
  -H "Content-Type: application/json" \
  -d '{"type":"hr","data":{"name":"Test User","email":"test@test.com","skills":["React"],"experience":5,"resumeUrl":"https://test.com"}}'
```

#### Step 3: Watch Execution
![Execution](screenshot-placeholder)
- You'll see data flow through each node
- Green = success
- Red = error
- Click nodes to see their output

### From React App

#### Step 1: Open Test Page
![React Test Page](screenshot-placeholder)
- Go to: http://localhost:3000/test
- You'll see two test buttons

#### Step 2: Test HR
![Test HR Button](screenshot-placeholder)
- Click **"Test Connection"** for HR
- Wait for response
- Should show green success

#### Step 3: Test Finance
![Test Finance Button](screenshot-placeholder)
- Click **"Test Connection"** for Finance
- Wait for response
- Should show green success

#### Step 4: Check n8n Executions
![Executions Tab](screenshot-placeholder)
- Go back to n8n
- Click **"Executions"** tab (left sidebar)
- You'll see 2 successful executions

---

## Part 8: Test Real Submissions

### HR Dashboard Test

#### Step 1: Open HR Dashboard
![HR Dashboard](screenshot-placeholder)
- Go to: http://localhost:3000/hr

#### Step 2: Fill Form
![HR Form](screenshot-placeholder)
```
Name: John Doe
Email: your-email@example.com
Skills: React, TypeScript, Node.js
Experience: 5
Resume URL: https://example.com/resume.pdf
```

#### Step 3: Submit
![Submit Button](screenshot-placeholder)
- Click **"Submit Candidate"**
- Toast notification appears
- Check email inbox
- Check Slack #hiring (if configured)
- Check Google Sheet (if configured)

### Finance Dashboard Test

#### Step 1: Open Finance Dashboard
![Finance Dashboard](screenshot-placeholder)
- Go to: http://localhost:3000/finance

#### Step 2: Fill Form
![Finance Form](screenshot-placeholder)
```
Vendor: ACME Corp
Invoice Number: INV-2025-001
Amount: 1500
Date: 2025-10-19
Line Items: 
  Item 1
  Item 2
```

#### Step 3: Submit
![Submit Invoice](screenshot-placeholder)
- Click **"Submit Invoice"**
- Toast notification appears
- Check manager email (amount is $1500, so manager approval)
- Check Slack #finance
- Check Google Sheet

---

## Workflow Visual Map

```
┌─────────────────────────────────────────────────────┐
│             You Import This (Included)              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Webhook → Switch Router                           │
│             ├─ HR: Extract → Score → Route         │
│             └─ Finance: Extract → Fraud → Route    │
│                                                     │
│  Merge → Response                                  │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│            You Need to Add (15 min)                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│  After HR routing:                                 │
│    - 3 Email nodes (high/med/low)                  │
│                                                     │
│  After Finance routing:                            │
│    - 3 Email nodes (auto/manager/CFO)              │
│                                                     │
│  Optional:                                         │
│    - Slack nodes                                   │
│    - Google Sheets nodes                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Quick Reference

### Node Types You'll Use:
- 🔵 **Webhook** - Receives requests
- 🟢 **Switch** - Routes by condition
- 🟡 **Set** - Extracts data
- 🟠 **Code** - Runs JavaScript
- 🔴 **Email** - Sends emails
- 🟣 **Slack** - Posts to Slack
- ⚪ **Google Sheets** - Logs data
- 🟤 **Merge** - Combines branches
- ⚫ **Respond** - Sends response

### Keyboard Shortcuts:
- `Cmd/Ctrl + S` - Save workflow
- `Cmd/Ctrl + Enter` - Execute workflow
- `Space` - Quick add node
- `Delete` - Remove node
- `Cmd/Ctrl + Z` - Undo

---

## 🎯 Summary

1. **Import workflow** - 2 minutes
2. **Add 6 email nodes** - 15 minutes
3. **Add Slack** (optional) - 5 minutes
4. **Add Sheets** (optional) - 5 minutes
5. **Test** - 5 minutes

**Total: 30 minutes to fully working system!**

---

**Follow this guide and you'll have everything set up quickly!** 🚀