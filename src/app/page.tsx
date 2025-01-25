import Image from "next/image";
import GeminiAi from "./AI/page"
import PAI from "./PAI/page";
export default function Home() {
  return (
   <div>
<GeminiAi/>
<PAI/>
   </div>
  );
}
