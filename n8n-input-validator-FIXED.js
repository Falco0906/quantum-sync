// Get the incoming data - NOW MATCHES POSTMAN FORMAT
const inputJson = $input.item.json;
const binary = $input.item.binary;

console.log('=== DEBUG: Raw Input ===');
console.log('Full JSON:', JSON.stringify(inputJson, null, 2));
console.log('Has binary:', !!binary);
console.log('Binary file:', binary?.file);
console.log('=== ALL KEYS ===');
console.log('Keys in inputJson:', Object.keys(inputJson));

// Check if body is a URL-encoded string (FormData from multipart)
let parsedData = inputJson;
if (inputJson.body && typeof inputJson.body === 'string') {
  console.log('Body is string, attempting to parse...');
  // If it's URL-encoded form data like "type=hr&name=John&email=test@email.com"
  if (inputJson.body.includes('=') && inputJson.body.includes('&')) {
    console.log('Parsing URL-encoded form data');
    const params = new URLSearchParams(inputJson.body);
    parsedData = {};
    for (const [key, value] of params.entries()) {
      parsedData[key] = value;
    }
    console.log('Parsed form data:', parsedData);
  } else {
    // Try JSON parse
    try {
      parsedData = JSON.parse(inputJson.body);
      console.log('Parsed as JSON:', parsedData);
    } catch (e) {
      console.log('Not JSON, using original');
    }
  }
} else if (inputJson.body && typeof inputJson.body === 'object') {
  console.log('Body is object, using it directly');
  parsedData = inputJson.body;
}

// Extract type - check multiple possible locations
let type = parsedData.type || inputJson.type || inputJson.body?.type || $input.item.json.type;

console.log('=== Extracted Data ===');
console.log('Type:', type);
console.log('Type location check:');
console.log('  parsedData.type:', parsedData.type);
console.log('  inputJson.type:', inputJson.type);
console.log('  inputJson.body:', inputJson.body);

// Validate type field exists
if (!type) {
  console.error('❌ Could not find type field!');
  console.error('Available fields:', Object.keys(inputJson));
  throw new Error('Missing required field: type (must be "hr" or "finance"). Available fields: ' + Object.keys(inputJson).join(', '));
}

// Validate type value
if (!type.match(/^(hr|finance)$/)) {
  throw new Error('Invalid type. Must be "hr" or "finance". Got: ' + type);
}

// Build data object from form fields
let data = {};

// Helper function to get field value from multiple possible locations
function getField(fieldName) {
  return parsedData[fieldName] ||
         inputJson[fieldName] || 
         inputJson.body?.[fieldName] || 
         inputJson.params?.[fieldName] || 
         inputJson.query?.[fieldName];
}

console.log('=== Field Extraction Debug ===');
console.log('Looking for fields in:', {
  parsedDataFields: Object.keys(parsedData),
  directFields: Object.keys(inputJson),
  hasBody: !!inputJson.body,
  hasParams: !!inputJson.params,
  hasQuery: !!inputJson.query
});

// Type-specific validation for HR
if (type === 'hr') {
  const email = getField('email');
  const name = getField('name');
  const skills = getField('skills');
  const experience = getField('experience');
  
  console.log('HR Fields found:', { email, name, skills, experience });
  
  // Extract HR fields
  if (!email) {
    console.error('Available fields:', Object.keys(inputJson));
    throw new Error('Email required for HR submissions. Available fields: ' + Object.keys(inputJson).join(', '));
  }
  
  if (!name) {
    console.error('Available fields:', Object.keys(inputJson));
    throw new Error('Candidate name required for HR submissions. Available fields: ' + Object.keys(inputJson).join(', '));
  }
  
  data = {
    name: name,
    email: email,
    skills: skills,
    experience: experience
  };
  
  // FILE VALIDATION - Only for HR submissions with file
  if (binary && binary.file) {
    console.log('Has file:', !!binary.file);
    
    // Validate file type
    const fileName = binary.file.fileName || '';
    if (!fileName.toLowerCase().endsWith('.pdf')) {
      throw new Error('File must be a PDF');
    }

    // Validate file size (max 10MB)
    const fileSize = binary.file.fileSize || 0;
    if (fileSize > 10 * 1024 * 1024) {
      throw new Error('File too large. Max 10MB');
    }
    
    console.log('File validation passed:', fileName);
  }
}

// Type-specific validation for Finance
if (type === 'finance') {
  const vendor = getField('vendor');
  const amount = getField('amount');
  const date = getField('date');
  const invoiceNumber = getField('invoiceNumber');
  const lineItems = getField('lineItems');
  
  console.log('Finance Fields found:', { vendor, amount, date, invoiceNumber, lineItems });
  
  // Extract Finance fields
  if (!vendor) {
    console.error('Available fields:', Object.keys(inputJson));
    throw new Error('Vendor name required for finance submissions. Available fields: ' + Object.keys(inputJson).join(', '));
  }
  
  if (!amount) {
    console.error('Available fields:', Object.keys(inputJson));
    throw new Error('Invoice amount required for finance submissions. Available fields: ' + Object.keys(inputJson).join(', '));
  }
  
  data = {
    vendor: vendor,
    amount: amount,
    date: date,
    invoiceNumber: invoiceNumber,
    lineItems: lineItems
  };
  
  // Finance doesn't need file validation
  console.log('Finance validation passed - no file required');
}

console.log('=== Validation Passed ===');
console.log('Type:', type);
console.log('Data:', data);

// Return the validated data
return {
  json: {
    type: type,
    data: data,
    hasFile: !!(binary && binary.file)
  },
  binary: binary
};
