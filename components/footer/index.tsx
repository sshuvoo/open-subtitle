export const Footer = () => {
   return (
      <footer className="mt-20">
         <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* About Section */}
            <div>
               <h3 className="mb-4 text-xl font-bold">About OpenSubtitle</h3>
               <p className="text-sm">
                  OpenSubtitle is a platform where people can upload and
                  download subtitles to watch movies in their own language.
               </p>
            </div>

            {/* Quick Links */}
            <div>
               <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
               <ul className="space-y-2 text-sm">
                  <li>
                     <a href="/" className="hover:underline">
                        Home
                     </a>
                  </li>
                  <li>
                     <a href="/upload" className="hover:underline">
                        Upload Subtitle
                     </a>
                  </li>
                  <li>
                     <a href="/download" className="hover:underline">
                        Download Subtitle
                     </a>
                  </li>
                  <li>
                     <a href="/magnet-links" className="hover:underline">
                        Magnet Links
                     </a>
                  </li>
               </ul>
            </div>

            {/* Resources */}
            <div>
               <h3 className="mb-4 text-xl font-bold">Resources</h3>
               <ul className="space-y-2 text-sm">
                  <li>
                     <a href="/faq" className="hover:underline">
                        FAQ
                     </a>
                  </li>
                  <li>
                     <a href="/support" className="hover:underline">
                        Support
                     </a>
                  </li>
                  <li>
                     <a href="/privacy-policy" className="hover:underline">
                        Privacy Policy
                     </a>
                  </li>
                  <li>
                     <a href="/terms-of-service" className="hover:underline">
                        Terms of Service
                     </a>
                  </li>
               </ul>
            </div>

            {/* Contact Us */}
            <div>
               <h3 className="mb-4 text-xl font-bold">Contact Us</h3>
               <p className="text-sm">
                  Have questions or need support? Feel free to reach out to us.
               </p>
               <p className="mt-2 text-sm">
                  <strong>Email:</strong> Sorry, not available right row.
               </p>
               <p className="text-sm">
                  <strong>Phone:</strong> +880 1521-565996
               </p>
            </div>
         </div>
         <div className="container mx-auto mt-8 border-t border-gray-700 py-6 text-center">
            <p className="text-sm">
               &copy; {new Date().getFullYear()} OpenSubtitle. All rights
               reserved.
            </p>
         </div>
      </footer>
   )
}
