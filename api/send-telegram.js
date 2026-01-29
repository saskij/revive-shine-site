export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return new Response('Missing Telegram env vars', { status: 500 });
  }

  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://revive-shine-site.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ];

  // Basic CSRF/Origin check (optional but recommended)
  // if (origin && !allowedOrigins.some(o => origin.startsWith(o))) {
  //   return new Response('Unauthorized origin', { status: 403 });
  // }

  let form;
  try {
    form = await request.formData();
  } catch (err) {
    return new Response('Invalid form data', { status: 400 });
  }

  // Honeypot check
  if (form.get('fi-honeypot')) {
    console.log('Spam detected via honeypot');
    return new Response(JSON.stringify({ ok: true, spam: true }), { status: 200 });
  }

  const name = String(form.get('fi-sender-firstName') || '');
  const phone = String(form.get('fi-sender-phone') || '');
  const message = String(form.get('fi-text-message') || '');

  const textLines = [
    '🆕 New Order!',
    `👤 Name: ${name || 'Not provided'}`,
    `📞 Phone: ${phone || 'Not provided'}`,
    `💬 Message: ${message || 'No message'}`,
  ];

  const messageRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: textLines.join('\n'),
    }),
  });

  if (!messageRes.ok) {
    return new Response('Failed to send message', { status: 502 });
  }

  const files = form.getAll('file');
  for (const file of files) {
    if (!file || typeof file === 'string') continue;
    const photoData = new FormData();
    photoData.append('chat_id', chatId);
    photoData.append('photo', file, file.name || 'photo.jpg');

    const photoRes = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      body: photoData,
    });

    if (!photoRes.ok) {
      return new Response('Failed to send photo', { status: 502 });
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
