import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormState = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  // EmailJS Configuration
  private readonly EMAILJS_SERVICE_ID = 'service_f4dud0o';
  private readonly EMAILJS_TEMPLATE_ID = 'template_nhzr8nx';
  private readonly EMAILJS_PUBLIC_KEY = 'dKKPwh1NzbmwRESdK';

  showForm = signal(false);
  formState = signal<FormState>('idle');
  errorMessage = signal('');

  formData: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  openForm(): void {
    this.showForm.set(true);
    this.resetForm();
    // Disable background scroll
    document.body.style.overflow = 'hidden';
  }

  closeForm(): void {
    this.showForm.set(false);
    this.formState.set('idle');
    // Re-enable background scroll
    document.body.style.overflow = '';
  }

  async sendEmail(): Promise<void> {
    // Validation
    if (!this.isFormValid()) {
      this.formState.set('error');
      this.errorMessage.set('Please fill in all fields with valid information.');
      return;
    }

    this.formState.set('sending');
    this.errorMessage.set('');

    try {
      // Send email via EmailJS
      const response = await emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message,
          to_name: 'Umer', // Your name
        },
        this.EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      this.formState.set('success');
      
      // Auto-close after 3 seconds and restore scroll
      setTimeout(() => {
        this.closeForm();
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      this.formState.set('error');
      this.errorMessage.set('Failed to send message. Please try again or contact directly via email.');
    }
  }

  private isFormValid(): boolean {
    const { name, email, subject, message } = this.formData;
    
    // Check all fields are filled
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
    this.formState.set('idle');
    this.errorMessage.set('');
  }
}
