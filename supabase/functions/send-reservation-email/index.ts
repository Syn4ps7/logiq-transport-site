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

// Generate unique reservation reference: LQ-YYYYMMDD-XXX
function generateReservationReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `LQ-${year}${month}${day}-${random}`;
}

const SENDER_NAME = "LogIQ Transport";
const SENDER_EMAIL = "contact@logiq-transport.ch";

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

    // Generate unique reservation reference
    const reservationRef = generateReservationReference();
    console.log(`Generated reservation reference: ${reservationRef}`);

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

    // Build business email HTML
    const businessEmailHtml = `
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
      <p style="margin: 10px 0 0 0; font-size: 1.1em;">Référence: <strong>${reservationRef}</strong></p>
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

    // Build client confirmation email HTML
    const clientEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f97316; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .notice { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px; }
    .notice strong { color: #b45309; }
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
      <h1>🚚 Confirmation de votre demande</h1>
      <p style="margin: 10px 0 0 0; font-size: 1.1em;">Référence: <strong>${reservationRef}</strong></p>
    </div>
    <div class="content">
      <p>Bonjour <strong>${data.clientName}</strong>,</p>
      <p>Nous avons bien reçu votre demande de réservation. Merci de votre confiance !</p>
      
      <div class="notice">
        <strong>⚠️ Demande en attente de confirmation</strong><br>
        Cette demande est soumise à confirmation de disponibilité. Nous vous contacterons dans les plus brefs délais pour valider votre réservation.<br>
        <strong>Votre numéro de référence: ${reservationRef}</strong>
      </div>
      
      <div class="section">
        <h3>📅 Récapitulatif de votre demande</h3>
        <div class="info-row"><span class="label">Date de début:</span><span class="value">${data.startDate} à ${data.startTime}</span></div>
        <div class="info-row"><span class="label">Date de fin:</span><span class="value">${data.endDate} à ${data.endTime}</span></div>
        <div class="info-row"><span class="label">Durée:</span><span class="value">${data.duration}</span></div>
      </div>
      
      <div class="section">
        <h3>🚐 Véhicule demandé</h3>
        <div class="info-row"><span class="label">Modèle:</span><span class="value">${data.vehicleName}</span></div>
        <div class="info-row"><span class="label">Description:</span><span class="value">${data.vehicleDescription}</span></div>
      </div>
      
      <div class="section">
        <h3>⚙️ Options</h3>
        <div class="info-row"><span class="label">Options choisies:</span><span class="value">${data.options}</span></div>
      </div>
      
      <div class="section">
        <h3>💰 Estimation tarifaire</h3>
        <div class="info-row"><span class="label">Jours semaine (${data.weekdayCount}):</span><span class="value">${data.weekdayCount} × 140 CHF</span></div>
        <div class="info-row"><span class="label">Jours week-end (${data.weekendCount}):</span><span class="value">${data.weekendCount} × 180 CHF</span></div>
        <div class="info-row"><span class="label">Total véhicule:</span><span class="value">${data.vehicleTotal}</span></div>
        <div class="info-row"><span class="label">Total options:</span><span class="value">${data.optionsTotal}</span></div>
      </div>
      
      <div class="total">
        ESTIMATION: ${data.totalPrice}
      </div>
      
      <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
        <em>* Le montant final sera confirmé lors de la validation de votre réservation. 100 km inclus par jour, km supplémentaire à 0.70 CHF.</em>
      </p>
    </div>
    <div class="footer">
      <p>À bientôt !<br>L'équipe de location</p>
      <p style="font-size: 0.8em;">Cet email est envoyé automatiquement, merci de ne pas y répondre directement.</p>
    </div>
  </div>
</body>
</html>
    `;

    const fromAddress = `${SENDER_NAME} <${smtpUser}>`;

    // Send email to business
    await client.send({
      from: fromAddress,
      to: smtpUser,
      subject: `[${reservationRef}] Nouvelle réservation: ${data.vehicleName} - ${data.startDate}`,
      content: businessEmailHtml,
      html: businessEmailHtml,
    });

    // Send confirmation email to client
    await client.send({
      from: fromAddress,
      to: data.clientEmail,
      subject: `[${reservationRef}] Confirmation de votre demande de réservation`,
      content: clientEmailHtml,
      html: clientEmailHtml,
    });

    await client.close();

    console.log("Reservation emails sent successfully (business + client)");

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
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
