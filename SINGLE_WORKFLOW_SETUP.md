# 🚀 Single n8n Workflow Setup Guide

## Overview

Your React frontend sends ALL requests to a **single n8n webhook**:
```
https://falco.app.n8n.cloud/webhook/automation
```

The workflow uses a `type` field to determine if it's HR or Finance processing.

---

## 📊 Data Format

### HR Request:
```json
{
  "type": "hr",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "skills": ["React", "TypeScript", "Node.js"],
    "experience": 5,
    "resumeUrl": "https://example.com/resume.pdf"
  }
}
```

### Finance Request:
```json
{
  "type": "finance",
  "data": {
    "vendor": "ACME Corp",
    "amount": 1500.00,
    "date": "2025-10-19",
    "lineItems": ["Item 1", "Item 2"],
    "invoiceNumber": "INV-2025-001"
  }
}
```

---

## 🔧 n8n Workflow Structure

### Single Workflow: "QuantumSync Automation"

```
1. Webhook (Trigger) - Receives all requests
   ↓
2. Switch Node - Routes by "type" field
   ├─ type === "hr" → HR Processing Path
   └─ type === "finance" → Finance Processing Path
```

---

## 📝 Detailed Node Configuration

### Node 1: Webhook Trigger

**Configuration:**
```
Name: Webhook Trigger
Type: Webhook
HTTP Method: POST
Path: automation
Authentication: None
Response Mode: When Last Node Finishes
Response Code: 200
```

---

### Node 2: Switch Node (Router)

**Configuration:**
```
Name: Route by Type
Mode: Expression

Outputs:
1. HR Path: {{ $json.type === "hr" }}
2. Finance Path: {{ $json.type === "finance" }}
```

---

## 🎯 HR Processing Path (Output 1)

### Node 3-HR: Set Node - Extract HR Data

```
Name: Extract HR Data
Mode: Manual Mapping

Mappings:
- name: {{ $json.data.name }}
- email: {{ $json.data.email }}
- skills: {{ $json.data.skills }}
- experience: {{ $json.data.experience }}
- resumeUrl: {{ $json.data.resumeUrl }}
- type: {{ $json.type }}
```

### Node 4-HR: Function Node - Calculate Score

```
Name: Calculate Candidate Score
Code:
```javascript
const candidate = $input.first().json;

let score = 0;

// Score based on experience (max 40 points)
score += Math.min(candidate.experience * 8, 40);

// Score based on skills count (max 30 points)
score += Math.min(candidate.skills.length * 6, 30);

// Base score for complete profile (30 points)
if (candidate.name && candidate.email && candidate.resumeUrl) {
  score += 30;
}

return {
  ...candidate,
  score: Math.min(score, 100),
  status: score >= 80 ? 'interview' : score >= 50 ? 'review' : 'rejected',
  timestamp: new Date().toISOString()
};
```
```

### Node 5-HR: Switch Node - Route by Score

```
Name: Route by Score
Mode: Expression

Outputs:
1. High (≥80): {{ $json.score >= 80 }}
2. Medium (50-79): {{ $json.score >= 50 && $json.score < 80 }}
3. Low (<50): {{ $json.score < 50 }}
```

### Node 6-HR: Email Nodes (3 branches)

**High Score Email:**
```
To: {{ $json.email }}
Subject: 🎉 Interview Invitation - {{ $json.name }}
Body:
Dear {{ $json.name }},

Congratulations! Your application scored {{ $json.score }}/100.

Skills: {{ $json.skills.join(', ') }}
Experience: {{ $json.experience }} years

We'd like to invite you for an interview!

Best regards,
HR Team
```

**Medium Score Email:**
```
To: {{ $json.email }}
Subject: 📋 Application Under Review - {{ $json.name }}
Body:
Dear {{ $json.name }},

Thank you for applying. Your score: {{ $json.score }}/100

We're reviewing your application and will respond within 5-7 days.

Best regards,
HR Team
```

**Low Score Email:**
```
To: {{ $json.email }}
Subject: Application Update - {{ $json.name }}
Body:
Dear {{ $json.name }},

Thank you for your interest. At this time, we're moving forward with other candidates.

We encourage you to apply for future positions.

Best regards,
HR Team
```

