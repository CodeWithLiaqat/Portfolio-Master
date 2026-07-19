import { Router, type IRouter } from "express";
import { z } from "zod";

const router: IRouter = Router();

const ContactInput = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  projectType: z.string().max(100).optional(),
  message: z.string().min(10).max(5000),
});

router.post("/contact", async (req, res) => {
  const parsed = ContactInput.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const { name, email, projectType, message } = parsed.data;

  req.log.info({ name, email, projectType }, "Contact form submission received");

  // Send via Resend if API key is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "NEXA Contact <contact@nexa.studio>",
          to: ["hello@nexa.studio"],
          reply_to: email,
          subject: `New project inquiry from ${name}${projectType ? ` — ${projectType}` : ""}`,
          html: `
            <div style="font-family: 'JetBrains Mono', monospace; max-width: 600px; padding: 40px; background: #0A0A0C; color: #F5F1E8;">
              <p style="color: #E8C47C; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 32px;">NEW PROJECT INQUIRY — NEXA</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #E8C47C;">${email}</a></p>
              ${projectType ? `<p><strong>Project type:</strong> ${projectType}</p>` : ""}
              <hr style="border-color: rgba(245,241,232,0.1); margin: 24px 0;" />
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        req.log.error({ status: response.status, error: errorText }, "Resend API error");
        res.status(500).json({ error: "Failed to send message. Please try again." });
        return;
      }

      req.log.info({ email }, "Contact email sent via Resend");
    } catch (err) {
      req.log.error({ err }, "Failed to send contact email");
      res.status(500).json({ error: "Failed to send message. Please try again." });
      return;
    }
  } else {
    // No Resend key — log the submission (development mode)
    req.log.info(
      { name, email, projectType, messageLength: message.length },
      "Contact form submission (Resend not configured — set RESEND_API_KEY to enable email delivery)"
    );
  }

  res.status(200).json({ success: true, message: "Message received. We'll be in touch within one business day." });
});

export default router;
