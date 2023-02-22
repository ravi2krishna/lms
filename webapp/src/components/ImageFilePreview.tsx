type ImageFilePreviewProps = {
  files?: FileList;
};

function ImageFilePreview(props: ImageFilePreviewProps) {
  if (!props.files?.length) {
    return null;
  }

  const srcUrl = URL.createObjectURL(props.files[0]);

  return (
    <div>
      <img src={srcUrl} alt="Preview of uploaded" />
    </div>
  );
}
export default ImageFilePreview;
