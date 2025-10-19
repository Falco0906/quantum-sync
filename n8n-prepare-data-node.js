// Prepare Data Node - Transforms validated input for workflow processing
// This node converts the web form data into the format your workflow expects

const inputData = $json;

console.log('Processing type:', inputData.type);
console.log('Has file:', inputData.hasFile);

// For HR submissions
if (inputData.type === 'hr') {
  const hrData = inputData.data;
  
  return {
    json: {
      // Candidate information
      candidate_name: hrData.name,
      candidate_email: hrData.email,
      
      // Skills - convert array to string if needed
      skills: Array.isArray(hrData.skills) 
        ? hrData.skills.join(', ') 
        : hrData.skills,
      
      // Experience
      experience_years: hrData.experience,
      
      // Resume link (not a file, just a URL)
      resume_url: hrData.resumeUrl,
      
      // Metadata
      source: 'web_application',
      submission_date: new Date().toISOString(),
      hasFile: inputData.hasFile || false,
      
      // For scoring/routing in next nodes
      type: 'hr'
    }
  };
}

// For Finance submissions
if (inputData.type === 'finance') {
  const financeData = inputData.data;
  
  return {
    json: {
      // Vendor information
      vendor_name: financeData.vendor,
      
      // Invoice details
      invoice_number: financeData.invoiceNumber,
      invoice_amount: parseFloat(financeData.amount),
      invoice_date: financeData.date,
      
      // Line items - convert array to string if needed
      line_items: Array.isArray(financeData.lineItems)
        ? financeData.lineItems.join('\n')
        : financeData.lineItems,
      
      // Metadata
      source: 'web_submission',
      submission_date: new Date().toISOString(),
      hasFile: inputData.hasFile || false,
      
      // For routing in next nodes
      type: 'finance'
    }
  };
}

// Fallback - just pass through
console.warn('Unknown type, passing through:', inputData.type);
return { json: inputData };
