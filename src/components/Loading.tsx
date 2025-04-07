import { ClockLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <ClockLoader color="#3d5fd9" data-testid="loading" />
    </div>
  );
};

export default Loading;
