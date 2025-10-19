# ⚡ 5-Minute Quick Setup Guide

## 🎯 Goal
Get QuantumSync running end-to-end in under 5 minutes!

---

## Step 1: Start React App (30 seconds)

```bash
cd /Users/macbookair/Downloads/Hackathon/quantum-sync
npm start
```

✅ Opens at: **http://localhost:3000**

---

## Step 2: Create n8n Workflow (3 minutes)

### In n8n (https://falco.app.n8n.cloud):

1. **New Workflow** → Name: "QuantumSync Automation"

2. **Add Nodes (in order):**

```
Webhook → Switch → [HR nodes] + [Finance nodes] → Merge → Response
```

3. **Quick Config:**

**Webhook:**
- Path: `automation`
- Method: POST

**Switch:**
- Output 1: `{{ $json.type === "hr" }}`
- Output 2: `{{ $json.type === "finance" }}`

**HR Path (from Output 1):**
- Set node → Extract `$json.data.*`
- Function → Calculate score
- Switch → Route by score
- Email → Send based on score
- Slack → Post to #hiring
- Sheets → Log candidate

**Finance Path (from Output 2):**
- Set node → Extract `$json.data.*`
- Function → Fraud check
- Switch → Route by amount
- Email → Send based on amount
- Slack → Post to #finance
- Sheets → Log invoice

**Merge:**
- Wait for both branches

**Response:**
- Return `{ "success": true }`

4. **Activate Workflow** (toggle ON)

---

## Step 3: Test Everything (1 minute)

### Go to Test Page:
**http://localhost:3000/test**

1. Click "Test Connection" for HR → ✅ Success
2. Click "Test Connection" for Finance → ✅ Success

### Test Real Submission:

**HR:** http://localhost:3000/hr
- Fill form → Submit → Check n8n executions

**Finance:** http://localhost:3000/finance
- Fill form → Submit → Check n8n executions

---

## ✅ Done!

You now have:
- ✅ React frontend running
- ✅ n8n workflow processing requests
- ✅ Both HR and Finance automation working

---

## 🔍 Quick Troubleshoot

**404 Error?**
→ Check webhook path is `automation` (not `automation/hr`)

**No Response?**
→ Activate workflow (toggle switch in n8n)

**CORS Error?**
→ Enable CORS in n8n settings

---

## 📚 Full Details

For complete setup with emails, Slack, and Google Sheets:
→ See **SINGLE_WORKFLOW_SETUP.md**

---

**That's it! You're live! 🚀**