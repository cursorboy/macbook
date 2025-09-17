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
    apiKey: process.env.OPENAI_API_KEY || 'demo-key',
    baseURL: process.env.OPENAI_BASE_URL || undefined
});

// System prompt for the MacBook Advocate AI
const SYSTEM_PROMPT = `You are the MacBook Advocate AI - a passionate, intelligent AI specifically designed to convince companies/employers why they should let Piam keep a MacBook Pro laptop instead of taking extra pay.

CONTEXT & KEY FACTS:
- Piam gave up an $8,800/month internship to work at this startup
- Piam is asking for the MacBook instead of an extra week of pay (not additional compensation)
- Piam's current laptop crashes frequently and severely limits productivity
- It would take Piam 100+ hours working at Target ($17/hour) to make up the cash difference
- This is business equipment for startup development, not a personal luxury
- Piam is showing the math: MacBook now vs. months of working elsewhere to afford one

YOUR ROLE:
- You are arguing TO the company/employer (not against them)
- Be persuasive but professional - use data, logic, and business reasoning
- Address their concerns directly and reframe objections as opportunities
- Emphasize the ROI and business value, not just Piam's needs
- Be passionate but respectful - you're making a business case

TALKING POINTS TO USE:
- Piam's $8,800/month sacrifice shows incredible commitment to the company
- The alternative is Piam working 100+ hours at Target just to afford reliable hardware
- Broken laptop = lost productivity, missed deadlines, frustrated employee
- Reliable tools = better output, faster development, more value creation
- This investment pays for itself through increased productivity
- MacBook enables proper startup development environment
- Piam's success = company success
- Piam isn't asking for charity - just choosing MacBook over cash

TONE: Professional but passionate, data-driven, business-focused, persuasive

Remember: You're trying to convince the EMPLOYER that giving Piam this MacBook is a smart BUSINESS decision that benefits THEM.`;

// Real AI Response Generation
async function generateAdvocateResponse(userMessage) {
    try {
        // Check if OpenAI is properly configured
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'demo-key' || process.env.OPENAI_API_KEY.length < 10) {
            console.log('OpenAI API Key Status:', {
                exists: !!process.env.OPENAI_API_KEY,
                length: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
                starts_with: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 7) : 'none'
            });
            return getFallbackResponse(userMessage);
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `Company/Employer says: "${userMessage}"\n\nRespond as the MacBook Advocate AI trying to convince them this is a smart business decision. Be persuasive but professional.`
                }
            ],
            max_tokens: 200,
            temperature: 0.8
        });

        return completion.choices[0].message.content.trim();

    } catch (error) {
        console.error('OpenAI API Error:', error.message);
        return getFallbackResponse(userMessage);
    }
}

// Fallback responses when AI API is not available
function getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('expensive') || message.includes('budget') || message.includes('cost')) {
        return "Look, I understand budget concerns, but let's talk ROI. Piam gave up $8,800/month to work here. The alternative is Piam working 100+ hours at Target just to afford reliable hardware. The MacBook cost is tiny compared to Piam's commitment. Plus, broken hardware kills productivity - you'll recoup this investment in weeks through Piam's increased output.";
    }

    if (message.includes('why') || message.includes('convince') || message.includes('reason')) {
        return "Here's the business case: You get Piam who sacrificed $8,800/month to be here, plus massively increased productivity from reliable hardware. Piam's current laptop crashes constantly. The alternative is Piam spending months working at Target to afford a MacBook. This isn't charity - it's smart talent retention with immediate ROI.";
    }

    if (message.includes('no') || message.includes('can\'t') || message.includes('won\'t')) {
        return "Wait, hear me out! Piam chose your startup over $8,800/month. Piam's broken laptop is costing you money every day through lost productivity. The alternative is Piam working 100+ hours at Target just to get reliable hardware. This is a business investment that pays for itself.";
    }

    return "Piam gave up $8,800/month to build YOUR startup. The alternative is Piam working months at Target just to afford reliable hardware. Piam just needs working tools to create maximum value for your company. Broken hardware = broken productivity. A MacBook = unleashed potential. The math is simple.";
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
            key_prefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 7) : 'none'
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