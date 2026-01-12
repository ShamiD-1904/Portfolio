import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendEmail = async (formData) => {
  try {
    const adminTemplateParams = {
      to_email: 'shamidwebdev@gmail.com',
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

    const autoReplyParams = {
      to_email: formData.email,
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
