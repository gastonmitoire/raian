import React from "react";
import { motion } from "framer-motion";

const TabButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <motion.button
    className={`${
      active ? "bg-blue-500 text-white" : "text-blue-500 hover:text-blue-700"
    } w-full font-medium text-sm py-4 px-6`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.button>
);

interface TabsProps {
  tabs: { label: string; content: JSX.Element }[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="border-b border-gray-200 overflow-y-auto">
      <div className="max-w-7xl min-w-[330px] mx-auto">
        <div className="flex justify-evenly items-center h-14 sticky top-0">
          {tabs.map((tab, index) => (
            <TabButton
              key={tab.label}
              label={tab.label}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="max-w-7xl min-w-[330px] mx-auto">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};
