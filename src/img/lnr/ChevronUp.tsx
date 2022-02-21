import * as React from "react";

function SvgChevronUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M0 15a.5.5 0 00.853.354l8.646-8.646 8.646 8.646a.5.5 0 00.707-.707l-9-9a.5.5 0 00-.707 0l-9 9a.498.498 0 00-.146.354z" />
    </svg>
  );
}

export default SvgChevronUp;
