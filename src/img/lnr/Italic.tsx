import * as React from "react";

function SvgItalic(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M15.5 2h-8a.5.5 0 000 1h3.39l-2.8 14H4.5a.5.5 0 000 1h8a.5.5 0 000-1H9.11l2.8-14h3.59a.5.5 0 000-1z" />
    </svg>
  );
}

export default SvgItalic;
