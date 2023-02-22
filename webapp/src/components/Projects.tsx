import { getFileNameFromBlobUrl } from "../lib/strings";

type ProjectsProps = {
  projectFiles: string[];
};

function Projects(props: ProjectsProps) {
  if (!props.projectFiles?.length) {
    return (
      <div className="prose">
        <p>No projects available for this course.</p>
      </div>
    );
  }

  return (
    <div className="prose">
      <ul>
        {props.projectFiles.map((file, index) => (
          <li key={index}>
            <a href={file} className="link link-primary">
              {getFileNameFromBlobUrl(file)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Projects;
