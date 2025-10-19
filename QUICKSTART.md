# QuantumSync - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Web browser

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd quantum-sync
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The application will automatically open at `http://localhost:3000`

## 📖 Using the Dashboards

### HR Dashboard

1. **Access the dashboard:**
   - Click "HR Dashboard" in the sidebar
   - Or navigate to `http://localhost:3000/hr`

2. **Add a candidate:**
   - Fill in the candidate form:
     - Name
     - Email
     - Skills (comma-separated, e.g., "React, TypeScript, Node.js")
     - Years of experience
     - Resume URL
   - Click "Submit Candidate"

3. **What happens next:**
   - Data is sent to n8n webhook at `/hr` endpoint
   - AI extracts and scores the candidate (0-100)
   - Automatic routing based on score:
     - ≥80: Interview invitation sent
     - 50-79: Review email sent
     - <50: Rejection email sent
   - Slack notification posted to #hiring
   - Data logged to Google Sheets

### Finance Dashboard

1. **Access the dashboard:**
   - Click "Finance Dashboard" in the sidebar
   - Or navigate to `http://localhost:3000/finance`

2. **Add an invoice:**
   - Fill in the invoice form:
     - Vendor name
     - Invoice number
     - Amount
     - Date
     - Line items (one per line)
   - Click "Submit Invoice"

3. **What happens next:**
   - Data is sent to n8n webhook at `/finance` endpoint
   - AI extracts and validates invoice details
   - Automatic routing based on amount:
     - <$500: Auto-approved
     - $500-$5,000: Manager approval required
     - ≥$5,000: CFO approval required
   - Duplicate detection runs
   - Fraud risk analysis performed
   - Email/Slack notifications sent
   - Data logged to Google Sheets

## 🔧 Configuration

### Changing the Webhook URL

Edit `src/services/api.ts`:

```typescript
const WEBHOOK_URL = 'YOUR_NEW_WEBHOOK_URL';
```

### Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration.

## 🎨 Features

### Visual Highlights
- **Dark Theme**: Modern AI-themed dark interface
- **Animated Components**: Smooth Framer Motion animations
- **Real-time Feedback**: Toast notifications for actions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Glass Morphism**: Frosted glass effects throughout

### Dashboard Statistics
- Real-time counters (currently showing placeholder "0" values)
- Visual progress bars
- Color-coded status indicators
- Interactive cards with hover effects

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is occupied:
```bash
PORT=3001 npm start
```

### Module Not Found Errors
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS Not Working
Ensure PostCSS is properly configured:
```bash
npm install -D tailwindcss postcss autoprefixer
```

## 📦 Building for Production

```bash
npm run build
```

The optimized build will be in the `build/` folder.

### Deploy the Build
You can deploy to:
- Vercel: `vercel --prod`
- Netlify: Drag the `build` folder to Netlify
- GitHub Pages: Follow React docs for GH Pages deployment

## 🔗 API Integration

### Request Format

**HR Endpoint** (`POST /hr`):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "skills": ["React", "TypeScript"],
  "experience": 5,
  "resumeUrl": "https://example.com/resume.pdf"
}
```

**Finance Endpoint** (`POST /finance`):
```json
{
  "vendor": "ACME Corp",
  "amount": 1500.00,
  "date": "2025-10-19",
  "lineItems": ["Item 1", "Item 2"],
  "invoiceNumber": "INV-2025-001"
}
```

## 📝 Notes

- The current implementation shows placeholder statistics ("0" values)
- To display real data, connect to a backend API or database
- The n8n workflow should handle the actual AI processing and routing logic
- Customize colors in `tailwind.config.js`
- Modify animations in component files

## 🤝 Support

For issues or questions:
1. Check the console for errors
2. Verify the n8n webhook is accessible
3. Ensure all dependencies are installed
4. Check network tab for API call status

---

**Happy Automating! 🚀**