import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { motion } from "motion/react";
import { Link } from "react-router";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-white shadow-md border-b border-gray-200"
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <img src="./logo-completo.png" alt="Prolog Logo" className="h-12" />
        </Link>

        <div className="flex justify-center items-center gap-x-10">
          <nav className="flex space-x-8 text-sm font-medium text-gray-800">
            <Link to="/" className="text-greyzy-400">
              Home
            </Link>

            <Link to="/">A Empresa</Link>
            <Link to="/">Clientes</Link>
            <Link to="/">Cases</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Contato</Link>
          </nav>

          <Button
            variant="outlined"
            className="flex items-center space-x-2 border border-blue-600 text-greyzy-400 px-4 py-1.5 rounded-full text-sm "
          >
            <AccountCircleIcon className="w-4 h-4" />
            <span>Login</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
