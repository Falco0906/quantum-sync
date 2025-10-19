# 🎯 START HERE - Complete Setup in 30 Minutes

## What You Have Right Now

✅ **React Frontend** - 100% Complete  
✅ **n8n Workflow Template** - Ready to import  
✅ **Complete Documentation** - Everything you need  

---

## 🚀 Your 30-Minute Setup Plan

### ⏰ Minutes 0-2: Start React App

```bash
cd /Users/macbookair/Downloads/Hackathon/quantum-sync
npm start
```

✅ Opens at: http://localhost:3000

---

### ⏰ Minutes 2-4: Import n8n Workflow

1. Go to: **https://falco.app.n8n.cloud**
2. Click **"+"** → **"Import from File"**
3. Select: **`n8n-workflow-base.json`** (in your project folder)
4. Click **"Import"**

✅ Core workflow is now in your n8n!

📖 **Detailed guide:** `IMPORT_WORKFLOW.md`

---

### ⏰ Minutes 4-19: Add Email Nodes

**You need to add 6 email nodes total:**

**HR Branch (3 emails):**
- After "High Score" output → Email node
- After "Medium Score" output → Email node  
- After "Low Score" output → Email node

**Finance Branch (3 emails):**
- After "Auto-Approve" output → Email node
- After "Manager" output → Email node
- After "CFO" output → Email node

**Email templates provided in:** `IMPORT_WORKFLOW.md`

---

### ⏰ Minutes 19-24: Activate & Test

1. **Save workflow** (Cmd/Ctrl + S)
2. **Activate** (toggle switch at top)
3. **Test from React:**
   - Go to: http://localhost:3000/test
   - Click both test buttons
4. **Check n8n executions tab**

✅ Both should show green success!

---

### ⏰ Minutes 24-30: Add Slack/Sheets (Optional)

**Skip this if you're short on time!**

- Add Slack nodes for notifications
- Add Google Sheets for logging

📖 **Guide:** `IMPORT_WORKFLOW.md` (Part 4 & 5)

---

## 📚 Your Documentation Library

| File | Use When | Time |
|------|----------|------|
| **IMPORT_WORKFLOW.md** | Importing & setting up n8n | 5 min read |
| **VISUAL_GUIDE.md** | Need screenshots/visuals | 10 min read |
| **SINGLE_WORKFLOW_SETUP.md** | Detailed node configs | 15 min read |
| **PROJECT_COMPLETION_CHECKLIST.md** | Tracking progress | 5 min read |
| **ARCHITECTURE.md** | Understanding the system | 5 min read |
| **QUICK_SETUP.md** | Ultra-fast reference | 2 min read |

---

## 🎯 Minimum Viable Demo (15 minutes)

If you're really pressed for time:

1. **Import workflow** (2 min)
2. **Add just 2 email nodes:**
   - One after HR "High Score"
   - One after Finance "Auto-Approve"
3. **Activate workflow** (1 min)
4. **Test from React** (2 min)
5. **Do a demo submission** (5 min)

This gives you a working demo even if incomplete!

---

## 🧪 Testing Checklist

- [ ] React app running (localhost:3000)
- [ ] n8n workflow imported
- [ ] Email nodes added
- [ ] Email credentials configured
- [ ] Workflow activated
- [ ] Test page shows both endpoints working
- [ ] HR submission sends email
- [ ] Finance submission sends email
- [ ] n8n executions show success

---

## 🎥 Demo Script (For Presentation)

### Opening (30 seconds)
"I built QuantumSync - an AI-powered automation system for HR recruitment and finance invoices using React and n8n."

### HR Demo (1 minute)
1. Show HR dashboard
2. Fill in high-scoring candidate (experience: 8, skills: 6)
3. Submit → Show toast
4. Show email received
5. Show n8n execution

### Finance Demo (1 minute)
1. Show Finance dashboard
2. Fill in high-value invoice ($6000+)
3. Submit → Show toast
4. Show CFO email
5. Show n8n execution

### Behind the Scenes (1 minute)
1. Show n8n workflow diagram
2. Explain single webhook, dual routing
3. Show scoring/fraud logic
4. Show multi-channel automation

**Total: 3.5 minutes - Perfect for hackathon demo!**

---

## 🆘 Quick Troubleshooting

### React app won't start?
```bash
rm -rf node_modules
npm install
npm start
```

### Can't import workflow?
- Make sure file is: `n8n-workflow-base.json`
- Check you're logged into n8n
- Try drag-and-drop instead of file picker

### Webhook returns 404?
- Check path is `automation` (not `automation/hr`)
- Workflow must be activated (toggle ON)

### No email received?
- Check spam folder
- Verify email credentials in n8n
- Check n8n executions for errors

### Test page shows error?
- Open browser console (F12)
- Check network tab for request details
- Verify webhook URL in n8n

---

## 💡 Pro Tips

1. **Start simple** - Get core working first, add features later
2. **Test frequently** - After each node addition
3. **Use n8n test mode** - Click "Test step" on webhook
4. **Save often** - n8n auto-saves but manual save is safer
5. **Check executions** - They show exactly what went wrong

---

## 🏆 What Makes This Project Special

### Technical Excellence:
- **Single workflow** handles both HR and Finance
- **AI-powered** scoring and fraud detection
- **Smart routing** based on score/amount
- **Multi-channel** notifications (Email + Slack + Sheets)
- **Modern UI** with animations and responsiveness
- **TypeScript** for type safety
- **Proper error handling** throughout

### Business Value:
- **Saves time** - Automates manual processes
- **Reduces errors** - AI validation and scoring
- **Improves response** - Instant notifications
- **Audit trail** - Complete logging
- **Scalable** - Handles high volume

---

## 📞 If You Get Stuck

1. **Check documentation** - Start with `IMPORT_WORKFLOW.md`
2. **Browser console** - F12 to see errors
3. **n8n executions** - Click on failed runs
4. **Network tab** - See actual API calls
5. **Read error messages** - They're usually helpful!

---

## ✨ Final Checklist

Before your demo/submission:

- [ ] React app runs without errors
- [ ] n8n workflow is activated
- [ ] At least basic emails work
- [ ] Test page shows green for both
- [ ] You can do a live submission
- [ ] You understand the flow
- [ ] README.md is updated
- [ ] Project looks polished

---

## 🎉 You're Ready!

**Your mission:**
1. Import the workflow (2 min)
2. Add email nodes (15 min)
3. Test everything (5 min)
4. Practice demo (5 min)

**Time: 27 minutes**

You have everything you need. The hard part is done. Now just follow the steps!

---

## 🚀 Let's Go!

**Start with:** `IMPORT_WORKFLOW.md`

**You got this!** 💪

---

Good luck with your hackathon! 🎊