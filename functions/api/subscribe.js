export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName');
    const email = formData.get('email');

    // Note: Footer form sends 'email' only, while index form sends firstName + email.
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Add a custom subject for context
    formData.append('_subject', 'New Newsletter Subscriber: ' + email);

    // Forward to FormSubmit
    const submitResponse = await fetch("https://formsubmit.co/ajax/dglass@sbstexas.com", {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!submitResponse.ok) {
      throw new Error("Failed to send subscription.");
    }

    return new Response(JSON.stringify({ success: true, message: "You're signed up. Watch your inbox for updates from Precinct 4." }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
