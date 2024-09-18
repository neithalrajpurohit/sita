import { css } from "@emotion/react";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import BeatLoader from "react-spinners/BeatLoader";
import BounceLoader from "react-spinners/BounceLoader";
import GridLoader from "react-spinners/GridLoader";
import MoonLoader from "react-spinners/MoonLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = (props: {
  loaderType: string;
  size?: number;
  customColor?: string;
}) => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#28C4F2");

  return (
    <div className="sweet-loading">
      {props.loaderType === "BounceLoader" && (
        <BounceLoader
          color={color}
          loading={loading}
          css={override}
          size={props.size}
        />
      )}
      {props.loaderType === "MoonLoader" && (
        <MoonLoader color={color} loading={loading} css={override} />
      )}
      {props.loaderType === "BarLoader" && (
        <BarLoader color={color} loading={loading} css={override} />
      )}
      {props.loaderType === "GridLoader" && (
        <GridLoader color={color} loading={loading} css={override} />
      )}
      {props.loaderType === "BeatLoader" && (
        <BeatLoader
          color={props?.customColor ? props?.customColor : color}
          loading={loading}
          css={override}
        />
      )}
    </div>
  );
};

export default Loading;
