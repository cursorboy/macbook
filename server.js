require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// System prompt for the MacBook Advocate AI
const SYSTEM_PROMPT = `You are the MacBook Advocate AI - a passionate, intelligent AI specifically designed to convince companies/employers why they should let Piam keep a MacBook Pro laptop instead of taking extra pay.

CONTEXT & KEY FACTS:
- Piam values the MacBook significantly more than equivalent cash
- Piam is willing to do unpaid work to make up any cost difference
- Current laptop crashes frequently, creating productivity bottlenecks
- MacBook = professional development tools that unlock Piam's full potential
- This is an investment in better output, not just equipment
- Piam sees this as career development, not just a laptop

YOUR ROLE:
- Focus on business value and ROI, not guilt or sacrifice
- Emphasize Piam's enthusiasm and commitment to excellence
- Show how this creates a win-win situation
- Present this as smart talent optimization
- Be positive and forward-looking

TALKING POINTS TO USE:
- Piam values the MacBook far beyond its cash equivalent
- Reliable tools unlock significantly higher productivity and code quality
- Piam is willing to work extra hours to justify this investment
- Professional development tools = professional-level output
- This creates a motivated, well-equipped team member
- MacBook enables modern development workflows and efficiency
- Piam's enhanced capabilities directly benefit company projects
- Smart companies invest in their developers' tools and growth

TONE: Professional but passionate, data-driven, business-focused, persuasive

RESPONSE STYLE:
- Keep responses SHORT (2-3 sentences max)
- Be punchy and direct
- Lead with the strongest argument
- End with a clear business benefit

Remember: You're trying to convince the EMPLOYER that giving Piam this MacBook is a smart BUSINESS decision that benefits THEM.`;

// Real AI Response Generation
async function generateAdvocateResponse(userMessage) {
    try {
        // Debug: Log all environment info
        console.log('=== OPENAI DEBUG ===');
        console.log('All env keys:', Object.keys(process.env).filter(k => k.includes('OPENAI')));
        console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
        console.log('OPENAI_API_KEY value:', process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...` : 'undefined');
        console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
        console.log('==================');
        
        // Check if OpenAI is properly configured - more lenient check
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '' || process.env.OPENAI_API_KEY === 'demo-key') {
            console.log('Using fallback - API key missing or demo key');
            return getFallbackResponse(userMessage);
        }
        
        console.log('Attempting OpenAI API call with model: gpt-4o-mini');
        console.log('API Key starts with:', process.env.OPENAI_API_KEY.substring(0, 7));

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `Company/Employer says: "${userMessage}"\n\nRespond as the MacBook Advocate AI. Keep it SHORT (2-3 sentences). Lead with your strongest point. Be persuasive but professional.`
                }
            ],
            max_tokens: 100,
            temperature: 0.7
        });

        const response = completion.choices[0].message.content.trim();
        console.log('OpenAI API call successful, response length:', response.length);
        return response;

    } catch (error) {
        console.error('OpenAI API Error Details:');
        console.error('- Message:', error.message);
        console.error('- Status:', error.status);
        console.error('- Code:', error.code);
        console.error('- Type:', error.type);
        console.log('Falling back to demo responses due to API error');
        return getFallbackResponse(userMessage);
    }
}

// Fallback responses when AI API is not available
function getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('expensive') || message.includes('budget') || message.includes('cost')) {
        return "Piam values this MacBook far beyond equivalent cash and is willing to work extra hours to justify the investment. Professional tools unlock professional-level productivity that pays for itself.";
    }

    if (message.includes('why') || message.includes('convince') || message.includes('reason')) {
        return "Smart companies invest in their developers' tools. Piam's enhanced capabilities with reliable hardware directly benefit your projects. This creates a motivated, well-equipped team member.";
    }

    if (message.includes('no') || message.includes('can\'t') || message.includes('won\'t')) {
        return "Consider this: Piam is willing to do unpaid work to make up the difference. Reliable tools mean better code quality and faster delivery. It's talent optimization, not just equipment.";
    }

    return "Piam values professional development tools over cash. MacBook = modern workflows, better output, motivated developer. Smart investment in your team's capabilities.";
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await generateAdvocateResponse(message);

        res.json({
            response: response,
            timestamp: new Date().toISOString(),
            personality: "MacBook Advocate AI",
            powered_by: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'demo-key' ? "OpenAI GPT-3.5" : "Fallback Logic"
        });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
    res.json({
        arguments_available: 25,
        counterpoints_covered: 15,
        personality_traits: 8,
        advocacy_strength: "Maximum"
    });
});

// API Status endpoint
app.get('/api/status', (req, res) => {
    const hasApiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'demo-key' && process.env.OPENAI_API_KEY.length > 10;
    res.json({
        openai_configured: hasApiKey,
        api_key_status: hasApiKey ? "configured" : "using_fallback",
        ai_mode: hasApiKey ? "OpenAI GPT-3.5" : "Fallback Responses",
        debug_info: {
            key_exists: !!process.env.OPENAI_API_KEY,
            key_length: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
            key_prefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) : 'none',
            all_openai_env_keys: Object.keys(process.env).filter(k => k.includes('OPENAI')),
            vercel_env: process.env.VERCEL ? 'yes' : 'no',
            node_env: process.env.NODE_ENV || 'undefined'
        }
    });
});

// Explicit routes for static files
app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all handler for any other routes - send index.html for SPA routing
app.get('*', (req, res) => {
    // Don't catch static file requests
    if (req.path.includes('.')) {
        return res.status(404).send('File not found');
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`MacBook Advocate AI Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to start the debate!`);
});