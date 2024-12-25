import GetInTouch from "./GetInTouch";
import LoginBtn from "./LoginBtn";

const Acaccess = () => {
    return (
      <div className="order-[3] flex-row gap-2 md:w-2/6 w-1/3 justify-end hidden md:inline-flex">
        <LoginBtn/>
        <GetInTouch/>
      </div>
    );
  };
  
  export default Acaccess;