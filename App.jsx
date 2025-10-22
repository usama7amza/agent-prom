import { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const N8N_WEBHOOK_URL = "https://your-n8n-domain/webhook/agent-prom";

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResult(data.output || '✅ Sent successfully to n8n. Check your workflow.');
    } catch (err) {
      console.error(err);
      setResult('⚠️ Error: Check your webhook URL or server.');
    }
    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center justify-center p-6'>
      <motion.div className='text-center mb-10' initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className='text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
          Connect Ideas to Automation
        </h1>
        <p className='text-lg md:text-xl text-gray-300 max-w-2xl mx-auto'>
          Type your thoughts — Agent Prom sends them directly to your n8n workflow.
        </p>
      </motion.div>
      <textarea
        className='w-full max-w-2xl p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500'
        rows='5'
        placeholder='Write your idea or command — I’ll send it to your n8n workflow.'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading} className='mt-4 py-3 px-8 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:opacity-90 transition-opacity'>
        {loading ? 'Sending...' : 'Send to n8n Workflow'}
      </button>
      {result && <div className='mt-6 p-5 rounded-lg bg-gray-900 border border-gray-700 whitespace-pre-wrap text-sm shadow-inner'>{result}</div>}
      <footer className='mt-10 text-sm text-gray-400 text-center'>© {new Date().getFullYear()} Agent Prom — Powered by n8n & AI.</footer>
    </div>
  );
}