const nodemailer = require('nodemailer');

// Create reusable transporter with direct Gmail configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  debug: true,
  logger: true
});

// Verify connection configuration on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email server connection error:', error);
  } else {
    console.log('Email server connection is ready to send messages');
  }
});

// Send email function with retry mechanism
exports.sendEmail = async (to, subject, html, retries = 2) => {
  if (!to || !subject || !html) {
    console.error('Missing required email parameters:', { to, subject, htmlLength: html?.length });
    throw new Error('Missing required email parameters');
  }

  console.log(`Attempting to send email to ${to} with subject "${subject}"`);
  console.log(`Using email configuration: Gmail (${process.env.EMAIL_USER})`);
  
  let lastError = null;
  
  // Try sending the email with retries
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`Retry attempt ${attempt} of ${retries} for sending email to ${to}`);
      }
      
      const mailOptions = {
        from: `"BloodHero" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
      };
      
      console.log('Mail options:', { 
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        htmlPreview: mailOptions.html.substring(0, 50) + '...' 
      });
      
      const info = await transporter.sendMail(mailOptions);
      
      console.log(`Email sent successfully! Message ID: ${info.messageId}`);
      return info;
    } catch (error) {
      lastError = error;
      console.error(`Email sending error (attempt ${attempt + 1}/${retries + 1}):`, error);
      
      // If this is the last attempt, throw the error
      if (attempt === retries) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }
};

// Add a specific function for login notifications to ensure they're sent properly
exports.sendLoginNotification = async (email, name, loginTime) => {
  if (!email || !name) {
    console.error('Missing required parameters for login notification:', { email, name });
    return false;
  }
  
  try {
    console.log(`Sending login notification to ${email} (${name})`);
    
    // Format date and time
    const formattedDate = loginTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const formattedTime = loginTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
    
    const htmlContent = `
      <h2 style="color: #e53e3e;">Login Notification</h2>
      <p>Dear ${name},</p>
      <p>You have successfully logged in to your BloodHero account.</p>
      <p><strong>Login Details:</strong></p>
      <ul style="list-style-type: none; padding-left: 0;">
        <li style="margin-bottom: 8px;"><strong>Date:</strong> ${formattedDate}</li>
        <li style="margin-bottom: 8px;"><strong>Time:</strong> ${formattedTime}</li>
      </ul>
      <p>If this wasn't you, please secure your account by changing your password immediately.</p>
      <p>Thank you for using BloodHero!</p>
      <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply to this email.</p>
    `;
    
    const result = await exports.sendEmail(
      email,
      'BloodHero - Login Notification',
      htmlContent
    );
    
    return result;
  } catch (error) {
    console.error('Failed to send login notification:', error);
    return false;
  }
};

// Add a specific function for registration notifications
exports.sendRegistrationNotification = async (email, name, userData) => {
  if (!email || !name) {
    console.error('Missing required parameters for registration notification:', { email, name });
    return false;
  }
  
  try {
    console.log(`Sending registration notification to ${email} (${name})`);
    
    const htmlContent = `
      <h2 style="color: #e53e3e;">Welcome to BloodHero!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for registering with BloodHero. Your account has been successfully created.</p>
      <p><strong>Account Details:</strong></p>
      <ul style="list-style-type: none; padding-left: 0;">
        <li style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</li>
        <li style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</li>
        <li style="margin-bottom: 8px;"><strong>Role:</strong> ${userData.role || 'Donor'}</li>
        ${userData.bloodGroup ? `<li style="margin-bottom: 8px;"><strong>Blood Group:</strong> ${userData.bloodGroup}</li>` : ''}
      </ul>
      <p>You can now log in to your account and start using BloodHero services.</p>
      <p>Thank you for joining our mission to save lives through blood donation!</p>
      <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply to this email.</p>
    `;
    
    const result = await exports.sendEmail(
      email,
      'Welcome to BloodHero - Registration Successful',
      htmlContent
    );
    
    return result;
  } catch (error) {
    console.error('Failed to send registration notification:', error);
    return false;
  }
};

// Email templates
exports.emailTemplates = {
  // Welcome email
  welcome: (name) => ({
    subject: 'Welcome to BloodHero',
    html: `
      <h1>Welcome to BloodHero, ${name}!</h1>
      <p>Thank you for joining our community of blood donors and volunteers.</p>
      <p>Together, we can save lives!</p>
    `
  }),

  // Blood request notification
  bloodRequest: (request) => ({
    subject: 'New Blood Request in Your Area',
    html: `
      <h2>Urgent Blood Request</h2>
      <p>Blood Type Needed: ${request.bloodType}</p>
      <p>Units Required: ${request.unitsNeeded}</p>
      <p>Hospital: ${request.hospital.name}</p>
      <p>Location: ${request.hospital.address}, ${request.hospital.city}</p>
      <p>Please login to your account to respond to this request.</p>
    `
  }),

  // Emergency request notification
  emergencyRequest: (request) => ({
    subject: 'EMERGENCY: Urgent Blood Required',
    html: `
      <h2>Emergency Blood Request</h2>
      <p>Blood Type Needed: ${request.bloodType}</p>
      <p>Units Required: ${request.unitsNeeded}</p>
      <p>Hospital: ${request.hospital.name}</p>
      <p>Location: ${request.hospital.address}, ${request.hospital.city}</p>
      <p>This is an emergency request. Please respond immediately if you can help.</p>
    `
  }),

  // Donation confirmation
  donationConfirmation: (donation) => ({
    subject: 'Thank You for Your Donation',
    html: `
      <h2>Thank You for Your Blood Donation</h2>
      <p>Your donation has been recorded:</p>
      <ul>
        <li>Date: ${new Date(donation.date).toLocaleDateString()}</li>
        <li>Location: ${donation.location}</li>
        <li>Blood Bank: ${donation.bloodBank}</li>
      </ul>
      <p>Your contribution will help save lives!</p>
    `
  }),

  // Request fulfilled notification
  requestFulfilled: (request) => ({
    subject: 'Blood Request Fulfilled',
    html: `
      <h2>Blood Request Status Update</h2>
      <p>The blood request for patient ${request.patientName} has been fulfilled.</p>
      <p>Thank you to all donors who contributed!</p>
    `
  })
};