### Node 7-HR: Slack Node

```
Name: Post to Slack #hiring
Channel: #hiring
Message:
🆕 New Candidate Processed
👤 Name: {{ $json.name }}
📧 Email: {{ $json.email }}
⭐ Score: {{ $json.score }}/100
📊 Status: {{ $json.status }}
💼 Experience: {{ $json.experience }} years
🛠️ Skills: {{ $json.skills.join(', ') }}
```

### Node 8-HR: Google Sheets

```
Name: Log to HR Sheet
Operation: Append or Update
Spreadsheet: Your Google Sheet ID
Sheet: Candidates

Columns:
- Timestamp: {{ $json.timestamp }}
- Name: {{ $json.name }}
- Email: {{ $json.email }}
- Skills: {{ $json.skills.join(', ') }}
- Experience: {{ $json.experience }}
- Score: {{ $json.score }}
- Status: {{ $json.status }}
- Resume: {{ $json.resumeUrl }}
```

---

## 💰 Finance Processing Path (Output 2)

### Node 3-FIN: Set Node - Extract Finance Data

```
Name: Extract Finance Data
Mode: Manual Mapping

Mappings:
- vendor: {{ $json.data.vendor }}
- amount: {{ $json.data.amount }}
- date: {{ $json.data.date }}
- lineItems: {{ $json.data.lineItems }}
- invoiceNumber: {{ $json.data.invoiceNumber }}
- type: {{ $json.type }}
```

### Node 4-FIN: Function Node - Check Duplicates

```
Name: Check for Duplicates
Code:
```javascript
const invoice = $input.first().json;

// In production, query your database here
// For now, just flag as not duplicate
invoice.isDuplicate = false;
invoice.timestamp = new Date().toISOString();

return invoice;
```
```

### Node 5-FIN: Function Node - Fraud Analysis

```
Name: Fraud Risk Analysis
Code:
```javascript
const invoice = $input.first().json;

let riskScore = 0;

// High amount risk
if (invoice.amount > 10000) riskScore += 30;

// Round number suspicion
if (invoice.amount % 1000 === 0) riskScore += 20;

// Missing line items
if (!invoice.lineItems || invoice.lineItems.length === 0) {
  riskScore += 50;
}

invoice.riskScore = Math.min(riskScore, 100);
invoice.riskLevel = riskScore > 50 ? 'High' : riskScore > 25 ? 'Medium' : 'Low';
invoice.status = invoice.amount < 500 ? 'auto-approved' : 'pending';

return invoice;
```
```

### Node 6-FIN: Switch Node - Route by Amount

```
Name: Route by Amount
Mode: Expression

Outputs:
1. Auto (<$500): {{ $json.amount < 500 }}
2. Manager ($500-$5K): {{ $json.amount >= 500 && $json.amount < 5000 }}
3. CFO (≥$5K): {{ $json.amount >= 5000 }}
```

### Node 7-FIN: Email Nodes (3 branches)

**Auto-Approve Email:**
```
To: finance@company.com
Subject: ✅ Auto-Approved - {{ $json.invoiceNumber }}
Body:
Invoice Auto-Approved

Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}
Date: {{ $json.date }}
Risk Level: {{ $json.riskLevel }}

No further action required.
```

**Manager Approval Email:**
```
To: manager@company.com
Subject: 📋 Manager Approval Required - {{ $json.invoiceNumber }}
Body:
Manager Approval Needed

Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}
Date: {{ $json.date }}
Risk Level: {{ $json.riskLevel }}

Please review and approve.
```

**CFO Approval Email:**
```
To: cfo@company.com
Subject: ⚠️ CFO Approval Required - {{ $json.invoiceNumber }}
Body:
CFO Approval Required - High Value Invoice

Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}
Date: {{ $json.date }}
Risk Level: {{ $json.riskLevel }}

Line Items:
{{ $json.lineItems.join('\n') }}

Immediate attention required.
```

### Node 8-FIN: Slack Node

```
Name: Post to Slack #finance
Channel: #finance
Message:
💰 New Invoice Processed
📄 Invoice: {{ $json.invoiceNumber }}
🏢 Vendor: {{ $json.vendor }}
💵 Amount: ${{ $json.amount }}
⚠️ Risk: {{ $json.riskLevel }}
✅ Status: {{ $json.status }}
```

