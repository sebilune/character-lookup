/* Dependencies */
import Lottie from "lottie-react";

/* Assets */
import catAnimation from "../assets/cat.json";

const CatAnimation: React.FC = () => {
  return <Lottie loop={true} animationData={catAnimation} />;
};

export default CatAnimation;
