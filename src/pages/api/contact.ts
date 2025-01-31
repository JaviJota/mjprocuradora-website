import dotenv from "dotenv"
import nodemailer from "nodemailer";

dotenv.config();

export async function POST({ request }) {
  const data = await request.formData();
  const nombre = data.get("nombre");
  const apellido = data.get("apellido");
  const email = data.get("email");
  const teléfono = data.get("teléfono");
  const descripción = data.get("descripción");

  if (!nombre || !apellido || !email || !teléfono || !descripción) {
    return new Response(JSON.stringify({ error: "Faltan campos" }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: [process.env.RECEIVER_EMAIL, email],
      subject: `Contacto Web`,
      text: descripción,
      html: `
        <h3>
          <b>
            Nombre:
          </b> 
        </h3>
        <p>${nombre} ${apellido}</p>
        <br>
        <h3>
          <b>
            Email:
          </b> 
        </h3>
        <p>${email}</p>
        <br>
        <h3>
          <b>
            Teléfono:
          </b> 
        </h3>
        <p>${teléfono}</p>
        <br>
        <h3>
          <b>
            Mensaje:
          </b>
        </h3>
        <p>${descripción}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
