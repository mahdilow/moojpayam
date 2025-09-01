// Email and OTP service

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  otpVerified: boolean;
}

interface OTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
}

interface OTPVerifyResponse {
  success: boolean;
  message: string;
  verified: boolean;
}

// Send OTP to phone number
export async function sendOTP(phone: string): Promise<OTPResponse> {
  try {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'خطا در ارسال کد تایید');
    }
    
    return { 
      success: true, 
      message: result.message,
      expiresIn: result.expiresIn 
    };
  } catch (error) {
    console.error('OTP sending error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'خطا در ارسال کد تایید' 
    };
  }
}

// Verify OTP
export async function verifyOTP(phone: string, otp: string): Promise<OTPVerifyResponse> {
  try {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, otp }),
    });
    
    const result = await response.json();
    
    return {
      success: response.ok,
      message: result.message,
      verified: result.verified || false
    };
  } catch (error) {
    console.error('OTP verification error:', error);
    return { 
      success: false, 
      message: 'خطا در تایید کد',
      verified: false 
    };
  }
}

// Send contact email (after OTP verification)
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
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
      throw new Error(result.message || 'خطا در ارسال پیام');
    }
    
    return { success: true, message: result.message };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'خطا در ارسال پیام، لطفا دوباره تلاش کنید' 
    };
  }
}