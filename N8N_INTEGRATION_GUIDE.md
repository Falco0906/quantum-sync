# n8n Backend Integration Guide

## 🔗 How the Connection Works

Your React frontend sends HTTP POST requests to your n8n webhook endpoints:
- **HR Endpoint**: `https://falco.app.n8n.cloud/webhook/automation/hr`
- **Finance Endpoint**: `https://falco.app.n8n.cloud/webhook/automation/finance`

## 📋 n8n Workflow Setup

### Step 1: Access Your n8n Workflow

1. Go to your n8n instance: `https://falco.app.n8n.cloud`
2. Open your existing workflow or create a new one
3. You should already have a webhook node configured

### Step 2: Configure Webhook Nodes

You need **TWO separate webhook nodes** (or one workflow that handles both):

#### **Webhook Node 1: HR Automation**

**Configuration:**
```
HTTP Method: POST
Path: automation/hr
Authentication: None (or configure as needed)
Response Mode: When Last Node Finishes
Response Data: First Entry JSON
```

**Expected Data Format:**
```json
{
  "name": "string",
  "email": "string",
  "skills": ["array", "of", "strings"],
  "experience": number,
  "resumeUrl": "string"
}
```

#### **Webhook Node 2: Finance Automation**

**Configuration:**
```
HTTP Method: POST
Path: automation/finance
Authentication: None (or configure as needed)
Response Mode: When Last Node Finishes
Response Data: First Entry JSON
```

**Expected Data Format:**
```json
{
  "vendor": "string",
  "amount": number,
  "date": "YYYY-MM-DD",
  "lineItems": ["array", "of", "strings"],
  "invoiceNumber": "string"
}
```

## 🤖 Sample n8n Workflow Structure

### HR Workflow:

```
1. Webhook (Trigger)
   ↓
2. Set Node (Extract candidate data)
   ↓
3. AI Node (Score candidate 0-100)
   ↓
4. Switch Node (Route based on score)
   ├─ ≥80 → Send Interview Email + Slack #hiring
   ├─ 50-79 → Send Review Email + Slack #hiring
   └─ <50 → Send Rejection Email + Slack #hiring
   ↓
5. Google Sheets (Log all data)
   ↓
6. Respond to Webhook (Send success response)
```

### Finance Workflow:

```
1. Webhook (Trigger)
   ↓
2. Set Node (Extract invoice data)
   ↓
3. AI Node (Validate & extract details)
   ↓
4. Function Node (Check for duplicates)
   ↓
5. AI Node (Fraud risk analysis)
   ↓
6. Switch Node (Route by amount)
   ├─ <$500 → Auto-approve + Email + Slack
   ├─ $500-$5K → Manager approval + Email + Slack
   └─ ≥$5K → CFO approval + Email + Slack
   ↓
7. Google Sheets (Maintain audit trail)
   ↓
8. Respond to Webhook (Send success response)
```

## 🔧 Testing the Connection

### Method 1: Use the React Frontend (Recommended)

1. Start your React app: `npm start`
2. Navigate to HR Dashboard
3. Fill in the form and submit
4. Check n8n executions tab to see if workflow triggered

### Method 2: Test with cURL

**Test HR Endpoint:**
```bash
curl -X POST https://falco.app.n8n.cloud/webhook/automation/hr \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "skills": ["React", "TypeScript", "Node.js"],
    "experience": 5,
    "resumeUrl": "https://example.com/resume.pdf"
  }'
```

**Test Finance Endpoint:**
```bash
curl -X POST https://falco.app.n8n.cloud/webhook/automation/finance \
  -H "Content-Type: application/json" \
  -d '{
    "vendor": "ACME Corp",
    "amount": 1500.00,
    "date": "2025-10-19",
    "lineItems": ["Item 1", "Item 2"],
    "invoiceNumber": "INV-2025-001"
  }'
```

### Method 3: Test with Postman

1. Create a new POST request
2. URL: `https://falco.app.n8n.cloud/webhook/automation/hr`
3. Headers: `Content-Type: application/json`
4. Body: Use the JSON format shown above
5. Click Send

## 🔐 Adding Authentication (Optional)

If you want to secure your webhooks:

### Option 1: API Key in Header

**n8n Webhook Node:**
- Enable "Webhook Authentication"
- Set authentication type to "Header Auth"
- Header Name: `X-API-Key`
- Expected Value: Your secret key

**React Frontend Update:**
```typescript
// In src/services/api.ts
const API_KEY = 'your-secret-api-key';

const response = await axios.post(`${WEBHOOK_URL}/hr`, candidateData, {
  headers: {
    'X-API-Key': API_KEY
  }
});
```

### Option 2: Basic Authentication

**n8n Webhook Node:**
- Enable "Basic Auth"
- Set username and password

**React Frontend Update:**
```typescript
const response = await axios.post(`${WEBHOOK_URL}/hr`, candidateData, {
  auth: {
    username: 'your-username',
    password: 'your-password'
  }
});
```

## 🐛 Troubleshooting

### Issue: "Network Error" or CORS Error

**Solution 1: Enable CORS in n8n**
- Go to n8n settings
- Enable CORS
- Add your frontend URL: `http://localhost:3000`

**Solution 2: Use n8n's Built-in CORS Support**
- Most n8n cloud instances have CORS enabled by default
- Check your workflow settings

### Issue: Webhook Returns 404

**Check:**
1. Webhook path is correct: `automation/hr` or `automation/finance`
2. Workflow is activated (toggle switch in n8n)
3. Webhook node is properly configured

### Issue: Data Not Reaching n8n

**Debug Steps:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit form
4. Look for POST request to n8n
5. Check request payload and response

### Issue: Workflow Doesn't Execute

**Check:**
1. Workflow is activated
2. Webhook node is at the start
3. Check n8n executions tab for errors
4. Verify webhook URL matches exactly

## 📊 Monitoring & Logs

### In React App:
- Open browser console (F12)
- Look for API call logs
- Success/error messages from toast notifications

### In n8n:
- Go to "Executions" tab
- See all workflow runs
- Click on execution to see details
- Check each node's input/output

## 🔄 Response Handling

### Success Response from n8n:

Your workflow should return a response like:
```json
{
  "success": true,
  "message": "Candidate processed successfully",
  "data": {
    "id": "123",
    "score": 85,
    "status": "interview"
  }
}
```

### Error Response:

```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🚀 Going to Production

### 1. Update Webhook URL

If you're moving to production:

```typescript
// In src/services/api.ts
const WEBHOOK_URL = process.env.REACT_APP_WEBHOOK_URL || 'https://your-production-n8n.com/webhook/automation';
```

### 2. Create .env file:

```bash
REACT_APP_WEBHOOK_URL=https://your-production-n8n.com/webhook/automation
```

### 3. Secure Your n8n Instance

- Enable authentication
- Use HTTPS only
- Implement rate limiting
- Add request validation

## 📝 Next Steps

1. ✅ Verify your n8n workflow is activated
2. ✅ Test webhook endpoints with cURL or Postman
3. ✅ Submit a test candidate from React app
4. ✅ Check n8n executions tab
5. ✅ Verify emails and Slack notifications work
6. ✅ Check Google Sheets logging

## 💡 Pro Tips

- Use n8n's "Error Workflow" to handle failures
- Set up email notifications for workflow errors
- Log all executions for debugging
- Use n8n's built-in testing before going live
- Monitor webhook response times

---

**Need Help?** Check n8n docs at https://docs.n8n.io/workflows/webhooks/