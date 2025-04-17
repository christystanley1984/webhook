export const config = {
  runtime: 'edge'
};



export default async function handler(req) {
  // Handle verification request
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');
    
    // Use the SAME token you entered in Meta's dashboard
    const VERIFY_TOKEN = 'my_webhook_token_123';
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    } else {
      return new Response('Verification failed', { status: 403 });
    }
  }
  
  // Handle regular webhook events
  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
