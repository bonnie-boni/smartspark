import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-primary-950 text-slate-200 py-8 md:py-12">
      {/* Desktop background images */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute left-0 top-0 w-1/4 h-full" style={{ backgroundImage: 'url(/images/contact-bg.webp)', backgroundSize: 'contain', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', opacity: 0.3 }}></div>
        <div className="absolute left-1/4 top-0 w-1/2 h-full" style={{ backgroundImage: 'url(/images/footer-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="absolute right-0 top-0 w-1/4 h-full" style={{ backgroundImage: 'url(/images/logo.webp)', backgroundSize: 'contain', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat', opacity: 0.1 }}></div>
      </div>
      {/* Mobile background - simplified */}
      <div className="absolute inset-0 md:hidden" style={{ backgroundImage: 'url(/images/footer-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }}></div>
      <div className="absolute inset-0 bg-primary-950/95"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/images/logo/logo.webp" alt="SmartSpark Services" className="w-16 h-16 md:w-24 md:h-24 object-contain mr-3 md:mr-6 shrink-0" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-100">SmartSpark Services</h3>
                <p className="text-xs md:text-sm text-slate-300">Where AI and Creativity Ignite</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-slate-300 mb-4">
              Empowering businesses worldwide with global talent and cutting-edge AI innovation from our US headquarters.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-slate-100 mb-3 md:mb-4">Contact Info</h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center text-slate-300">
                <Mail className="mr-2 md:mr-3 text-slate-100 shrink-0" size={14} />
                <span className="text-xs md:text-sm break-all">info@smartsparkservices.com</span>
              </div>
              {/*
              <div className="flex items-center text-slate-300">
                <Phone className="mr-2 md:mr-3 text-slate-100 shrink-0" size={14} />
                <span className="text-xs md:text-sm">+1 (602) 851-1680</span>
              </div>
              */}
              <div className="flex items-start text-slate-300">
                <MapPin className="mr-2 md:mr-3 text-slate-100 mt-1 shrink-0" size={14} />
                <div className="text-xs md:text-sm">
                  <div>Litchfield Park, AZ 85340</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-slate-100 mb-3 md:mb-4">Follow Us</h4>
            <div className="flex space-x-3 md:space-x-4">
              <a href="https://www.facebook.com/share/1H5CdxwEwe/" target="_blank" rel="noopener noreferrer" className="p-2">
                <img src="/social/facebook.png" alt="Facebook" className="w-7 h-7" />
              </a>
              <a href="https://www.instagram.com/smartspark_services/" target="_blank" rel="noopener noreferrer" className="p-2">
                <img src="/social/instagram.png" alt="Instagram" className="w-7 h-7" />
              </a>
              <a href="https://www.linkedin.com/groups/15404006/" target="_blank" rel="noopener noreferrer" className="p-2">
                <img src="/social/linkedin.png" alt="LinkedIn" className="w-7 h-7" />
              </a>
              <a href="https://x.com/Smartspark2025" target="_blank" rel="noopener noreferrer" className="p-2">
                <img src="/social/x.png" alt="X" className="w-7 h-7 bg-white rounded-full border-none" />
              </a>
              <a href="https://wa.me/16028863530" target="_blank" rel="noopener noreferrer" className="pt-1">
                <img src="/social/whatsapp.png" alt="YouTube" className="w-9 h-9" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm text-slate-400">
            &copy; {new Date().getFullYear()} SmartSpark Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}