import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const TiltCard = ({ feature, index }: { feature: any; index: number }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    setRotate({ x: (y - centerY) / 10, y: (centerX - x) / 10 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.1s ease-out"
      }}
      className="group"
    >
      <Card className="bg-white border-slate-100 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:border-blue-200 transition-all duration-300 h-full overflow-hidden">
        <CardContent className="p-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-[#0052ff] group-hover:rotate-360 transition-all duration-700">
            <feature.icon className="w-7 h-7 text-[#0052ff] group-hover:text-white" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 italic mb-4 uppercase tracking-tighter">
            {feature.title}
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TiltCard;