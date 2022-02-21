import * as React from "react";

function SvgHighlight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M19.854 9.646a.5.5 0 00-.707 0l-3.586 3.586a1.501 1.501 0 01-2.121 0L8.768 8.56c-.282-.282-.437-.658-.437-1.061s.155-.779.437-1.061l3.586-3.586a.5.5 0 00-.707-.707L8.061 5.731a2.481 2.481 0 00-.73 1.768c0 .285.048.563.138.824L.147 15.645a.5.5 0 00-.146.354v1.5a.5.5 0 00.5.5h9.5c.133 0 .26-.053.354-.146l3.322-3.322a2.5 2.5 0 00.824.138c.669 0 1.297-.259 1.768-.73l3.586-3.586a.5.5 0 000-.707zM9.793 17H1v-.793l7.002-7.002.059.062 4.672 4.672.062.059L9.793 17z" />
    </svg>
  );
}

export default SvgHighlight;
