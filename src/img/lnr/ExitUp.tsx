import * as React from "react";

function SvgExitUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M15.5 20h-12c-.827 0-1.5-.673-1.5-1.5v-10C2 7.673 2.673 7 3.5 7h4a.5.5 0 010 1h-4a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h12a.5.5 0 00.5-.5v-10a.5.5 0 00-.5-.5h-4a.5.5 0 010-1h4c.827 0 1.5.673 1.5 1.5v10c0 .827-.673 1.5-1.5 1.5z" />
      <path d="M12.853 3.646l-3-3a.5.5 0 00-.707 0l-3 3a.5.5 0 00.707.707L9 2.207V13.5a.5.5 0 001 0V2.207l2.147 2.146a.497.497 0 00.706 0 .5.5 0 000-.707z" />
    </svg>
  );
}

export default SvgExitUp;
