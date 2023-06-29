import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
  allowMultiple?: boolean;
  allowToggle?: boolean;
  panels: {
    header: string;
    content: JSX.Element;
  }[];
}

const Panel: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  header: string;
  children: JSX.Element;
}> = ({ isOpen, onToggle, header, children }) => {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        className="flex justify-between w-full px-4 py-2 font-medium text-left text-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50"
        onClick={onToggle}
      >
        {header}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="px-4 pt-2 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  allowMultiple,
  allowToggle,
  panels,
}) => {
  const [openPanels, setOpenPanels] = React.useState<number[]>(
    allowMultiple ? [] : [-1]
  );

  const handleTogglePanel = (panelIndex: number) => {
    if (openPanels.includes(panelIndex)) {
      setOpenPanels(openPanels.filter((index) => index !== panelIndex));
    } else {
      if (allowMultiple) {
        setOpenPanels([...openPanels, panelIndex]);
      } else {
        setOpenPanels([panelIndex]);
      }
    }
  };

  return (
    <div className="space-y-2">
      {panels.map((panel, index) => (
        <Panel
          key={index}
          isOpen={openPanels.includes(index)}
          onToggle={() => {
            if (allowToggle) {
              handleTogglePanel(index);
            } else {
              if (!openPanels.includes(index)) {
                setOpenPanels([index]);
              }
            }
          }}
          header={panel.header}
        >
          {panel.content}
        </Panel>
      ))}
    </div>
  );
};
