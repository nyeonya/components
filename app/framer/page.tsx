import Tap from "@/components/Tap/tap";
import Framer from "./components/framer1";
import Framer2 from "./components/framer2";
import Framer3 from "./components/framer3";
import Framer4 from "./components/framer4";
import Framer5 from "./components/framer5";
import Framer6 from "./components/framer6";

const FramerMotion = () => {
  return (
    <Tap
      contents={[
        { tab: "1", content: <Framer /> },
        { tab: "2", content: <Framer2 /> },
        { tab: "3", content: <Framer3 /> },
        { tab: "4", content: <Framer4 /> },
        { tab: "layout", content: <Framer5 /> },
        { tab: "layout11", content: <Framer6 /> },
      ]}
    />
  );
};

export default FramerMotion;
