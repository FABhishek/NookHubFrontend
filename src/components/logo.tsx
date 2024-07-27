import { NavLink } from "react-router-dom";

export default function Logo() {
    return (
        <NavLink to="/"><img src="../public/vite.svg" alt="logo"></img></NavLink>
    )
  }