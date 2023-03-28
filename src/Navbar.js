import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Logo from './img/Prisma-logo-04.png';
import React from 'react';


export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <img src={Logo} alt="Logo Prosma" />
      </Link>
      <ul>
        <CustomLink to="/">Intereses de Pago Expreso</CustomLink>
        <CustomLink to="/costofinancieroca">Costo Financiero</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
