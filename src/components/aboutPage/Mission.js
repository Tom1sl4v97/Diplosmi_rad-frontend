import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../utils/ScrollAnimationWrapper";
import imageUrl from "../../assets/images/Illustration2.png";
import { useTranslation } from "react-i18next";

function Mission() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const { t: text } = useTranslation();

  const missionText = [
    text("blogMissionDelight"),
    text("blogMissionClarify"),
    text("blogMissionCheerUp"),
  ];

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="grid grid-flow-row md:grid-flow-col grid-cols-1 md:grid-cols-2 gap-8 p  y-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <img
              src={imageUrl}
              alt="ilustration_2"
              className="h-[414px] w-[508px] object-contain"
            />
          </motion.div>
        </ScrollAnimationWrapper>
        
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl lg:text-4xl text-black-600 font-serif">
            {text("blogMissionTitle")}
          </h3>
          <p className="my-2 text-black-500">{text("blogMissionText")}</p>
          <ul className="text-black-500 self-start list-inside ml-8">
            {missionText.map((feature, index) => (
              <motion.li
                className="relative circle-check custom-list"
                custom={{ duration: 2 + index }}
                variants={scrollAnimation}
                key={feature}
                whileHover={{
                  scale: 1.2,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="flex flex-row">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  {feature}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Mission;
