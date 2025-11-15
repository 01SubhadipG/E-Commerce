import React from 'react'

const Footer = () => {
  return (
  <footer className="bg-gray-900 text-gray-200 pt-10 pb-4 w-full bottom-0 left-0 z-50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Our Location</h3>
          <p>123 Market Street<br />New Delhi, India 110001</p>
          <p className="mt-2">Mon - Sat: 9:00am - 8:00pm</p>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p>Email: <a href="mailto:support@shopwise.com" className="underline hover:text-indigo-400">support@hoodie.com</a></p>
          <p>Phone: <a href="tel:+911234567890" className="underline hover:text-indigo-400">+91 12345 67890</a></p>
          <p className="mt-2">Live Chat: 24/7</p>
        </div>
        {/* Terms & Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/terms" className="hover:text-indigo-400 transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
            <li><a href="/refund" className="hover:text-indigo-400 transition">Refund Policy</a></li>
            <li><a href="/shipping" className="hover:text-indigo-400 transition">Shipping Policy</a></li>
          </ul>
        </div>
        {/* About & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Vastram</h3>
          <p className="mb-3">Vastram is your one-stop shop for the latest trends and best deals in fashion. We deliver quality and style to your doorstep.</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Instagram" className="hover:text-indigo-400"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.75 2.75a5.75 5.75 0 1 1-5.5 0zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></a>
            <a href="#" aria-label="Facebook" className="hover:text-indigo-400"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.525 8.998h-2.02V7.64c0-.49.32-.604.545-.604h1.45V4.998l-1.995-.008c-2.22 0-2.73 1.66-2.73 2.72v1.288H9.998v2.25h2.777V19h2.25v-7.752h1.52l.23-2.25z"/></svg></a>
            <a href="#" aria-label="Twitter" className="hover:text-indigo-400"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.633 7.997c.013.176.013.353.013.53 0 5.39-4.104 11.61-11.61 11.61-2.31 0-4.46-.67-6.27-1.82.32.04.63.06.97.06 1.92 0 3.68-.65 5.09-1.74-1.8-.03-3.32-1.22-3.84-2.85.25.04.5.07.77.07.36 0 .71-.05 1.04-.14-1.87-.38-3.28-2.03-3.28-4.01v-.05c.55.3 1.18.48 1.85.5a4.13 4.13 0 0 1-1.84-3.43c0-.76.2-1.47.54-2.08a11.66 11.66 0 0 0 8.45 4.29c-.07-.3-.1-.61-.1-.93a4.13 4.13 0 0 1 7.14-2.82c.56-.11 1.09-.32 1.56-.61a4.13 4.13 0 0 1-1.81 2.28c.5-.06.98-.19 1.43-.39a8.8 8.8 0 0 1-2.07 2.14z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Vastram. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
