# n8n Workflow Setup Script

## Quick Setup for Your n8n Workflows

### Step 1: Login to n8n
```
URL: https://falco.app.n8n.cloud
```

### Step 2: Create or Update Your Workflow

---

## HR Automation Workflow

### Workflow Name: "HR Candidate Processing"

### Node Configuration:

#### 1. **Webhook Node** (Trigger)
```
Type: Webhook
HTTP Method: POST
Path: automation/hr
Response Mode: When Last Node Finishes
Response Code: 200
```

#### 2. **Set Node** - Extract Data
```
Name: Extract Candidate Data
Mode: Manual Mapping

Mappings:
- name: {{ $json.name }}
- email: {{ $json.email }}
- skills: {{ $json.skills }}
- experience: {{ $json.experience }}
- resumeUrl: {{ $json.resumeUrl }}
```

#### 3. **Function Node** - Calculate Score (or use AI)
```
Name: Calculate Candidate Score
Code:
```javascript
// Simple scoring algorithm
const items = $input.all();
const candidate = items[0].json;

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
  timestamp: new Date().toISOString()
};
```

#### 4. **Switch Node** - Route by Score
```
Name: Route by Score
Mode: Expression

Outputs:
1. High Score: {{ $json.score >= 80 }}
2. Medium Score: {{ $json.score >= 50 && $json.score < 80 }}
3. Low Score: {{ $json.score < 50 }}
```

#### 5a. **Send Email** - Interview Invitation (High Score Path)
```
Name: Send Interview Email
To: {{ $json.email }}
Subject: Interview Invitation - {{ $json.name }}
Body:
Dear {{ $json.name }},

Congratulations! Your application has been reviewed and we're impressed with your qualifications.

Score: {{ $json.score }}/100
Skills: {{ $json.skills.join(', ') }}

We'd like to invite you for an interview.

Best regards,
HR Team
```

#### 5b. **Send Email** - Under Review (Medium Score Path)
```
Name: Send Review Email
To: {{ $json.email }}
Subject: Application Under Review - {{ $json.name }}
Body:
Dear {{ $json.name }},

Thank you for your application. Your profile is currently under review.

Score: {{ $json.score }}/100

We'll get back to you within 5-7 business days.

Best regards,
HR Team
```

#### 5c. **Send Email** - Rejection (Low Score Path)
```
Name: Send Rejection Email
To: {{ $json.email }}
Subject: Application Status - {{ $json.name }}
Body:
Dear {{ $json.name }},

Thank you for your interest. Unfortunately, we won't be moving forward with your application at this time.

We encourage you to apply for future positions that match your skills.

Best regards,
HR Team
```

#### 6. **Slack Node** - Post to #hiring Channel
```
Name: Notify Slack
Channel: #hiring
Message:
🆕 New Candidate: {{ $json.name }}
📧 Email: {{ $json.email }}
⭐ Score: {{ $json.score }}/100
💼 Experience: {{ $json.experience }} years
🛠️ Skills: {{ $json.skills.join(', ') }}
```

#### 7. **Google Sheets Node** - Log Data
```
Name: Log to Google Sheets
Operation: Append
Sheet: Candidates

Columns:
- Timestamp: {{ $json.timestamp }}
- Name: {{ $json.name }}
- Email: {{ $json.email }}
- Skills: {{ $json.skills.join(', ') }}
- Experience: {{ $json.experience }}
- Score: {{ $json.score }}
- Resume URL: {{ $json.resumeUrl }}
```

#### 8. **Respond to Webhook** (Final Node)
```
Name: Send Response
Response:
{
  "success": true,
  "message": "Candidate processed successfully",
  "data": {
    "score": {{ $json.score }},
    "status": "{{ $json.score >= 80 ? 'interview' : $json.score >= 50 ? 'review' : 'rejected' }}"
  }
}
```

---

## Finance Automation Workflow

### Workflow Name: "Finance Invoice Processing"

### Node Configuration:

#### 1. **Webhook Node** (Trigger)
```
Type: Webhook
HTTP Method: POST
Path: automation/finance
Response Mode: When Last Node Finishes
Response Code: 200
```

#### 2. **Set Node** - Extract Data
```
Name: Extract Invoice Data
Mode: Manual Mapping

