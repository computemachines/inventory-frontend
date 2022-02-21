import * as React from "react";

function SvgMic(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M9.5 14C7.57 14 6 12.43 6 10.5v-6C6 2.57 7.57 1 9.5 1S13 2.57 13 4.5v6c0 1.93-1.57 3.5-3.5 3.5zm0-12A2.503 2.503 0 007 4.5v6C7 11.878 8.122 13 9.5 13s2.5-1.122 2.5-2.5v-6C12 3.122 10.878 2 9.5 2z" />
      <path d="M16 10.5a.5.5 0 00-1 0c0 3.033-2.467 5.5-5.5 5.5S4 13.533 4 10.5a.5.5 0 00-1 0 6.509 6.509 0 006 6.481V19H7.5a.5.5 0 000 1h4a.5.5 0 000-1H10v-2.019a6.509 6.509 0 006-6.481z" />
    </svg>
  );
}

export default SvgMic;
