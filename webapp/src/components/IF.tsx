import React from "react";

type IFProps = {
  condition: boolean;
  children: React.ReactNode;
};

export default function IF(props: IFProps) {
  return props.condition ? <>{props.children}</> : null;
}
