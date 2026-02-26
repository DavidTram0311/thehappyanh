import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function SocialIcons() {
  return (
    <div className="fixed bottom-12 left-6 md:left-12 flex flex-col gap-6 z-20">
      <a href="#" className="text-[#637C27] hover:opacity-70 transition-opacity" aria-label="Facebook">
        <Facebook size={24} strokeWidth={2.5} />
      </a>
      <a href="#" className="text-[#637C27] hover:opacity-70 transition-opacity" aria-label="Instagram">
        <Instagram size={24} strokeWidth={2.5} />
      </a>
      <a href="#" className="text-[#637C27] hover:opacity-70 transition-opacity" aria-label="LinkedIn">
        <Linkedin size={24} strokeWidth={2.5} />
      </a>
    </div>
  );
}
