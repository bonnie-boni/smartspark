'use server'

import nodemailer from 'nodemailer'

export interface ContactFormState {
  success: boolean | null
  message: string
}

interface ContactFormInput {
  fullName: string
  emailAddress: string
  phoneNumber: string
  serviceNeeded: string
  projectDetails: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    return map[char] ?? char
  })
}

async function sendEmails(input: ContactFormInput): Promise<void> {
  const { fullName, emailAddress, phoneNumber, serviceNeeded, projectDetails } = input

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined
  })

  const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER || ''

  const internalSubject = `🔥 From SmartSpark Portfolio: ${serviceNeeded} - ${fullName}`
  const customerSubject = `We've received your request! — SmartSpark Services. We will get in touch with you soon.`

  const internalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Lead</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;line-height:1.6">
<div style="max-width:640px;margin:0 auto;padding:32px 16px">
  <div style="border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;padding:32px">
    <h2 style="margin:0 0 20px;font-size:20px;color:#0f172a">
      <span style="color:#6d28d9">&#10003;</span> New Lead Received
    </h2>
    <p style="margin:0 0 24px;color:#475569">A new contact form submission was received on SmartSpark Services.</p>
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;width:160px;font-weight:600;color:#64748b;font-size:14px">Full Name</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#0f172a">${escapeHtml(fullName)}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;font-weight:600;color:#64748b;font-size:14px">Email Address</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#0f172a">${escapeHtml(emailAddress)}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;font-weight:600;color:#64748b;font-size:14px">Phone Number</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#0f172a">${escapeHtml(phoneNumber) || '—'}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;font-weight:600;color:#64748b;font-size:14px">Service Needed</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#0f172a">${escapeHtml(serviceNeeded) || '—'}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;vertical-align:top;font-weight:600;color:#64748b;font-size:14px">Project Details</td>
        <td style="padding:10px 12px;vertical-align:top;color:#0f172a;white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${escapeHtml(projectDetails)}</td>
      </tr>
    </table>
    <p style="margin-top:24px;font-size:12px;color:#94a3b8">SmartSpark Services — Internal Lead Notification</p>
  </div>
</div>
</body>
</html>`.trim()

  const customerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>We've received your request</title>
</head>
<body style="margin:0;padding:0;background:#09090e;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e2e8f0;line-height:1.6">
<div style="max-width:640px;margin:0 auto;padding:32px 16px">
  <div style="border:1px solid #2a2a3d;background:#12121a;border-radius:16px;padding:40px 30px">
    <h1 style="margin:0 0 12px;font-size:22px;color:#ffffff">
      Thanks for reaching out, <span style="color:#6d28d9">${escapeHtml(fullName)}</span>!
    </h1>
    <p style="margin:0 0 18px;color:#cbd5e1">We&rsquo;ve received your request and our team is already reviewing your project details.</p>
    <p style="margin:0 0 20px;color:#cbd5e1">Expect a discovery callback from SmartSpark Services within <strong style="color:#ffffff">24 hours</strong>.</p>
    <table style="width:100%;border-collapse:collapse;margin:24px 0">
      <tr>
        <td style="padding:10px 0;vertical-align:top;width:150px;font-weight:600;color:#94a3b8;font-size:13px;text-transform:uppercase;letter-spacing:0.05em">Service</td>
        <td style="padding:10px 0;vertical-align:top;color:#e2e8f0">${escapeHtml(serviceNeeded) || 'General Inquiry'}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;vertical-align:top;font-weight:600;color:#94a3b8;font-size:13px;text-transform:uppercase;letter-spacing:0.05em">Email</td>
        <td style="padding:10px 0;vertical-align:top;color:#e2e8f0">${escapeHtml(emailAddress)}</td>
      </tr>
    </table>
    <p style="margin:0 0 26px;color:#cbd5e1">In the meantime, feel free to explore our services or start a conversation on WhatsApp.</p>
    <a href="https://wa.me/16028511680?text=Hi%20SmartSpark%2C%20I%20want%20to%20discuss%20my%20project." style="display:inline-block;padding:12px 22px;background:#6d28d9;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Chat on WhatsApp</a>
    <p style="margin-top:30px;padding-top:20px;border-top:1px solid #2a2a3d;font-size:12px;color:#64748b;text-align:center">&copy; ${new Date().getFullYear()} SmartSpark Services. All rights reserved.</p>
  </div>
</div>
</body>
</html>`.trim()

  await Promise.all([
    transporter.sendMail({
      from: `"SmartSpark Services" <${process.env.SMTP_USER}>`,
      to: ownerEmail,
      subject: internalSubject,
      replyTo: emailAddress,
      html: internalHtml,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
    }),
    transporter.sendMail({
      from: `"SmartSpark Services" <${process.env.SMTP_USER}>`,
      to: emailAddress,
      subject: customerSubject,
      html: customerHtml,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
    })
  ])
}

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const fullName = String(formData.get('fullName') ?? '').trim()
  const emailAddress = String(formData.get('emailAddress') ?? '').trim()
  const phoneNumber = String(formData.get('phoneNumber') ?? '').trim()
  const serviceNeeded = String(formData.get('serviceNeeded') ?? '').trim()
  const projectDetails = String(formData.get('projectDetails') ?? '').trim()

  if (!fullName || !emailAddress || !projectDetails) {
    return { success: false, message: 'Full name, email address, and project details are required.' }
  }

  if (!EMAIL_REGEX.test(emailAddress)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return {
      success: false,
      message: 'Email service is not configured. Please contact us directly.'
    }
  }

  const smtpHost = String(process.env.SMTP_HOST).trim()
  if (
    !smtpHost ||
    smtpHost.includes('://') ||
    smtpHost.includes(' ') ||
    smtpHost.includes('\n') ||
    smtpHost.includes('\r')
  ) {
    return {
      success: false,
      message: 'Email service is not configured correctly. Please check your SMTP_HOST setting.'
    }
  }

  try {
    await sendEmails({ fullName, emailAddress, phoneNumber, serviceNeeded, projectDetails })
    return { success: true, message: 'Your message has been sent successfully!' }
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return { success: false, message: 'Failed to send your message. Please try again later.' }
  }
}
