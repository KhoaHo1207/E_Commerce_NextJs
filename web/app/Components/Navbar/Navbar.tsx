import BottomNav from "./BottomNav";
import MiddleNav from "./MiddleNav";
import Topnav from "./Topnav";

const Navbar = () => {
  return (
    <>
      <header>
        <Topnav />
        <MiddleNav />
        <BottomNav />
      </header>
    </>
  );
};

export default Navbar;
