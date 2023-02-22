import clsx from "clsx";
import React from "react";

function Text(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx(props.className, "prose max-w-none")}>
      {props.children}
    </div>
  );
}

export default Text;
