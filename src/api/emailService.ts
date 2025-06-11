// Email service using nodemailer

interface EmailData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'خطا در ارسال ایمیل');
    }
    
    return { success: true, message: 'پیام شما با موفقیت ارسال شد' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'خطا در ارسال ایمیل، لطفا دوباره تلاش کنید' 
    };
  }
}
