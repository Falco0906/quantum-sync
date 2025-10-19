# QuantumSync - AI-Powered Automation Dashboard

A modern, intelligent automation platform that streamlines HR recruitment and finance invoice processing through AI-powered workflows. Built with React and n8n, QuantumSync combines beautiful user interfaces with powerful backend automation to transform how organizations handle repetitive tasks.

---

## 🎯 Overview

QuantumSync is an end-to-end automation solution that leverages artificial intelligence to process, analyze, and route HR applications and finance invoices automatically. The platform features a sleek, futuristic dashboard interface connected to sophisticated n8n workflows that handle everything from document parsing to intelligent decision-making and multi-channel notifications.

---

## 🚀 Features

### HR Automation Dashboard
- **AI Resume Analysis**: Automatically extracts candidate data from resume PDFs including name, email, skills, and experience using advanced parsing algorithms
- **Smart Scoring System**: AI-powered candidate evaluation that scores applicants on a 0-100 scale based on qualifications and experience
- **Intelligent Routing**:
  - High Score (≥80): Automatically sends interview invitation emails
  - Medium Score (50-79): Routes to HR team for manual review
  - Low Score (<50): Sends professional rejection emails
- **Multi-Channel Notifications**: Integrated email and Slack notifications to keep teams informed in real-time
- **Complete Audit Trail**: All applications logged to Google Sheets for compliance and analytics

### Finance Automation Dashboard
- **AI Invoice Processing**: Intelligent extraction of invoice details including vendor information, amounts, dates, and line items
- **Smart Approval Workflows**:
  - <$500: Automatically approved and processed
  - $500-$5,000: Routed to manager for approval
  - ≥$5,000: Escalated to CFO for review
- **Fraud Detection**: AI-powered duplicate detection and risk analysis to prevent payment fraud
- **Real-Time Notifications**: Instant email and Slack alerts for all stakeholders
- **Financial Audit Trail**: Complete transaction logging in Google Sheets for accounting and compliance

---

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.0 with TypeScript for type-safe development
- Tailwind CSS for modern, responsive styling
- Framer Motion for smooth animations and transitions
- React Router v7 for seamless navigation
- Axios for robust API communication

**Backend:**
- n8n Workflow Automation for intelligent process orchestration
- Webhook-based architecture for real-time processing
- Multi-node workflows with conditional logic and AI integration

---

## 📦 Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Falco0906/quantum-sync.git
cd quantum-sync
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
Create a `.env` file in the root directory:
```bash
REACT_APP_WEBHOOK_URL=https://falco.app.n8n.cloud/webhook/automation
```

4. **Start the development server:**
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

5. **Build for production:**
```bash
npm run build
```

---

## 🔧 Configuration

### n8n Webhook Integration

The application communicates with n8n through a unified webhook endpoint:
- **Webhook URL**: `https://falco.app.n8n.cloud/webhook/automation`
- **HR Dashboard**: Sends `type: 'hr'` with candidate data and resume PDF
- **Finance Dashboard**: Sends `type: 'finance'` with invoice details

Both dashboards use the same webhook endpoint, with intelligent routing based on the `type` parameter.

To modify the webhook URL, edit `src/services/api.ts`

---

## 📁 Project Structure

```
quantum-sync/
├── src/
│   ├── components/
│   │   ├── Layout.tsx           # Main layout with sidebar navigation
│   │   ├── StatCard.tsx         # Reusable statistics card component
│   │   ├── Toast.tsx            # Toast notification system
│   │   └── LoadingSpinner.tsx   # Loading state indicator
│   ├── pages/
│   │   ├── HRDashboard.tsx      # HR candidate submission interface
│   │   └── FinanceDashboard.tsx # Finance invoice submission interface
│   ├── services/
│   │   └── api.ts               # API service for n8n webhook communication
│   ├── App.tsx                  # Main application with routing setup
│   └── index.css                # Global styles with Tailwind configuration
├── public/                      # Static assets
├── n8n-input-validator-FIXED.js # n8n node code for input validation
└── README.md
```

---

## 🎨 Design Features

- **AI-Themed Interface**: Futuristic dark mode design with vibrant accent colors
- **Gradient Backgrounds**: Dynamic purple-to-blue gradients throughout
- **Smooth Animations**: Framer Motion-powered transitions for enhanced UX
- **Responsive Design**: Fully responsive layout that works seamlessly on all devices
- **Glass Morphism**: Modern frosted glass effects for depth and visual hierarchy
- **Real-Time Feedback**: Instant visual feedback for all user actions

---

## 🔌 API Reference

### Submit HR Candidate
**Endpoint:** POST to webhook URL  
**Type:** `multipart/form-data`  
**Fields:**
- `type`: 'hr'
- `name`: Candidate name
- `email`: Candidate email
- `skills`: Candidate skills (comma-separated)
- `experience`: Years of experience
- `file`: Resume PDF (optional)

### Submit Finance Invoice
**Endpoint:** POST to webhook URL  
**Type:** `multipart/form-data`  
**Fields:**
- `type`: 'finance'
- `vendor`: Vendor name
- `amount`: Invoice amount
- `date`: Invoice date
- `invoiceNumber`: Invoice number
- `lineItems`: Line items (comma-separated)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ by Falco0906

---

**QuantumSync** - Automating the future, one workflow at a time.

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
