import * as React from "react";

function SvgUndo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M17.51 4.49C15.905 2.885 13.77 2 11.5 2s-4.405.884-6.01 2.49S3 8.23 3 10.5v1.293L.854 9.647a.5.5 0 00-.707.707l3 3a.498.498 0 00.708 0l3-3a.5.5 0 00-.707-.707l-2.146 2.146V10.5c0-4.136 3.364-7.5 7.5-7.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5a.5.5 0 000 1c2.27 0 4.405-.884 6.01-2.49s2.49-3.74 2.49-6.01c0-2.27-.884-4.405-2.49-6.01z" />
    </svg>
  );
}

export default SvgUndo;
