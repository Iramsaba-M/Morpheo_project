import { Boxes, Check } from "lucide-react";

export const DataProductImage = ({ style = "active", size = "sm" }) => {
  // Determine dimensions based on size prop
  let dimensions, badgeSize, checkSize, badgePosition;

  if (size === "xl") {
    dimensions = "w-20 min-w-20 h-20";
    badgeSize = "h-5 w-5";
    checkSize = "h-4 w-4 top-[2.5px] left-[2.5px]";
    badgePosition = "-top-2 -left-2";
  } else if (size === "lg") {
    dimensions = "w-16 min-w-16 h-16";
    badgeSize = "h-4 w-4";
    checkSize = "h-3 w-3 top-[2.5px] left-[2.5px]";
    badgePosition = "-top-1.5 -left-1.5";
  } else {
    // sm (default)
    dimensions = "w-10 min-w-10 h-10";
    badgeSize = "h-3 w-3";
    checkSize = "h-2 w-2 top-[2px] left-[2px]";
    badgePosition = "-top-1 -left-1";
  }

  return (
    <div
      className={`relative ${dimensions} flex border-morpheo-400 border-[3px] rounded-full items-center justify-center bg-gradient-to-r from-dataproduct-active1 to-dataproduct-active2`}
    >
      <div
        className={`absolute ${badgePosition} ${badgeSize} text-white bg-green-500 rounded-full p-1 text-xs z-10`}
      >
        <Check strokeWidth={3} className={`absolute ${checkSize}`} />
      </div>
      <Boxes strokeWidth={1} className="text-white w-1/2 h-1/2" />
    </div>
  );
};
