import LazyLoading from "./LazyLoading";

interface TLoadingProps {
  title: string;
  width: string;
}
const Loading = (props: TLoadingProps) => {
  return <LazyLoading />;
};

export default Loading;
