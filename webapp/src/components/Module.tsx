import { useMatch } from "@tanstack/react-location";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaTrashAlt,
  FaTrashRestoreAlt,
} from "react-icons/fa";
import { customAlphabet, nanoid } from "nanoid";
import { toast } from "react-toastify";
import axiosInstance from "../lib/http-client";
import { isUrlValid } from "../lib/strings";
import {
  ModuleNavListItem,
  ModuleInput,
  Module as IModule,
} from "../types/courses";
import { ModuleOrder } from "../types/common";

type ModuleProps = {
  module?: IModule;
  toggleNewModuleForm?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
};

function Module(props: ModuleProps) {
  const isNewModule = !props.module;
  const { handleSubmit, register, control, formState, reset } =
    useForm<ModuleInput>({
      defaultValues: props.module || {
        title: "",
        topics: [
          {
            title: "",
            videoLink: "",
          },
        ],
      },
      mode: "all",
    });

  const match = useMatch();
  const queryClient = useQueryClient();

  const invalidateCourseData = () => {
    // Invalidate course data
    queryClient.invalidateQueries(["getCourse", match.params.courseId]);
  };

  const deleteModuleMuatation = useMutation({
    mutationKey: ["deleteModule"],
    mutationFn: async (moduleId: number) => {
      try {
        await axiosInstance.delete(
          `/courses/${match.params.courseId}/modules/${moduleId}`
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    },
    onSuccess: () => {
      toast("Module deleted successfully", {
        type: "success",
      });

      invalidateCourseData();
    },
  });

  const moduleOrderMutation = useMutation({
    mutationKey: ["moduleOrder"],
    mutationFn: async (order: ModuleOrder) => {
      try {
        await axiosInstance.patch(
          `/courses/${match.params.courseId}/modules/${props.module?.id}`,
          null,
          {
            params: {
              order,
            },
          }
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    },
    onSuccess: invalidateCourseData,
  });

  const createEditModuleMuation = useMutation({
    mutationKey: ["moduleCreateEdit"],
    mutationFn: async (data: ModuleInput) => {
      try {
        const res = await axiosInstance[
          isNewModule ? "post" : "put" // For edit module it is PUT
        ]<ModuleNavListItem>(
          isNewModule // For edit add module id
            ? `/courses/${match.params.courseId}/modules`
            : `/courses/${match.params.courseId}/modules/${props.module?.id}`,
          data
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    },
    onSuccess: (data) => {
      if (props.toggleNewModuleForm) {
        props.toggleNewModuleForm();
      }
      toast(`Module ${data?.title} saved`, {
        type: "success",
      });

      invalidateCourseData();
    },
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "topics", // unique name for your Field Array
  });

  const onSubmit = (data: ModuleInput) => {
    createEditModuleMuation.mutate(data);
  };

  return (
    <div className="">
      <div className="flex gap-4">
        <div className="flex flex-col justify-start gap-4 border-r pr-4">
          <button
            disabled={
              isNewModule || moduleOrderMutation.isLoading || props.isFirst
            }
            onClick={() => moduleOrderMutation.mutate("up")}
            className="btn btn-square"
          >
            <FaArrowCircleUp />
          </button>
          <button
            disabled={
              isNewModule || moduleOrderMutation.isLoading || props.isLast
            }
            onClick={() => moduleOrderMutation.mutate("down")}
            className="btn btn-square"
          >
            <FaArrowCircleDown />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex">
              <label className="flex w-full items-center">
                <span className="w-fit">Module</span>
                <input
                  type="text"
                  {...register("title", {
                    required: true,
                    min: 3,
                  })}
                  placeholder="Module title"
                  className="input input-primary ml-4 w-full rounded-none"
                />
              </label>
            </div>

            <div className="py-2"></div>

            <table className="table-zebra table w-full border">
              <thead className="">
                <tr>
                  <th className="rounded-none capitalize">Topic</th>
                  <th className="rounded-none capitalize">Video link</th>
                  <th className="rounded-none capitalize">remove</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id}>
                    <td className="rounded-none">
                      <input
                        type="text"
                        className="input input-primary w-full rounded-none"
                        placeholder="Topic title"
                        {...register(`topics.${index}.title`, {
                          required: true,
                          min: 3,
                          maxLength: 255,
                        })}
                      />
                    </td>
                    <td className="rounded-none">
                      <input
                        type={"url"}
                        className="input input-primary w-full rounded-none"
                        placeholder="Video link"
                        {...register(`topics.${index}.videoLink`, {
                          required: true,
                          min: 3,
                          maxLength: 255,
                          validate: (value) => isUrlValid(value),
                        })}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-circle m-0 p-0"
                        type="button"
                        disabled={fields.length <= 1}
                        onClick={() => remove(index)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              className="btn btn-link capitalize"
              onClick={() =>
                append({
                  title: "",
                  videoLink: "",
                  id: nanoid(),
                })
              }
            >
              + Add new
            </button>

            <div className="ml-auto mr-4 flex w-1/2 gap-4">
              <button
                type="button"
                className="btn btn-secondary w-1/2"
                onClick={() => {
                  if (isNewModule && props.toggleNewModuleForm) {
                    props.toggleNewModuleForm();
                  }
                  reset(props.module);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary w-1/2"
                disabled={!formState.isValid || !formState.isDirty}
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col justify-start gap-4 border-l pl-4">
          <button
            disabled={isNewModule}
            className="btn btn-square btn-warning"
            onClick={() =>
              deleteModuleMuatation.mutate(props.module?.id as number)
            }
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Module;
