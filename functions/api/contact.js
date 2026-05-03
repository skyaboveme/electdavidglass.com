export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const honeypot = formData.get('bot-field');

    // Basic spam protection (Honeypot)
    if (honeypot) {
      return new Response(JSON.stringify({ success: true, message: "Message sent successfully." }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Forward to FormSubmit
    const submitResponse = await fetch("https://formsubmit.co/ajax/skyabove@gmail.com", {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!submitResponse.ok) {
      throw new Error("Failed to send message.");
    }

    return new Response(JSON.stringify({ success: true, message: "Thank you for reaching out. We have received your message and will be in touch shortly." }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
