import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
    mobileNavContainerVariant,
    mobileNavListVariant,
    mobileNavExitProps,
} from "../data/animationConfig";

const activeStyleCallback = ({ isActive }: { isActive: Boolean }) =>
    isActive ? "underline underline-offset-4 decoration-sky-500 decoration-4" : "navlink";

const Navlinks = () => {
    return (
        <>
            <NavLink to="/about" className={activeStyleCallback}>About</NavLink>
            <NavLink to="/usage" className={activeStyleCallback}>Usage</NavLink>
            <NavLink to="/signup" className={activeStyleCallback}>Signup</NavLink>
        </>
    );
}

const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        console.log(isOpen);
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav className="w-1/3 flex justify-end">
                <div className="hidden w-full justify-between md:flex">
                    <Navlinks />
                </div>
                <div className="md:hidden ">
                    <button onClick={(toggleNav)}>{isOpen ? <X /> : <Menu />}</button>
                </div>
            </nav>
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        layout="position"
                        key="nav-links"
                        variants={mobileNavContainerVariant}
                        initial="hidden"
                        animate="show"
                        className="mt-4 basis-full md:hidden"
                    >
                        <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                            <NavLink to="/about" className={activeStyleCallback}>
                                About
                            </NavLink>
                        </motion.div>
                        <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                            <NavLink to="/usage" className={activeStyleCallback}>
                                Usage
                            </NavLink>
                        </motion.div>
                        <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                            <NavLink to="/signup" className={activeStyleCallback}>
                                Signup
                            </NavLink>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Nav;

