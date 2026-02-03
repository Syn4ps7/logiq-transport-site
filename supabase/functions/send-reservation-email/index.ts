import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ReservationRequest {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  vehicleName: string;
  vehicleDescription: string;
  duration: string;
  options: string;
  totalPrice: string;
  weekdayCount: number;
  weekendCount: number;
  vehicleTotal: string;
  optionsTotal: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ReservationRequest = await req.json();

    // Validate required fields
    if (!data.clientName || !data.clientEmail || !data.startDate || !data.vehicleName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get SMTP credentials from environment
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Missing SMTP configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: true,
        auth: {
          username: smtpUser,
          password: smtpPass,
        },
      },
    });

    // Build email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f97316; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .section { margin-bottom: 20px; }
    .section h3 { color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 5px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .label { color: #666; }
    .value { font-weight: bold; }
    .total { background: #f97316; color: white; padding: 15px; text-align: center; font-size: 1.3em; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚚 Nouvelle Demande de Réservation</h1>
    </div>
    <div class="content">
      <div class="section">
        <h3>👤 Informations Client</h3>
        <div class="info-row"><span class="label">Nom:</span><span class="value">${data.clientName}</span></div>
        <div class="info-row"><span class="label">Email:</span><span class="value">${data.clientEmail}</span></div>
        <div class="info-row"><span class="label">Téléphone:</span><span class="value">${data.clientPhone}</span></div>
      </div>
      
      <div class="section">
        <h3>📅 Détails de la Réservation</h3>
        <div class="info-row"><span class="label">Date de début:</span><span class="value">${data.startDate} à ${data.startTime}</span></div>
        <div class="info-row"><span class="label">Date de fin:</span><span class="value">${data.endDate} à ${data.endTime}</span></div>
        <div class="info-row"><span class="label">Durée:</span><span class="value">${data.duration}</span></div>
      </div>
      
      <div class="section">
        <h3>🚐 Véhicule</h3>
        <div class="info-row"><span class="label">Modèle:</span><span class="value">${data.vehicleName}</span></div>
        <div class="info-row"><span class="label">Description:</span><span class="value">${data.vehicleDescription}</span></div>
      </div>
      
      <div class="section">
        <h3>⚙️ Options</h3>
        <div class="info-row"><span class="label">Options choisies:</span><span class="value">${data.options}</span></div>
      </div>
      
      <div class="section">
        <h3>💰 Tarification</h3>
        <div class="info-row"><span class="label">Jours semaine (${data.weekdayCount}):</span><span class="value">${data.weekdayCount} × 140 CHF</span></div>
        <div class="info-row"><span class="label">Jours week-end (${data.weekendCount}):</span><span class="value">${data.weekendCount} × 180 CHF</span></div>
        <div class="info-row"><span class="label">Total véhicule:</span><span class="value">${data.vehicleTotal}</span></div>
        <div class="info-row"><span class="label">Total options:</span><span class="value">${data.optionsTotal}</span></div>
      </div>
      
      <div class="total">
        TOTAL: ${data.totalPrice}
      </div>
    </div>
    <div class="footer">
      <p>Ce message a été envoyé automatiquement depuis le formulaire de réservation.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email
    await client.send({
      from: smtpUser,
      to: smtpUser, // Send to yourself (business email)
      subject: `Nouvelle réservation: ${data.vehicleName} - ${data.startDate}`,
      content: emailHtml,
      html: emailHtml,
    });

    await client.close();

    console.log("Reservation email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
