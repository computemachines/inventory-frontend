import * as React from "react";

function SvgCloudUpload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path d="M16.006 16H12.5a.5.5 0 010-1h3.506C17.657 15 19 13.657 19 12.006a2.997 2.997 0 00-4.017-2.815.5.5 0 01-.533-.814A2.002 2.002 0 0013 5c-.642 0-1.229.297-1.61.814a1.99 1.99 0 00-.386 1.061.501.501 0 01-.909.256l-.005-.007a5.008 5.008 0 00-4.091-2.123c-2.757 0-5 2.243-5 5s2.243 5 5 5h2.5a.5.5 0 010 1h-2.5c-3.308 0-6-2.692-6-6s2.692-6 6-6c1.603 0 3.137.643 4.261 1.775a3.002 3.002 0 015.563 2.242A3.999 3.999 0 0120 12.008a3.999 3.999 0 01-3.994 3.994z" />
      <path d="M12.854 12.146l-2-2a.5.5 0 00-.707 0l-2 2a.5.5 0 00.707.707L10 11.707V15.5a.5.5 0 001 0v-3.793l1.146 1.146a.498.498 0 00.708 0 .5.5 0 000-.707z" />
    </svg>
  );
}

export default SvgCloudUpload;
