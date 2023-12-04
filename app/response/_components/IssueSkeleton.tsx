import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueSkeleton = () => {
  return (
    <Box>
      <Skeleton height='2rem' />
      <Skeleton height='22rem' />
    </Box>
  );
};

export default IssueSkeleton;
