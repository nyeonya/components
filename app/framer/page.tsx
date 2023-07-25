import Tap from "@/components/tap/tap";
import Framer from "./components/framer1";
import Framer2 from "./components/framer2";
import Framer3 from "./components/framer3";
import Framer4 from "./components/framer4";
import Framer5 from "./components/framer5";

const FramerMotion = () => {
  return (
    <Tap
      contents={[
        { tab: "1", content: <Framer /> },
        { tab: "2", content: <Framer2 /> },
        { tab: "3", content: <Framer3 /> },
        { tab: "4", content: <Framer4 /> },
        { tab: "layout", content: <Framer5 /> },
      ]}
    />
  );
};

export default FramerMotion;