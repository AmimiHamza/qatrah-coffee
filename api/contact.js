export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, service, message, lang } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const serviceLabels = {
    landing: lang === 'ar' ? 'صفحة هبوط' : 'Landing Page',
    fullsite: lang === 'ar' ? 'موقع كامل' : 'Full Website',
    dashboard: lang === 'ar' ? 'لوحة إدارة' : 'Dashboard System',
    branding: lang === 'ar' ? 'هوية بصرية' : 'Branding',
    other: lang === 'ar' ? 'أخرى' : 'Other',
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Qatrah Contact <onboarding@resend.dev>',
        to: ['hamza.amimi.p@gmail.com'],
        reply_to: email,
        subject: `[قطرة] New inquiry from ${name} — ${serviceLabels[service] || service}`,
        html: `
          <div dir="auto" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a0d08; color: #FEF4D5; padding: 32px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 28px;">
              <div style="width: 56px; height: 56px; background: #F1E49A; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 900; color: #2c1810;">ق</div>
              <h1 style="color: #F1E49A; margin: 12px 0 4px; font-size: 22px;">قَطرَة — New Contact</h1>
              <p style="color: rgba(254,244,213,0.5); font-size: 13px; margin: 0;">New service inquiry received</p>
            </div>
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(241,228,154,0.15); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: rgba(254,244,213,0.5); font-size: 13px; width: 120px;">Name</td>
                  <td style="padding: 8px 0; color: #FEF4D5; font-weight: bold;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: rgba(254,244,213,0.5); font-size: 13px;">Email</td>
                  <td style="padding: 8px 0; color: #F1E49A;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: rgba(254,244,213,0.5); font-size: 13px;">Service</td>
                  <td style="padding: 8px 0; color: #FEF4D5;">${serviceLabels[service] || service}</td>
                </tr>
              </table>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px;">
              <p style="color: rgba(254,244,213,0.5); font-size: 12px; margin: 0 0 8px;">Message</p>
              <p style="color: #FEF4D5; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="text-align: center; color: rgba(254,244,213,0.2); font-size: 11px; margin-top: 24px;">
              Sent via qatrah-coffee contact form
            </p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('Resend error:', err)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
