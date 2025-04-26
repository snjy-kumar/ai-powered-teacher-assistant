export const dynamic = 'force-dynamic'; 

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// Interface for a quiz question
interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

// Interface for the request body
interface RequestBody {
    topic: string;
}

// Type for API responses
type ApiResponse = 
    | { success: true; data: QuizQuestion[] }
    | { success: false; error: string };
    
    interface PostRequest extends Request {
        json: () => Promise<RequestBody>;
    }

    interface ErrorResponse {
        success: false;
        error: string;
    }

    interface SuccessResponse {
        success: true;
        data: QuizQuestion[];
    }

    type ResponseData = ErrorResponse | SuccessResponse;

    export async function POST(request: PostRequest): Promise<Response> {
        try {
            const contentType = request.headers.get('content-type');
            if (!contentType?.includes('application/json')) {
                return Response.json(
                    { success: false, error: 'Invalid content type' } as ErrorResponse,
                    { status: 415 }
                );
            }

            const { topic } = await request.json();
            
            
            if (!topic || typeof topic !== 'string') {
                return Response.json(
                    { success: false, error: 'Valid topic parameter required' } as ErrorResponse,
                    { status: 400 }
                );
            }

            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `Generate a quiz with 5 questions about ${topic}. Format as JSON array with:
            - question
            - options (array of 4 strings)
            - correctAnswer (index 0-3)
            Example:
            [{
              "question": "...",
              "options": ["...", "...", "...", "..."],
              "correctAnswer": 0
            }]`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

            try {
                const quizData = JSON.parse(text);
                if (!Array.isArray(quizData)) throw new Error('Invalid quiz format');
                
                return Response.json({ 
                    success: true, 
                    data: quizData.slice(0, 5) // Ensure max 5 questions
                } as SuccessResponse);
            } catch (e: unknown) {
                const errorMessage = e instanceof Error ? e.message : String(e);
                console.error('Parsing error:', errorMessage, 'Text:', text);
                return Response.json({ 
                    success: false, 
                    error: "Failed to generate valid quiz format. Please try again." 
                } as ErrorResponse, { status: 500 });
            }
        } catch (error: unknown) {
            console.error('API Error:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            return Response.json({
                success: false,
                error: errorMessage || "Internal server error"
            } as ErrorResponse, { status: 500 });
        }
    }