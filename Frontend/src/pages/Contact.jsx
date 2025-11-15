import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
    // State for form fields
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // State for form validation errors and submission status
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    // A single handler to update form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    // Form validation logic
    const validate = useCallback(() => {
        const newErrors = {};
        if (!formState.name.trim()) newErrors.name = 'Your name is required.';
        if (!formState.email.trim()) {
            newErrors.email = 'Your email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!formState.message.trim()) newErrors.message = 'A message is required.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formState]);

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setStatus('sending');
            // --- Simulate API call ---
            console.log("Form Submitted:", formState);
            setTimeout(() => {
                setStatus('success');
                // Reset form after successful submission
                setFormState({ name: '', email: '', subject: '', message: '' });
            }, 2000); // Simulate a 2-second network request
        }
    };

    return (
        <div className="bg-white">
            {/* --- Header Section --- */}
            <div className="bg-gray-50 text-center py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Get in Touch</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a question, a comment, or a brilliant idea? We'd love to hear from you.
                    </p>
                </div>
            </div>

            {/* --- Main Content Section --- */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* --- Left Side: Contact Information --- */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                            <p className="text-gray-600 mb-6">
                                Reach out to us via phone, email, or visit our office. We're here to help!
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Mail className="w-6 h-6 text-indigo-600" />
                                    <a href="mailto:support@hoodie.com" className="text-gray-700 hover:text-indigo-600">support@hoodie.com</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-6 h-6 text-indigo-600" />
                                    <a href="tel:+911234567890" className="text-gray-700 hover:text-indigo-600">+91 123 456 7890</a>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">123 Apparel Avenue, Kulti, West Bengal, 713343, India</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Clock className="w-6 h-6 text-indigo-600" />
                                    <p className="text-gray-700">Mon - Fri, 10:00 AM - 6:00 PM (IST)</p>
                                </div>
                            </div>
                        </div>

                        {/* --- Map Placeholder --- */}
                        <div className="h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
                            {/* To embed a Google Map:
                                1. Go to Google Maps and find your location.
                                2. Click "Share", then "Embed a map".
                                3. Copy the HTML and paste the iframe here.
                            */}
                           <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29221.28919062592!2d86.83295963955077!3d23.7317789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6dd843f30b91d%3A0x89c02283a58e6e5!2sKulti%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1728399723001!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{ border:0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>

                    {/* --- Right Side: Contact Form --- */}
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="space-y-6">
                                <InputField label="Full Name" name="name" value={formState.name} onChange={handleChange} error={errors.name} />
                                <InputField label="Email Address" name="email" type="email" value={formState.email} onChange={handleChange} error={errors.email} />
                                <InputField label="Subject (Optional)" name="subject" value={formState.subject} onChange={handleChange} />
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formState.message}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <div>
                                    <button type="submit" disabled={status === 'sending'} className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400">
                                        {status === 'sending' ? <><Loader2 className="animate-spin" /> Sending...</> : 'Send Message'}
                                    </button>
                                </div>
                                {status === 'success' && (
                                    <div className="flex items-center gap-2 text-green-600 p-3 bg-green-50 rounded-md">
                                        <CheckCircle />
                                        <span>Thank you! Your message has been sent.</span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* --- FAQ Link Section --- */}
            <div className="bg-gray-50 border-t">
                 <div className="container mx-auto px-4 py-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">Have a quick question?</h3>
                    <p className="text-gray-600 mb-4">Check out our FAQ page for answers to common questions about orders, shipping, and returns.</p>
                    <Link to="/faq" className="font-semibold text-indigo-600 hover:underline">
                        Visit our FAQ →
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Helper component for text input fields
const InputField = ({ label, name, type = 'text', value, onChange, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

export default Contact;