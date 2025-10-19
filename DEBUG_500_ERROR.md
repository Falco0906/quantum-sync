# 🔧 Debugging 500 Error from n8n

## What's Happening

A **500 error** means:
- ✅ Your React frontend is working correctly
- ✅ The request is reaching n8n successfully
- ❌ Something in your n8n workflow is throwing an error

---

## 🔍 Step 1: Check Browser Console (IMPORTANT!)

1. **Open browser console:** Press `F12` or `Cmd+Option+I`
2. **Go to Console tab**
3. **Look for error messages** starting with `📛`

You should see something like:
```
🚀 Submitting candidate to n8n webhook: {type: "hr", data: {...}}
📍 URL: https://falco.app.n8n.cloud/webhook/automation
❌ Error submitting candidate:
📛 Response error status: 500
📛 Response error data: {...error details...}
```

**The error data will tell you what's wrong in n8n!**

---

## 🔍 Step 2: Check n8n Executions Tab

1. **Go to your n8n dashboard**
2. **Click "Executions" in the left sidebar**
3. **Find the failed execution** (red X icon)
4. **Click on it to see details**
5. **Look at which node failed** (will be highlighted in red)
6. **Click the failed node** to see the error message

This will show you **exactly** which node in your workflow is causing the issue!

---

## 🐛 Common Causes of 500 Errors

### Issue 1: Missing Required Fields

**Symptom:** Error says "Missing required field: file" or similar

**Your n8n code (line 18):**
```javascript
if (!binary || !binary.file) {
  throw new Error('Missing required file');
}
```

**Problem:** Your workflow expects a file attachment, but the frontend sends JSON data only.

**Solution:** Your n8n workflow needs to handle JSON-only requests. Update your Input Validator:

```javascript
// Get form data from webhook
const body = $input.item.json.body;
const binary = $input.item.json.binary;

console.log('Received type:', body.type);

// Validate required fields
if (!body.type) {
  throw new Error('Missing required field: type (must be "hr" or "finance")');
}

if (!body.type.match(/^(hr|finance)$/)) {
  throw new Error('Invalid type. Must be "hr" or "finance"');
}

// Check if we have data object
if (!body.data) {
  throw new Error('Missing required field: data');
}

// File is OPTIONAL - only check if you actually need it
// Remove this check if you don't need file uploads:
// if (!binary || !binary.file) {
//   throw new Error('Missing required file');
// }

return {
  json: {
    type: body.type,
    data: body.data,
    hasFile: !!(binary && binary.file)
  }
};
```

---

### Issue 2: Incorrect Data Structure

**Symptom:** Error about undefined properties

**Problem:** Your workflow expects different field names than what frontend sends.

**Frontend sends:**
```json
{
  "type": "hr",
  "data": {
    "name": "...",
    "email": "...",
    "skills": ["..."],
    "experience": 5,
    "resumeUrl": "..."
  }
}
```

**Solution:** Make sure your n8n nodes access fields correctly:
- Use `{{ $json.data.name }}` not `{{ $json.name }}`
- Use `{{ $json.data.email }}` not `{{ $json.email }}`
- etc.

---

### Issue 3: Node After Webhook Expects Different Format

**Problem:** The node after your webhook (Extract Resume Data, Parse Invoice, etc.) expects data in a different format.

**Solution:** Add a transformation node between webhook and the processing nodes:

```javascript
// Set Node - Transform Data
const input = $input.item.json;

if (input.type === 'hr') {
  return {
    json: {
      candidate_name: input.data.name,
      candidate_email: input.data.email,
      skills: input.data.skills.join(', '),
      experience_years: input.data.experience,
      resume_link: input.data.resumeUrl
    }
  };
} else if (input.type === 'finance') {
  return {
    json: {
      vendor_name: input.data.vendor,
      invoice_id: input.data.invoiceNumber,
      total_amount: input.data.amount,
      invoice_date: input.data.date,
      line_items: input.data.lineItems.join('\n')
    }
  };
}
```

---

### Issue 4: Authentication/CORS Issues

**Symptom:** Error about authentication or CORS

**Solution:** 
1. In n8n, edit your Webhook node
2. Set **Authentication**: None (for testing)
3. Set **Response Mode**: Respond Immediately
4. Enable **CORS**: Allow all origins (for testing)

---

## 🎯 Quick Fix Steps

### Option A: Make n8n Accept JSON-Only Requests

1. **Edit your Input Validator node** in n8n
2. **Remove or comment out the file check:**
   ```javascript
   // Remove this:
   // if (!binary || !binary.file) {
   //   throw new Error('Missing required file');
   // }
   ```
3. **Save and activate workflow**
4. **Test again**

---

### Option B: Check What Data n8n Actually Received

1. **Add a debug node** right after your webhook in n8n
2. **Set it to output:** `{{ JSON.stringify($json) }}`
3. **Run a test** from React
4. **Check the debug output** - you'll see exactly what data n8n received
5. **Compare with what you expected**

---

## 🔧 Updated Frontend with Better Error Messages

I've just updated your `src/services/api.ts` to show more detailed errors:

Now when you click test, check the browser console (F12) and you'll see:
- 🚀 The exact data being sent
- 📍 The webhook URL
- ✅ Success response OR
- ❌ Detailed error with n8n's error message

---

## 📝 What To Do Right Now

1. **Refresh your browser** to get the updated error handling
2. **Press F12** to open console
3. **Click test button again**
4. **Look at the console output** - it will show the actual error from n8n
5. **Copy the error message** and check it against the common issues above

Then either:
- **Fix the n8n workflow** (most likely: remove file requirement)
- **OR tell me the exact error** and I'll help you fix it!

---

## 💡 Most Likely Fix

Based on your n8n code screenshot, the issue is probably **line 18** checking for a file:

```javascript
if (!binary || !binary.file) {
```

**The React app doesn't send files** - it only sends JSON data.

**To fix:** In your n8n Input Validator node, remove or comment out the file check.

---

## 🚀 Test Again

After fixing n8n:
1. Make sure workflow is **Active** (toggle ON)
2. **Save** the workflow
3. **Refresh** your React app
4. **Click test** again
5. **Check browser console** for detailed logs

---

Need help? Copy the error from browser console and share it!
