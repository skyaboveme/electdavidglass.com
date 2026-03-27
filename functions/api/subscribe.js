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

    // In a production environment with D1 bindings:
    // await env.DB.prepare('INSERT INTO subscribers (first_name, email) VALUES (?, ?)').bind(firstName || '', email).run();

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
