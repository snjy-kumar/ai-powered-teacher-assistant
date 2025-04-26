// File: pages/api/generate.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { NextApiRequest, NextApiResponse } from 'next';

interface GenerateRequest {
  code: string;
  action?: 'debug' | 'improve' | 'fix';
  question?: string;
}

interface GenerateResponse {
  suggestion?: string;
  response?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, action, question } = req.body as GenerateRequest;
  
  // Validate request
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }
  
  // Check if API key exists
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    let prompt = '';
    
    // Handle different request types
    if (action) {
      // For code actions (debug, improve, fix)
      prompt = generateActionPrompt(action, code);
    } else if (question) {
      // For questions about code
      prompt = generateQuestionPrompt(question, code);
    } else {
      return res.status(400).json({ error: 'Either action or question must be provided' });
    }
    
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    
    // Return appropriate response based on the request type
    if (action) {
      return res.status(200).json({ suggestion: responseText });
    } else {
      return res.status(200).json({ response: responseText });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to process request' 
    });
  }
}

// Helper functions to create prompts
function generateActionPrompt(action: 'debug' | 'improve' | 'fix', code: string): string {
  const promptTemplates = {
    debug: `As a coding expert, analyze this code for bugs and provide fixes. Explain each issue found, then provide the corrected code:

${code}

First list the issues identified, then provide the fixed code.`,
    
    improve: `As a coding expert, improve this code for better readability, performance, and best practices. Provide the improved code with explanations:

${code}

Explain your improvements first, then provide the enhanced code.`,
    
    fix: `As a coding expert, fix any errors or issues in this code. Provide the corrected version:

${code}

Start with a brief explanation of the issues, then provide the fixed code.`
  };
  
  return promptTemplates[action];
}

function generateQuestionPrompt(question: string, code: string): string {
  return `As a coding expert, answer this question about the following code:

Question: ${question}

Code:
${code}

Provide a clear, concise answer that directly addresses the question.`;
}