# 🎯 CONNECTING TO YOUR EXISTING N8N WORKFLOW

## You're Almost Done! Just Connect the Frontend

Since you already have your n8n workflow built, you just need to:

1. **Get your webhook URL from n8n**
2. **Update the `.env` file**
3. **Test it**

---

## 🔍 STEP 1: Find Your Webhook URL

In your n8n workflow (from your screenshot):

1. Click on the **Webhook node** (the first node in your workflow)
2. You'll see a field called "**Webhook URL**" or "**Test URL**"
3. **Copy that URL**

It should look something like:
```
https://falco.app.n8n.cloud/webhook/YOUR-WORKFLOW-PATH
```

---

## ✏️ STEP 2: Update the Frontend

Open this file:
```
/Users/macbookair/Downloads/Hackathon/quantum-sync/.env
```

Update the URL:
```bash
REACT_APP_WEBHOOK_URL=YOUR-WEBHOOK-URL-HERE
```

**Example:**
```bash
REACT_APP_WEBHOOK_URL=https://falco.app.n8n.cloud/webhook/automation
```

---

## 🧪 STEP 3: Test the Connection

```bash
# Start the app
cd /Users/macbookair/Downloads/Hackathon/quantum-sync
npm start

# App opens at http://localhost:3000
```

Then:
1. Go to **http://localhost:3000/test**
2. Click "**Test HR Webhook**"
3. Click "**Test Finance Webhook**"
4. Check your **n8n Executions tab** - should see new executions!

---

## 📊 What Data Format Does Your Frontend Send?

The React app sends this format:

### HR Request:
```json
{
  "type": "hr",
  "data": {
    "name": "Jane Smith",
    "email": "jane@example.com",
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
    "vendor": "Acme Corporation",
    "invoiceNumber": "INV-2025-001",
    "amount": 5000,
    "date": "2025-10-19",
    "lineItems": [
      "Professional Services - $3000",
      "Software License - $2000"
    ]
  }
}
```

---

## 🔧 Does Your N8N Workflow Expect Different Fields?

### Option 1: Your workflow expects the same format
✅ **Perfect!** Just update the `.env` file and you're done!

### Option 2: Your workflow expects different field names

**Let me know what fields your workflow expects!**

For example, if your n8n workflow expects:
```json
{
  "candidate_name": "...",
  "candidate_email": "...",
  "skills_list": "...",
  ...
}
```

**Tell me and I'll update the frontend code to match!**

### Option 3: You have separate webhooks for HR and Finance

**Tell me both URLs:**
- HR webhook: `https://...`
- Finance webhook: `https://...`

**I'll update the code to use different URLs!**

---

## 🎯 Quick Checklist

Before testing:
- [ ] n8n workflow is **ACTIVE** (toggle ON in n8n)
- [ ] Webhook URL copied from n8n
- [ ] `.env` file updated with webhook URL
- [ ] React app restarted (`npm start`)

---

## 🚀 Tell Me:

To help you connect:

1. **What's your webhook URL?** (from the webhook node)
2. **Does your webhook expect the "type" field to route HR vs Finance?**
3. **Or do you have separate webhooks for each?**
4. **What field names does your workflow expect?** (I can see "Extract Resume Data" and "Parse Invoice data" in your screenshot - what fields do they need?)

Once you tell me, I'll update the frontend to match your exact workflow! 🎯

---

## 💡 Most Likely Scenario

Your current `.env` already has:
```
REACT_APP_WEBHOOK_URL=https://falco.app.n8n.cloud/webhook/automation
```

**If your webhook path is different:**
1. Copy the path from your webhook node
2. Update `.env`
3. Restart app
4. Test!

That's it! 🎉
