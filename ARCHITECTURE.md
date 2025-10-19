# 📊 QuantumSync System Architecture

## Overview
```
┌─────────────────────────────────────────────────────────────────┐
│                       React Frontend                            │
│                  (localhost:3000)                               │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ HR Dashboard │  │   Finance    │  │ Test Page    │        │
│  │              │  │  Dashboard   │  │              │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                  │                  │                 │
│         └──────────────────┴──────────────────┘                │
│                             │                                   │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                    Single POST Request
                              │
                     ┌────────▼────────┐
                     │  type: "hr"     │
                     │  OR              │
                     │  type: "finance"│
                     └────────┬────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                        n8n Workflow                              │
│              (https://falco.app.n8n.cloud)                       │
│                                                                  │
│              ┌──────────────────────────┐                       │
│              │   Webhook Trigger        │                       │
│              │   POST /automation       │                       │
│              └───────────┬──────────────┘                       │
│                          │                                       │
│              ┌───────────▼──────────────┐                       │
│              │     Switch Node          │                       │
│              │   Route by "type"        │                       │
│              └─────┬─────────────┬──────┘                       │
│                    │             │                               │
│          type="hr" │             │ type="finance"                │
│                    │             │                               │
│   ┌────────────────▼──┐     ┌───▼──────────────────┐           │
│   │   HR Branch       │     │   Finance Branch     │           │
│   │                   │     │                      │           │
│   │ 1. Extract Data   │     │ 1. Extract Data      │           │
│   │ 2. Calc Score     │     │ 2. Check Duplicates  │           │
│   │ 3. Route by Score │     │ 3. Fraud Analysis    │           │
│   │ 4. Send Emails    │     │ 4. Route by Amount   │           │
│   │ 5. Post Slack     │     │ 5. Send Emails       │           │
│   │ 6. Log to Sheets  │     │ 6. Post Slack        │           │
│   │                   │     │ 7. Log to Sheets     │           │
│   └────────────┬──────┘     └───┬──────────────────┘           │
│                │                 │                               │
│                └────────┬────────┘                               │
│                         │                                        │
│              ┌──────────▼──────────────┐                        │
│              │     Merge Node          │                        │
│              └──────────┬──────────────┘                        │
│                         │                                        │
│              ┌──────────▼──────────────┐                        │
│              │   Respond to Webhook    │                        │
│              │   Return Success JSON   │                        │
│              └─────────────────────────┘                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              │
                    Response JSON
                              │
                              ▼
                   ┌─────────────────┐
                   │  React Frontend │
                   │  Shows Toast    │
                   └─────────────────┘
```

---

## Data Flow Examples

### Example 1: HR Candidate Submission

```
User Fills Form
    ↓
{
  "type": "hr",
  "data": {
    "name": "Alice Johnson",
    "email": "alice@email.com",
    "skills": ["React", "Node.js", "Python"],
    "experience": 6,
    "resumeUrl": "https://..."
  }
}
    ↓
n8n Receives → Routes to HR Branch
    ↓
Score Calculated: 90/100 (High)
    ↓
Actions Triggered:
  - ✅ Interview email sent
  - ✅ Slack #hiring notification
  - ✅ Google Sheets log created
    ↓
Response:
{
  "success": true,
  "type": "hr",
  "data": {
    "score": 90,
    "status": "interview"
  }
}
    ↓
Toast: "Candidate submitted successfully!"
```

### Example 2: Finance Invoice Submission

```
User Fills Form
    ↓
{
  "type": "finance",
  "data": {
    "vendor": "ACME Corp",
    "amount": 6500,
    "date": "2025-10-19",
    "lineItems": ["Servers", "Software"],
    "invoiceNumber": "INV-2025-100"
  }
}
    ↓
n8n Receives → Routes to Finance Branch
    ↓
Fraud Analysis: Low Risk (15/100)
Amount Check: $6,500 → CFO Approval
    ↓
Actions Triggered:
  - ✅ CFO approval email sent
  - ✅ Slack #finance notification
  - ✅ Google Sheets audit log
    ↓
Response:
{
  "success": true,
  "type": "finance",
  "data": {
    "status": "pending",
    "riskLevel": "Low"
  }
}
    ↓
Toast: "Invoice submitted successfully!"
```

