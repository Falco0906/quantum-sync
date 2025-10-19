# QuantumSync - AI-Powered Automation Dashboard

> **STATUS: 85% COMPLETE** - Frontend fully built, n8n setup remaining (30 minutes)

A modern, futuristic automation dashboard built with React and n8n for HR recruitment and finance invoice processing.

## ✅ What's Complete

- ✅ **Full React Frontend** - All components, pages, routing (100%)
- ✅ **Production Build** - Compiled and optimized (134.8 kB)
- ✅ **API Integration** - Single webhook service ready
- ✅ **Beautiful UI** - AI-themed with animations
- ✅ **n8n Workflow Template** - Ready to import
- ✅ **Complete Documentation** - 12 comprehensive guides

## ⏳ What's Left (30 minutes)

- [ ] Import n8n workflow (2 min)
- [ ] Add 6 email nodes (20 min)
- [ ] Test end-to-end (5 min)

**→ Follow `FINAL_SETUP.md` for exact steps!**

---

## 🚀 Features

### HR Automation Dashboard
- **AI Resume Analysis**: Automatically extracts candidate data from resume PDFs (name, email, skills, experience)
- **Smart Scoring**: AI-powered candidate scoring system (0-100)
- **Automated Routing**:
  - High Score (≥80): Sends interview invitation
  - Medium Score (50-79): Sends review email
  - Low Score (<50): Sends rejection email
- **Multi-Channel Notifications**: Personalized emails and Slack alerts to #hiring
- **Data Logging**: Complete audit trail in Google Sheets

### Finance Automation Dashboard
- **AI Invoice Processing**: Automatically extracts invoice details (vendor, amount, dates, line items)
- **Smart Approval Routing**:
  - <$500: Auto-approved
  - $500-$5,000: Manager approval required
  - ≥$5,000: CFO approval required
- **Fraud Detection**: AI-powered duplicate detection and risk analysis
- **Multi-Channel Notifications**: Email and Slack notifications
- **Audit Trail**: Complete logging in Google Sheets

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Mantine UI
- **Icons**: Tabler Icons
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **API Integration**: Axios
- **Backend**: n8n Workflow Automation

## 📦 Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### n8n Webhook Integration

The application is configured to work with your n8n webhook:
- **Webhook URL**: `https://falco.app.n8n.cloud/webhook/automation`
- **HR Endpoint**: `/hr`
- **Finance Endpoint**: `/finance`

To modify the webhook URL, edit `src/services/api.ts`

## 📁 Project Structure

```
quantum-sync/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Main layout with navigation
│   ├── pages/
│   │   ├── HRDashboard.tsx     # HR automation dashboard
│   │   └── FinanceDashboard.tsx # Finance automation dashboard
│   ├── services/
│   │   └── api.ts              # API service for n8n webhooks
│   ├── App.tsx                 # Main app component with routing
│   └── index.css               # Global styles with Tailwind
└── README.md
```

## 🎨 Design Features

- **AI-Themed UI**: Futuristic design with dark mode
- **Gradient Backgrounds**: Dynamic color gradients
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Works on all screen sizes
- **Glass Morphism**: Modern frosted glass effects

## Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
# quantum-sync
