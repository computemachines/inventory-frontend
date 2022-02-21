import * as React from "react";

function SvgTextFormatRemove(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M13.5 1h-12a.5.5 0 000 1h5.41L5.007 13.418a.5.5 0 00.987.164L7.924 2H13.5a.5.5 0 000-1zM10.5 16h-9a.5.5 0 000 1h9a.5.5 0 000-1zM15.707 16.5l1.646-1.646a.5.5 0 00-.707-.707L15 15.793l-1.646-1.646a.5.5 0 00-.707.707l1.646 1.646-1.646 1.646a.5.5 0 00.708.707l1.646-1.646 1.646 1.646a.498.498 0 00.708 0 .5.5 0 000-.707L15.709 16.5z" />
    </svg>
  );
}

export default SvgTextFormatRemove;
