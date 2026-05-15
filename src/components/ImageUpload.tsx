import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ImageUploadProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

const ImageUpload = ({ file, onFileSelect }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  useEffect(() => {
    if (!file) {
      setPreviewUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    onFileSelect(nextFile);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
      <Typography variant="subtitle1">Poster Image</Typography>
      <Button variant="outlined" component="label">
        Choose image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      {file ? (
        <Typography variant="body2">{file.name}</Typography>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No poster selected
        </Typography>
      )}
      {previewUrl ? (
        <Box
          component="img"
          src={previewUrl}
          alt="Poster preview"
          sx={{ width: "100%", maxWidth: 320, borderRadius: 1 }}
        />
      ) : null}
      {file ? (
        <Button
          variant="text"
          onClick={() => onFileSelect(null)}
          sx={{ alignSelf: "flex-start" }}
        >
          Remove image
        </Button>
      ) : null}
    </Box>
  );
};

export default ImageUpload;
