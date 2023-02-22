type ResourcesProps = {
  resourceFiles?: string[];
};

function Resources(props: ResourcesProps) {
  if (!props.resourceFiles?.length) {
    return (
      <div className="prose">
        <p>No resource available for this topic.</p>
      </div>
    );
  }

  return (
    <div className="prose">
      <ul>
        {props.resourceFiles.map((file, index) => (
          <li key={index}>
            <a href={file} className="link link-primary">
              {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Resources;
