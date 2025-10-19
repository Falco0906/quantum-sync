# 🚀 Import Your n8n Workflow in 2 Minutes!

## What I've Done For You

I've created a **ready-to-import n8n workflow** that includes:
- ✅ Webhook trigger (path: `automation`)
- ✅ Router that splits HR and Finance
- ✅ HR scoring logic (0-100 points)
- ✅ Finance fraud detection
- ✅ All routing logic
- ✅ Response handling

**File:** `n8n-workflow-base.json`

---

## 📥 How to Import (2 Steps)

### Step 1: Open n8n

Go to: **https://falco.app.n8n.cloud**

### Step 2: Import the Workflow

1. Click **"+"** (top left) → **"Import from File"**
2. Select: `/Users/macbookair/Downloads/Hackathon/quantum-sync/n8n-workflow-base.json`
3. Click **"Import"**

**Done!** The workflow is now in your n8n! 🎉

---

## ⚙️ What You Still Need to Add (15-20 minutes)

The imported workflow has the **core logic** but you need to add:

### 1. Email Nodes (5 minutes each)

**For HR (3 email nodes after "Route by Score"):**

**High Score Path:**
```
Add → Email Node
To: {{ $json.email }}
Subject: 🎉 Interview Invitation - {{ $json.name }}
Body:
Dear {{ $json.name }},

Congratulations! Your score: {{ $json.score }}/100

We'd like to invite you for an interview!

Best regards,
HR Team
```

**Medium Score Path:**
```
Add → Email Node  
To: {{ $json.email }}
Subject: 📋 Application Under Review - {{ $json.name }}
Body:
Dear {{ $json.name }},

Thank you for applying. Score: {{ $json.score }}/100

We'll respond within 5-7 days.

Best regards,
HR Team
```

**Low Score Path:**
```
Add → Email Node
To: {{ $json.email }}
Subject: Application Update - {{ $json.name }}
Body:
Dear {{ $json.name }},

Thank you for your interest. We're moving forward with other candidates.

Best regards,
HR Team
```

**For Finance (3 email nodes after "Route by Amount"):**

**Auto-Approve Path:**
```
Add → Email Node
To: finance@yourcompany.com
Subject: ✅ Auto-Approved - {{ $json.invoiceNumber }}
Body:
Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}

Auto-approved. No action needed.
```

**Manager Path:**
```
Add → Email Node
To: manager@yourcompany.com
Subject: 📋 Manager Approval - {{ $json.invoiceNumber }}
Body:
Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}

Please review and approve.
```

**CFO Path:**
```
Add → Email Node
To: cfo@yourcompany.com
Subject: ⚠️ CFO Approval - {{ $json.invoiceNumber }}
Body:
Invoice: {{ $json.invoiceNumber }}
Vendor: {{ $json.vendor }}
Amount: ${{ $json.amount }}

High-value invoice. Please review.
```

### 2. Slack Nodes (Optional - 5 minutes)

After each set of email nodes, add:

**HR Slack:**
```
Add → Slack Node
Channel: #hiring
Message:
🆕 New Candidate: {{ $json.name }}
⭐ Score: {{ $json.score }}/100
📊 Status: {{ $json.status }}
```

**Finance Slack:**
```
Add → Slack Node
Channel: #finance
Message:
💰 Invoice: {{ $json.invoiceNumber }}
💵 Amount: ${{ $json.amount }}
⚠️ Risk: {{ $json.riskLevel }}
```

### 3. Google Sheets Nodes (Optional - 5 minutes)

**HR Sheet:**
```
Add → Google Sheets Node
Operation: Append
Sheet: Candidates
Columns: timestamp, name, email, skills, experience, score, status
```

**Finance Sheet:**
```
Add → Google Sheets Node
Operation: Append
Sheet: Invoices
Columns: timestamp, invoiceNumber, vendor, amount, date, riskLevel, status
```

---

## ✅ After Adding Nodes

### 1. Connect Everything

Make sure:
- All 3 HR score paths lead to email → (optional: Slack/Sheets) → Merge node
- All 3 Finance amount paths lead to email → (optional: Slack/Sheets) → Merge node

### 2. Configure Credentials

- **Email:** Add Gmail or SMTP credentials
- **Slack:** Add Slack OAuth (if using)
- **Google Sheets:** Add Google OAuth (if using)

### 3. Activate Workflow

Click the **toggle switch** at the top → **ON**

---

## 🧪 Test It!

### From React App:
```
1. Start React: npm start
2. Go to: http://localhost:3000/test
3. Click "Test Connection" for both HR and Finance
```

### From Terminal:
```bash
# Test HR
curl -X POST https://falco.app.n8n.cloud/webhook/automation \
  -H "Content-Type: application/json" \
  -d '{"type":"hr","data":{"name":"Test","email":"test@test.com","skills":["React"],"experience":5,"resumeUrl":"https://test.com"}}'

# Test Finance
curl -X POST https://falco.app.n8n.cloud/webhook/automation \
  -H "Content-Type: application/json" \
  -d '{"type":"finance","data":{"vendor":"Test","amount":1000,"date":"2025-10-19","lineItems":["Item"],"invoiceNumber":"TEST-001"}}'
```

### Check Results:
- n8n executions tab (green = success)
- Console logs
- Emails (if configured)

---

## 📊 What the Workflow Does

```
Request comes in
    ↓
Checks "type" field
    ↓
├─ HR: Scores candidate → Routes by score → Actions
└─ Finance: Fraud check → Routes by amount → Actions
    ↓
Merges responses
    ↓
Sends success back to React
```

---

## 🎯 Quick Checklist

- [ ] Import workflow JSON file
- [ ] Add 3 HR email nodes (high/medium/low paths)
- [ ] Add 3 Finance email nodes (auto/manager/CFO paths)
- [ ] (Optional) Add Slack nodes
- [ ] (Optional) Add Google Sheets nodes
- [ ] Configure email credentials
- [ ] Activate workflow
- [ ] Test from React app
- [ ] Verify emails sent

---

## 💡 Pro Tips

1. **Start Simple:** Just add email nodes first, test, then add Slack/Sheets
2. **Use Test Data:** Don't worry about real emails initially
3. **Check Executions:** n8n shows detailed logs for debugging
4. **Save Often:** n8n auto-saves but manually save after big changes

---

## 🐛 Troubleshooting

**"Workflow not found"**
→ Make sure you imported the JSON file

**"Webhook not responding"**
→ Check workflow is activated (toggle ON)

**"Email not sending"**
→ Add and configure email credentials in n8n

**"Wrong webhook URL"**
→ Check it's `https://falco.app.n8n.cloud/webhook/automation`

---

## 📞 Next Steps

1. **Import the workflow** (2 minutes)
2. **Add email nodes** (15 minutes)
3. **Test from React** (5 minutes)
4. **Add Slack/Sheets** if needed (10 minutes)

**Total time: ~30 minutes to fully functional!**

---

**Let's do this! Import the workflow and you're 80% done!** 🚀