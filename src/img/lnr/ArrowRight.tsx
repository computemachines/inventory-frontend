import * as React from "react";

function SvgArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M19.354 10.146l-6-6a.5.5 0 00-.707.707l5.146 5.146H1.5a.5.5 0 000 1h16.293l-5.146 5.146a.5.5 0 00.708.707l6-6a.5.5 0 000-.707z" />
    </svg>
  );
}

export default SvgArrowRight;
