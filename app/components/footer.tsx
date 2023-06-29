import React from "react";

import { Navigation } from "./navigation";
import { SocialLinks } from "./social_links";

export function Footer() {
  return (
    <footer className="w-full font-body">
      <div className="flex items-center h-full py-3 bg-neutral-900 lg:h-12 lg:py-0">
        <div className="container flex flex-col lg:flex-row justify-between items-center gap-3">
          <p>&copy; 2023 Hugo Mitoire. Todos los derechos reservados.</p>
          <SocialLinks />
        </div>
      </div>
      <div className="h-10 flex flex-col lg:flex-row items-center py-3 bg-neutral-950 lg:py-0">
        <nav
          aria-label="Footer navigation"
          className="container flex flex-col lg:flex-row justify-between items-center gap-3"
        >
          <Navigation link className="capitalize gap-3" />
          <ul className="flex items-center space-x-4 text-neutral-400">
            <li className="cursor-pointer transition-all hover:dark:text-neutral-100">
              Terminos y condiciones
            </li>
            <li className="cursor-pointer transition-all hover:dark:text-neutral-100">
              Políticas de privacidad
            </li>
            <li className="cursor-pointer transition-all hover:dark:text-neutral-100">
              Preferencias
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
