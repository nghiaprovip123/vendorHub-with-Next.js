// "use client";

// import { Button } from "@/components/ui/button";
// import { DivideCircle } from "lucide-react";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress"
// import { Textarea } from "@/components/ui/textarea";

// export default function Home() {
//   return (
//     <div className="p-4">
//       <div className="flex flex-col gap-y-4">
//         <div>
//             <Button variant="evaluate">
//               Add to Cart
//             </Button>
//           </div>
//           <div>
//             <Input placeholder="I am a placeholder" />
//           </div>
//           <div> 
//             <Progress value={50} />
//           </div>
//           <div>
//             <Textarea placeholder="Text Area"/>
//           </div>
//         </div>
//     </div>
//   );
// }

"use client"
import { Button } from "@/components/ui/button"


 const X = () => {
  return (
    <div> 
      <Button variant ="evaluate"> 
        This is a button
      </Button>
    </div>
  )
}

export default X;

