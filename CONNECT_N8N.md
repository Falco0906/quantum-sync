# 🔌 CONNECT YOUR EXISTING N8N WORKFLOW

> **You already have the n8n workflow!** Just need to connect the frontend.

---

## ✅ What You Have

- ✅ React frontend (100% complete)
- ✅ n8n workflow (already built by you!)
- ⏳ Need to: Connect them together (5 minutes!)

---

## 🎯 QUICK CONNECTION (5 Minutes)

### Step 1: Get Your Webhook URL (1 minute)

1. **Open your n8n workflow** (the one in your screenshot)
2. **Find the Webhook node** (looks like it's the starting node)
3. **Click on it**
4. **Copy the webhook URL**
   - Should look like: `https://falco.app.n8n.cloud/webhook/YOUR-PATH`

---

### Step 2: Update Frontend URL (1 minute)

Open this file in your project:
```
/Users/macbookair/Downloads/Hackathon/quantum-sync/.env
```

Change the URL to match your n8n webhook:
```bash
REACT_APP_WEBHOOK_URL=https://falco.app.n8n.cloud/webhook/YOUR-ACTUAL-PATH
```

**Replace `YOUR-ACTUAL-PATH` with the path from your webhook node!**

---

### Step 3: Check Data Format (2 minutes)

Your React app sends data like this:

**For HR (Candidate):**
```json
{
  "type": "hr",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "skills": ["React", "TypeScript"],
    "experience": 5,
    "resumeUrl": "https://example.com/resume.pdf"
  }
}
```

**For Finance (Invoice):**
```json
{
  "type": "finance",
  "data": {
    "vendor": "Acme Corp",
    "invoiceNumber": "INV-001",
    "amount": 5000,
    "date": "2025-10-19",
    "lineItems": ["Item 1", "Item 2"]
  }
}
```

**Make sure your n8n webhook expects this format!**

If your webhook expects different field names, let me know and I'll update the frontend.

---

### Step 4: Test Connection (1 minute)

1. **Make sure n8n workflow is ACTIVE** (toggle ON in n8n)
2. **Start your React app:**
   ```bash
   cd /Users/macbookair/Downloads/Hackathon/quantum-sync
   npm start
   ```
3. **Go to test page:** http://localhost:3000/test
4. **Click "Test HR Webhook"** and **"Test Finance Webhook"**
5. **Check n8n Executions tab** - Should see green success!

---

## 🔧 If Your N8N Expects Different Format

### Option A: Your webhook expects different fields

**Tell me what fields your webhook expects and I'll update the frontend!**

For example, if your webhook expects:
```json
{
  "candidate_name": "...",
  "candidate_email": "...",
  ...
}
```

I'll modify `src/services/api.ts` to match!

---

### Option B: Your webhook doesn't use "type" field

If your workflow has **separate webhooks** for HR and Finance:

**Tell me both webhook URLs and I'll update the code!**

Example:
- HR webhook: `https://falco.app.n8n.cloud/webhook/hr-automation`
- Finance webhook: `https://falco.app.n8n.cloud/webhook/finance-automation`

---

## 🎯 What You Need To Tell Me

1. **What's your webhook URL?** (from the webhook node in n8n)
2. **Does it expect the "type" field?** Or do you have separate webhooks?
3. **What field names does your workflow expect?** (check the first node after webhook)

---

## 🚀 Quick Test

Once you update the `.env` file:

```bash
# 1. Restart app (if running)
cd /Users/macbookair/Downloads/Hackathon/quantum-sync
npm start

# 2. Go to test page
open http://localhost:3000/test

# 3. Click test buttons
# 4. Check n8n executions tab
```

---

## 📸 From Your Screenshot

I can see your workflow has:
- ✅ Webhook node (starting point)
- ✅ Multiple processing nodes
- ✅ "Extract Resume Data" node
- ✅ "Extract Invoice Text" node
- ✅ "Message a contact" nodes
- ✅ "Parse Invoice data" node
- ✅ And many more!

**This looks like a complex, well-built workflow!**

---

## 🎯 Next Steps

**Tell me:**

1. **Your webhook URL** (copy from webhook node)
2. **What data format it expects** (check the node right after webhook)

Then I'll update the frontend to match your exact workflow!

---

## 💡 Quick Tip

In your n8n workflow:
1. Click the **Webhook node**
2. Look for "**Test URL**" or "**Production URL**"
3. **Copy that URL**
4. **Paste it in `.env`** file

That's it! The frontend will connect automatically!

---

## 🔥 Super Quick Version

If your webhook already expects this format:
```json
{
  "type": "hr" or "finance",
  "data": { ... candidate or invoice data ... }
}
```

Then just:
1. Update `.env` with your webhook URL
2. Restart app
3. Test it!

**DONE!** ✅

---

Let me know your webhook URL and I'll help you connect it! 🚀
