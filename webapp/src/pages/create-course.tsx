import { useNavigate } from "@tanstack/react-location";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../lib/http-client";
import { Course } from "../types/courses";

function CreateCourse() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["createCourse"],
    mutationFn: async (data: { title: string; description: string }) => {
      try {
        const res = await axiosInstance.post<Course>("/courses", data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["getAllCourses"], (prevData: unknown) => {
        if (Array.isArray(prevData) && data) {
          return [...prevData, { id: data.id, title: data.title }];
        }
        return prevData;
      });

      toast("Course created successfully", {
        type: "success",
      });

      navigate({
        to: `../${data?.id}`,
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    });
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="pb-4 text-xl">Create Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <label htmlFor="title" className="flex flex-col">
            Title
            <input
              type="text"
              id="title"
              required
              name="title"
              placeholder="Title"
              className="input input-primary rounded-none"
            />
          </label>

          <label htmlFor="description" className="flex flex-col">
            Description
            <textarea
              id="description"
              name="description"
              required
              placeholder="Description"
              rows={10}
              className="textarea textarea-primary rounded-none"
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;
