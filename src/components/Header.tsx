import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/">
          <div className="flex items-center space-x-2">
            <img src="./logo-completo.png" alt="Prolog Logo" className="h-12" />
          </div>
        </a>

        <div className="flex justify-center items-center gap-x-10">
          <nav className="flex space-x-8 text-sm font-medium text-gray-800">
            <a href="#" className="text-greyzy-400">
              Home
            </a>

            <a href="#">A Empresa</a>
            <a href="#">Clientes</a>
            <a href="#">Cases</a>
            <a href="#">Blog</a>
            <a href="#">Contato</a>
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
    </header>
  );
};

export default Header;
