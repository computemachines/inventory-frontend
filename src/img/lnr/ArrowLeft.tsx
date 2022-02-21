import * as React from "react";

function SvgArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M.646 10.146l6-6a.5.5 0 01.707.707L2.207 9.999H18.5a.5.5 0 010 1H2.207l5.146 5.146a.5.5 0 01-.708.707l-6-6a.5.5 0 010-.707z" />
    </svg>
  );
}

export default SvgArrowLeft;
