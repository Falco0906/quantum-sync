import axios, { AxiosError } from 'axios';

// Use environment variable if available, otherwise use default
// Both HR and Finance use the SAME webhook endpoint
const WEBHOOK_URL = process.env.REACT_APP_WEBHOOK_URL || 'https://falco.app.n8n.cloud/webhook/automation';

export interface CandidateData {
  name: string;
  email: string;
  skills: string[];
  experience: number;
  resumeFile?: File; // PDF file upload
}

export interface InvoiceData {
  vendor: string;
  amount: number;
  date: string;
  lineItems: string[];
  invoiceNumber: string;
}

// Wrapper types to identify request type in single workflow
interface HRRequest {
  type: 'hr';
  data: CandidateData;
}

interface FinanceRequest {
  type: 'finance';
  data: InvoiceData;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

// Configure axios defaults
axios.defaults.timeout = 30000; // 30 seconds timeout
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Optional: Add authentication header if needed
// axios.defaults.headers.common['X-API-Key'] = 'your-api-key-here';

export const api = {
  async submitCandidate(candidateData: CandidateData): Promise<ApiResponse> {
    try {
      // Create FormData - MATCH POSTMAN EXACTLY
      const formData = new FormData();
      
      // Add each field individually, just like Postman
      formData.append('type', 'hr');
      formData.append('name', candidateData.name);
      formData.append('email', candidateData.email);
      formData.append('skills', candidateData.skills.join(', '));
      formData.append('experience', candidateData.experience.toString());
      
      // Add the PDF file if provided
      if (candidateData.resumeFile) {
        formData.append('file', candidateData.resumeFile, candidateData.resumeFile.name);
      }
      
      console.log('🚀 Submitting HR candidate to n8n webhook');
      console.log('📍 URL:', WEBHOOK_URL);
      console.log('📋 Type: hr');
      console.log('📄 File:', candidateData.resumeFile?.name);
      
      const response = await axios.post(WEBHOOK_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      console.log('✅ n8n response:', response.data);
      
      return {
        success: true,
        message: 'Candidate submitted successfully',
        data: response.data
      };
    } catch (error) {
      console.error('❌ Error submitting candidate:', error);
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('📛 Response error status:', axiosError.response.status);
          console.error('📛 Response error data:', axiosError.response.data);
          
          const errorData: any = axiosError.response.data;
          const errorMsg = errorData?.message || errorData?.error || JSON.stringify(axiosError.response.data);
          throw new Error(`n8n Error (${axiosError.response.status}): ${errorMsg}`);
        } else if (axiosError.request) {
          console.error('📛 No response received:', axiosError.request);
          throw new Error('No response from server. Please check your network connection or n8n workflow.');
        }
      }
      
      throw new Error('Failed to submit candidate. Please try again.');
    }
  },

  async submitInvoice(invoiceData: InvoiceData): Promise<ApiResponse> {
    try {
      // Create FormData - MATCH POSTMAN EXACTLY
      const formData = new FormData();
      
      // Add each field individually, just like Postman
      formData.append('type', 'finance');
      formData.append('vendor', invoiceData.vendor);
      formData.append('amount', invoiceData.amount.toString());
      formData.append('date', invoiceData.date);
      formData.append('invoiceNumber', invoiceData.invoiceNumber);
      formData.append('lineItems', invoiceData.lineItems.join(', '));
      
      console.log('🚀 Submitting Finance invoice to n8n webhook');
      console.log('📍 URL:', WEBHOOK_URL);
      console.log('📋 Type: finance');
      
      const response = await axios.post(WEBHOOK_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      console.log('✅ n8n response:', response.data);
      
      return {
        success: true,
        message: 'Invoice submitted successfully',
        data: response.data
      };
    } catch (error) {
      console.error('❌ Error submitting invoice:', error);
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('📛 Response error status:', axiosError.response.status);
          console.error('📛 Response error data:', axiosError.response.data);
          
          const errorData: any = axiosError.response.data;
          const errorMsg = errorData?.message || errorData?.error || JSON.stringify(axiosError.response.data);
          throw new Error(`n8n Error (${axiosError.response.status}): ${errorMsg}`);
        } else if (axiosError.request) {
          console.error('📛 No response received:', axiosError.request);
          throw new Error('No response from server. Please check your network connection or n8n workflow.');
        }
      }
      
      throw new Error('Failed to submit invoice. Please try again.');
    }
  },

  // Test connection to n8n webhook
  async testConnection(): Promise<boolean> {
    try {
      await axios.get(WEBHOOK_URL.replace('/automation', '/'));
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
};