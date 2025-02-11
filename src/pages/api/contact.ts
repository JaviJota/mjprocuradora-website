import type { APIRoute } from "astro";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_APIKEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const nombre = (data.get("nombre") as string).trim();
    const apellido = (data.get("apellido") as string).trim();
    const email = (data.get("email") as string).trim();
    const teléfono = (data.get("teléfono") as string).trim();
    const descripción = (data.get("descripción") as string).trim();

    if (!nombre || !apellido || !email || !teléfono || !descripción) {
      return new Response(JSON.stringify({ error: "Todos los campos son obligatorios." }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Correo electrónico inválido." }), { status: 400 });
    }

    const phoneRegex = /^[0-9\s\-\+()]+$/;
    if (!phoneRegex.test(teléfono) || teléfono.length < 9) {
      return new Response(JSON.stringify({ error: "Número de teléfono inválido." }), { status: 400 });
    }

    const ownerResponse = await resend.emails.send({
      from: "MJ Procuradora <info@procuradoracordoba.com>",
      to: "mjcarralero@cordoba.cgpe.net",
      subject: "Formulario de Contacto",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #2A3B47; color: white; padding: 20px; border-radius: 10px;">
          <h2 style="color: #bfa76a; text-align: center;">Formulario de Contacto</h2>
          <div style="background-color: #1e2a33; padding: 15px; border-radius: 8px;">
            <p style="color: white"><strong style="color: #bfa76a;">Nombre:</strong> ${nombre} ${apellido}</p>
            <p style="color: white"><strong style="color: #bfa76a;">Email:</strong> ${email}</p>
            <p style="color: white"><strong style="color: #bfa76a;">Teléfono:</strong> ${teléfono}</p>
            <p style="color: white"><strong style="color: #bfa76a;">Mensaje:</strong> ${descripción}</p>
          </div>
        </div>
      `,
    });
    
    if (ownerResponse.error) {
      throw new Error('Error al enviar formulario');
    }

    const clientResponse = await resend.emails.send({
      from: "MJ Procuradora <info@procuradoracordoba.com>",
      to: email,
      subject: "Formulario recibido con éxito",
      html: `
        <h3>¡Hemos recibido tu formulario!</h3>
        <p>Nos pondremos en contacto contigo a la mayor brevedad posible.</p>
        <p>Un saludo,</p>
        <p>María Jose Carralero Medina</p>
      `, 
    })

    if (clientResponse.error) {
      throw new Error('Error al enviar confirmación');
    }
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response(JSON.stringify({ error: "Ocurrió un error al procesar tu solicitud." }), { status: 500 });
  }
}
