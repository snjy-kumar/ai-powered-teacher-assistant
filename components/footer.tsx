import { GraduationCap, Mail, MapPin, Phone, Sparkles, CreditCard, HelpCircle, Building2, PhoneCall, Shield, Scale, Cookie, Package, Building, Gavel } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-lg">EduAI Assistant</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering education through AI-powered assistance and personalized learning experiences.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span>contact@eduai.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span>123 Education St, Learning City</span>
              </div>
            </div>
          </div>

          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Package className="h-4 w-4 text-primary" />
              </div>
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <CreditCard className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <HelpCircle className="h-3.5 w-3.5 text-primary" />
                  </div>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Building className="h-4 w-4 text-primary" />
              </div>
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Building2 className="h-3.5 w-3.5 text-primary" />
                  </div>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <PhoneCall className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Gavel className="h-4 w-4 text-primary" />
              </div>
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Scale className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Cookie className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-muted">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EduAI Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}