import BarChart from "@/components/Chart/BarChart";
import DoughnutChart from "@/components/Chart/DoughnutChart";
import HorizontalBarChart from "@/components/Chart/HorizontalBarChart";
import RadarChart from "@/components/Chart/RadarChart";
import BarChart2 from "@/components/Chart/RadarChart";

export default function Home() {
  return (
    <div className="m-10 w-[700px] border-t border-blue-900 relative">
      <HorizontalBarChart />
      <div className="absolute w-full border-b border-blue-900 top-[320px]" />
    </div>
  );
}
