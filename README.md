# 🤖 Let Me Keep The Mac - AI Advocate

A persuasive website with an integrated AI chatbot that argues why Piam should keep their MacBook instead of taking extra pay.

## Features

- **Real AI Chatbot** powered by OpenAI GPT-3.5
- **Dynamic Arguments** based on real data ($8,800/month internship sacrifice)
- **Interactive UI** with scroll animations and engaging visuals
- **Business-focused messaging** emphasizing ROI and productivity

## Quick Deploy

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variable: `OPENAI_API_KEY`
3. Deploy automatically

### Heroku
1. `heroku create piam-macbook-advocate`
2. `heroku config:set OPENAI_API_KEY=your_key_here`
3. `git push heroku main`

### Netlify
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.`
4. Add environment variables

## Environment Variables

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

## Local Development

```bash
npm install
npm start
# Visit http://localhost:3004
```

## The Argument

- Piam gave up $8,800/month internship for this startup
- Current laptop crashes constantly, killing productivity
- Alternative: 100+ hours at Target just to afford a MacBook
- MacBook now = immediate productivity vs months of work elsewhere

Perfect for showing your boss why this is a smart business decision! 🚀