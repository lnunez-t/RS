'use client';
import { useEffect } from 'react';
import { Instagram } from 'lucide-react';

export default function InstaPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.setAttribute('data-use-service-core', '');
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <main>
      {/* ... autre contenu ... */}

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
            <Instagram className="mx-auto mb-4 text-pink-600 w-8 h-8" />
          <h2 className="text-2xl sm:text-2xl font-semibold text-[#392e2c] text-center mb-7 font-playfair">Suivez-nous sur Instagram</h2>

          {/* Widget Instagram */}
          <div className="elfsight-app-6c97100d-8159-4931-b438-a1836ea04592"></div>
        </div>
      </section>
    </main>
  );
}