---

## Integration Points

### 1. Email Integration (Gmail/SMTP)
```
n8n → Send Email Node
    → Gmail OAuth / SMTP
        → Recipient's Inbox
```

**Emails Sent:**
- HR: Interview invites, review notices, rejections
- Finance: Auto-approvals, manager requests, CFO alerts

### 2. Slack Integration
```
n8n → Slack Node
    → Slack OAuth
        → #hiring channel (HR notifications)
        → #finance channel (Invoice notifications)
```

**Messages Include:**
- Candidate/Invoice details
- Scores/Risk levels
- Status updates

### 3. Google Sheets Integration
```
n8n → Google Sheets Node
    → Google OAuth
        → Spreadsheet: "QuantumSync Data"
            → Sheet: "Candidates" (HR logs)
            → Sheet: "Invoices" (Finance logs)
```

**Data Logged:**
- Timestamps
- All form data
- Calculated scores/risk levels
- Status/routing decisions

---

## Workflow Decision Trees

### HR Scoring Logic
```
Calculate Score (0-100):
  Experience: Max 40 points (8 points per year)
  Skills: Max 30 points (6 points per skill)
  Complete Profile: 30 points

Route by Score:
  ≥80 → Interview Branch
    └→ Send interview invitation
  50-79 → Review Branch
    └→ Send review notice
  <50 → Rejection Branch
    └→ Send rejection email
```

### Finance Routing Logic
```
Check Duplicate: Query database (future)
Fraud Analysis:
  Amount >$10K: +30 risk
  Round number: +20 risk
  No line items: +50 risk
  Total Risk: 0-100

Route by Amount:
  <$500 → Auto-Approve
    └→ Process immediately
  $500-$5K → Manager Approval
    └→ Send to manager@company.com
  ≥$5K → CFO Approval
    └→ Send to cfo@company.com
```

---

## File Structure

```
quantum-sync/
├── Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HRDashboard.tsx     → Sends type: "hr"
│   │   │   ├── FinanceDashboard.tsx → Sends type: "finance"
│   │   │   └── TestConnection.tsx   → Tests webhook
│   │   ├── services/
│   │   │   └── api.ts               → Wraps data with type
│   │   └── components/              → UI components
│   └── .env                         → WEBHOOK_URL config
│
└── Backend (n8n)
    └── Single Workflow: "QuantumSync Automation"
        ├── Webhook Trigger (1 node)
        ├── Switch Router (1 node)
        ├── HR Branch (8 nodes)
        ├── Finance Branch (9 nodes)
        ├── Merge (1 node)
        └── Response (1 node)
```

---

## Performance Metrics

### Expected Response Times:
- HR Processing: 2-4 seconds
- Finance Processing: 3-5 seconds
- Email Delivery: 1-2 seconds
- Slack Notification: <1 second
- Google Sheets Log: 1-2 seconds

### Scalability:
- Single workflow handles both types
- n8n can process 100+ requests/minute
- Horizontal scaling possible with n8n clusters

---

## Security Considerations

### Current Setup:
- ✅ HTTPS for all communications
- ✅ Type validation in Switch node
- ✅ Data structure validation
- ⚠️ No authentication (for demo)

### Production Recommendations:
- Add API key authentication
- Implement rate limiting
- Add request validation
- Enable error logging
- Set up monitoring alerts

---

## Monitoring & Debugging

### Where to Check:

1. **React App:**
   - Browser Console (F12)
   - Network Tab (API calls)
   - Toast notifications

2. **n8n:**
   - Executions Tab (all runs)
   - Individual node outputs
   - Error messages

3. **Email:**
   - Recipient inboxes
   - Spam folders
   - SMTP logs

4. **Slack:**
   - #hiring channel
   - #finance channel
   - Integration logs

5. **Google Sheets:**
   - "Candidates" sheet
   - "Invoices" sheet
   - Timestamp verification

---

**This architecture provides a clean, scalable solution for automating HR and Finance workflows!** 🚀