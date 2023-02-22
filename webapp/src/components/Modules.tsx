import { useScrollLock, useToggle } from "@mantine/hooks";
import Module from "./Module";
import {
  ModuleNavListItem,
  ModuleInput,
  Module as IModule,
} from "../types/courses";
import { Fragment, useState } from "react";

type ModulesProps = {
  modules: IModule[];
};

function Modules(props: ModulesProps) {
  const [showNewModuleForm, toggleNewModuleForm] = useToggle();
  return (
    <div className="max-w-4xl">
      {props.modules.length === 0 && !showNewModuleForm ? (
        <p>No modules were added.</p>
      ) : (
        props.modules.map((module, index) => (
          <Fragment key={module.id}>
            <Module
              isFirst={index === 0}
              isLast={index === props.modules.length - 1}
              module={module}
            />
            <div className="divider py-4"></div>
          </Fragment>
        ))
      )}

      {showNewModuleForm ? (
        <Module toggleNewModuleForm={toggleNewModuleForm} />
      ) : (
        <button
          className="btn btn-link m-0 p-0 capitalize"
          onClick={() => toggleNewModuleForm()}
        >
          + Add new module
        </button>
      )}
    </div>
  );
}

export default Modules;
