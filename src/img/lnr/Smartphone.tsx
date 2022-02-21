import * as React from "react";

function SvgSmartphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M10.5 18h-1a.5.5 0 010-1h1a.5.5 0 010 1z" />
      <path d="M14.5 20h-9c-.827 0-1.5-.673-1.5-1.5v-17C4 .673 4.673 0 5.5 0h9c.827 0 1.5.673 1.5 1.5v17c0 .827-.673 1.5-1.5 1.5zm-9-19a.5.5 0 00-.5.5v17a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-17a.5.5 0 00-.5-.5h-9z" />
      <path d="M13.5 16h-7a.5.5 0 01-.5-.5v-13a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v13a.5.5 0 01-.5.5zM7 15h6V3H7v12z" />
    </svg>
  );
}

export default SvgSmartphone;
