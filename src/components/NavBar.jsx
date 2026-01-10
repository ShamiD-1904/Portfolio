import { memo } from "react";
import { navLinks } from "../constants";
import { useIsScrolled } from "../hooks";

const NavBar = memo(() => {
  const scrolled = useIsScrolled(10);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="" className="logo">
          Shami | D
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name}) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline"/>
                </a>
              </li>
            ) )}
          </ul>
        </nav>

        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact Me</span>
          </div>
        </a>
      </div>
    </header>
  );
});

export default NavBar;
