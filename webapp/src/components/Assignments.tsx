type AssignmentsProps = {
  assignmentFiles?: string[];
};

function Assignments(props: AssignmentsProps) {
  if (!props.assignmentFiles?.length) {
    return (
      <div className="prose">
        <p>No assignments available for this topic.</p>
      </div>
    );
  }

  return (
    <div className="prose">
      <ul>
        {props.assignmentFiles.map((file, index) => (
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

export default Assignments;