Mappings:
- vendor: {{ $json.vendor }}
- amount: {{ $json.amount }}
- date: {{ $json.date }}
- lineItems: {{ $json.lineItems }}
- invoiceNumber: {{ $json.invoiceNumber }}
```

#### 3. **Function Node** - Check for Duplicates
```
Name: Check Duplicates
Code:
```javascript
const items = $input.all();
const invoice = items[0].json;

// In production, query your database
// For now, just add a flag
invoice.isDuplicate = false;
invoice.timestamp = new Date().toISOString();

return invoice;
```

#### 4. **Function Node** - Fraud Risk Analysis
```
Name: Fraud Analysis
Code:
```javascript
const items = $input.all();
const invoice = items[0].json;

let riskScore = 0;

// Check for unusual amounts
if (invoice.amount > 10000) riskScore += 30;
if (invoice.amount % 1000 === 0) riskScore += 20;

// Check for suspicious patterns
if (!invoice.lineItems || invoice.lineItems.length === 0) riskScore += 50;

invoice.riskScore = riskScore;
invoice.riskLevel = riskScore > 50 ? 'High' : riskScore > 25 ? 'Medium' : 'Low';

return invoice;
```

#### 5. **Switch Node** - Route by Amount
```
Name: Route by Amount
Mode: Expression

Outputs:
1. Auto-Approve: {{ $json.amount < 500 }}
2. Manager Approval: {{ $json.amount >= 500 && $json.amount < 5000 }}
3. CFO Approval: {{ $json.amount >= 5000 }}
```

#### 6a. **Send Email** - Auto-Approved (< $500)
```
Name: Send Auto-Approval Email
To: finance@company.com
Subject: Invoice Auto-Approved - {{ $json.invoiceNumber }}
Body:
Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}

This invoice has been automatically approved.

Risk Level: {{ $json.riskLevel }}
```

#### 6b. **Send Email** - Manager Approval ($500-$5K)
```
Name: Send Manager Approval Email
To: manager@company.com
Subject: Manager Approval Required - {{ $json.invoiceNumber }}
Body:
Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}

Please review and approve this invoice.

Risk Level: {{ $json.riskLevel }}
```

#### 6c. **Send Email** - CFO Approval (≥ $5K)
```
Name: Send CFO Approval Email
To: cfo@company.com
Subject: CFO Approval Required - {{ $json.invoiceNumber }}
Body:
Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}

CFO approval required for this high-value invoice.

Risk Level: {{ $json.riskLevel }}
Line Items:
{{ $json.lineItems.join('\n') }}
```

#### 7. **Slack Node** - Post Notification
```
Name: Notify Slack
Channel: #finance
Message:
💰 New Invoice: {{ $json.invoiceNumber }}
🏢 Vendor: {{ $json.vendor }}
💵 Amount: ${{ $json.amount }}
⚠️ Risk Level: {{ $json.riskLevel }}
✅ Status: {{ $json.amount < 500 ? 'Auto-Approved' : 'Pending Approval' }}
```

#### 8. **Google Sheets Node** - Log Data
```
Name: Log to Google Sheets
Operation: Append
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
```

#### 9. **Respond to Webhook** (Final Node)
```
Name: Send Response
Response:
{
  "success": true,
  "message": "Invoice processed successfully",
  "data": {
    "invoiceNumber": "{{ $json.invoiceNumber }}",
    "status": "{{ $json.amount < 500 ? 'approved' : 'pending' }}",
    "riskLevel": "{{ $json.riskLevel }}"
  }
}
```

---

## Activation Checklist

- [ ] Both workflows created in n8n
- [ ] Webhook nodes configured with correct paths
- [ ] Email nodes configured with correct addresses
- [ ] Slack integration connected
- [ ] Google Sheets connected and sheets created
- [ ] Workflows activated (toggle switch ON)
- [ ] Test webhooks from React app
- [ ] Verify emails are sent
- [ ] Check Slack notifications
- [ ] Confirm Google Sheets logging

---

## Testing Commands

### Test HR Webhook:
```bash
curl -X POST https://falco.app.n8n.cloud/webhook/automation/hr \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","skills":["React"],"experience":5,"resumeUrl":"https://test.com"}'
```

### Test Finance Webhook:
```bash
curl -X POST https://falco.app.n8n.cloud/webhook/automation/finance \
  -H "Content-Type: application/json" \
  -d '{"vendor":"Test Vendor","amount":1000,"date":"2025-10-19","lineItems":["Item 1"],"invoiceNumber":"TEST-001"}'
```

---

## Need Help?

- Check n8n executions tab for errors
- Use n8n's "Test Workflow" feature
- Enable "Debug Mode" in n8n settings
- Check webhook logs in n8n

Good luck! 🚀