### Node 9-FIN: Google Sheets

```
Name: Log to Finance Sheet
Operation: Append or Update
Spreadsheet: Your Google Sheet ID
Sheet: Invoices

Columns:
- Timestamp: {{ $json.timestamp }}
- Invoice Number: {{ $json.invoiceNumber }}
- Vendor: {{ $json.vendor }}
- Amount: {{ $json.amount }}
- Date: {{ $json.date }}
- Line Items: {{ $json.lineItems.join(', ') }}
- Risk Level: {{ $json.riskLevel }}
- Risk Score: {{ $json.riskScore }}
- Status: {{ $json.status }}
```

---

## 🔄 Final Response Node

### Node 10: Merge Node (Join Both Paths)

```
Name: Merge Responses
Mode: Append
Wait for Execution: All branches
```

### Node 11: Respond to Webhook

```
Name: Send Response
Mode: Using Set Field
Response Data: First Entry JSON

Response Body:
{
  "success": true,
  "message": "Request processed successfully",
  "type": "{{ $json.type }}",
  "data": {{ $json }}
}
```

---

## 🧪 Testing

### Test from Terminal:

**Test HR:**
```bash
curl -X POST https://falco.app.n8n.cloud/webhook/automation \
  -H "Content-Type: application/json" \
  -d '{
    "type": "hr",
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "skills": ["React", "Node.js"],
      "experience": 5,
      "resumeUrl": "https://example.com/resume.pdf"
    }
  }'
```

**Test Finance:**
```bash
curl -X POST https://falco.app.n8n.cloud/webhook/automation \
  -H "Content-Type: application/json" \
  -d '{
    "type": "finance",
    "data": {
      "vendor": "ACME Corp",
      "amount": 1000,
      "date": "2025-10-19",
      "lineItems": ["Item 1", "Item 2"],
      "invoiceNumber": "TEST-001"
    }
  }'
```

---

## ✅ Setup Checklist

- [ ] Create single workflow in n8n named "QuantumSync Automation"
- [ ] Add Webhook node with path "automation"
- [ ] Add Switch node to route by "type" field
- [ ] Build HR processing branch (8 nodes)
- [ ] Build Finance processing branch (9 nodes)
- [ ] Configure all email addresses
- [ ] Connect Slack workspace
- [ ] Connect Google Sheets
- [ ] Add Merge node to combine branches
- [ ] Add final Respond to Webhook node
- [ ] Activate the workflow (toggle ON)
- [ ] Test from React app (http://localhost:3000/test)
- [ ] Verify emails are sent
- [ ] Check Slack notifications
- [ ] Confirm Google Sheets logging

---

## 🎯 Visual Workflow Diagram

```
┌─────────────────────┐
│  Webhook Trigger    │
│  (POST /automation) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Switch by Type    │
│  type === "hr" ?    │
└─────┬─────────┬─────┘
      │         │
   HR │         │ Finance
      │         │
      ▼         ▼
┌──────────┐ ┌──────────┐
│ HR Flow  │ │ Fin Flow │
│ (8 nodes)│ │ (9 nodes)│
└─────┬────┘ └────┬─────┘
      │           │
      └─────┬─────┘
            │
            ▼
    ┌───────────────┐
    │  Merge Node   │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │   Response    │
    └───────────────┘
```

---

## 💡 Pro Tips

1. **Test each branch separately** before connecting the Merge node
2. **Use n8n's execution history** to debug issues
3. **Enable error workflow** for production
4. **Add validation** in Function nodes for data quality
5. **Use environment variables** in n8n for sensitive data
6. **Set up monitoring** for failed executions

---

## 🐛 Troubleshooting

**Issue: Both branches execute**
- Check Switch node expressions are mutually exclusive
- Verify `type` field is being sent correctly

**Issue: Response not returning**
- Ensure Merge node waits for all branches
- Check Respond to Webhook node is configured correctly

**Issue: Email not sending**
- Verify email credentials in n8n
- Check email node is on the execution path

---

**Ready to set up? Follow this guide step-by-step in your n8n editor!** 🚀