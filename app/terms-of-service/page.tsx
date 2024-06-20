export default function TermsOfService() {
   return (
      <div className="my-5 lg:my-10">
         <div className="container max-w-5xl mx-auto rounded-lg shadow-lg">
            <h1 className="mb-8 text-3xl font-bold text-primary">
               Terms of Service
            </h1>

            {/* Introduction */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  Welcome to OpenSubtitle.com. By accessing or using our
                  website, you agree to comply with and be bound by these terms
                  of service. Please read them carefully. If you do not agree to
                  these terms, you should not use our site.
               </p>
            </section>

            {/* Use of Service */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">Use of Service</h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  You agree to use our service only for lawful purposes. You
                  must not use our site in any way that causes, or may cause,
                  damage to the site or impairment of the availability or
                  accessibility of the site.
               </p>
            </section>

            {/* User Accounts */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">User Accounts</h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  To access certain features of our site, you may be required to
                  create an account. You are responsible for maintaining the
                  confidentiality of your account information, including your
                  password, and for all activities that occur under your
                  account.
               </p>
            </section>

            {/* Content Upload */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">Content Upload</h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  When you upload content to OpenSubtitle.com, you grant us a
                  worldwide, non-exclusive, royalty-free license to use,
                  distribute, and display that content. You also represent and
                  warrant that you own the content or have the necessary rights
                  to upload it.
               </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">
                  Intellectual Property
               </h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  All content on this site, including text, graphics, logos, and
                  images, is the property of OpenSubtitle.com or its content
                  suppliers and is protected by international copyright laws.
               </p>
            </section>

            {/* Termination */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">Termination</h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  We may terminate or suspend your access to our service
                  immediately, without prior notice or liability, for any reason
                  whatsoever, including without limitation if you breach the
                  terms.
               </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">
                  Limitation of Liability
               </h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  In no event shall OpenSubtitle.com, nor its directors,
                  employees, partners, agents, suppliers, or affiliates, be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, including without limitation, loss of
                  profits, data, use, goodwill, or other intangible losses.
               </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">Governing Law</h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  These terms shall be governed and construed in accordance with
                  the laws of the jurisdiction in which OpenSubtitle.com
                  operates, without regard to its conflict of law provisions.
               </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">Changes to Terms</h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  We reserve the right, at our sole discretion, to modify or
                  replace these terms at any time. If a revision is material, we
                  will try to provide at least 30 days&apos; notice prior to any
                  new terms taking effect. What constitutes a material change
                  will be determined at our sole discretion.
               </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8 rounded-md bg-secondary p-4">
               <h2 className="mb-4 text-2xl font-semibold">
                  Contact Information
               </h2>
               <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  If you have any questions about these terms, please contact us
                  at{' '}
                  <a
                     href="mailto:support@opensubtitle.com"
                     className="text-primary hover:underline"
                  >
                     support@opensubtitle.com
                  </a>
                  .
               </p>
            </section>
         </div>
      </div>
   )
}
