import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendEmail = async (formData) => {
  try {
    // 1. Email to YOUR inbox
    const adminTemplateParams = {
      to_email: 'shamidwebdev@gmail.com', // Your email
      from_email: formData.email,
      from_name: formData.name,
      subject: formData.subject || 'New Contact Form Submission',
      message: formData.message,
      reply_to: formData.email,
    };

    const adminResponse = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      adminTemplateParams
    );

    // 2. Auto-reply email to SENDER
    const autoReplyParams = {
      to_email: formData.email, // Sender's email
      from_name: formData.name,
      subject: formData.subject || 'New Contact Form Submission',
      message: formData.message,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    const autoReplyResponse = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
      autoReplyParams
    );

    return { 
      success: true, 
      data: { adminResponse, autoReplyResponse } 
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      error: error.text || 'Failed to send email' 
    };
  }
};
