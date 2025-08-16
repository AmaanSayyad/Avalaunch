import { useState } from "react";
import { Upload, X, File, Image, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  onUpload: (url: string) => void;
  currentFile: string;
  accept?: string;
  maxSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  currentFile,
  accept = "*",
  maxSize = 5,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  // For demo purposes, we'll simulate file upload
  // In a real app, you would integrate with a storage service like AWS S3, Firebase Storage, etc.
  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setFileName(file.name);

    // Create a URL for the file (in a real app, this would be the URL from your storage service)
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        // For demo, we'll use a data URL or a fake URL
        const url = reader.result as string;
        onUpload(url);
        setIsUploading(false);
        
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      }, 1500); // Simulate network delay
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    validateAndUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    validateAndUpload(file);
  };

  const validateAndUpload = (file: File) => {
    // Check file type if accept is specified
    if (accept !== "*") {
      const fileType = file.type;
      const acceptTypes = accept.split(",").map(type => type.trim());
      
      // Handle image/* or similar patterns
      const isAccepted = acceptTypes.some(type => {
        if (type.endsWith("/*")) {
          const category = type.split("/")[0];
          return fileType.startsWith(`${category}/`);
        }
        return type === fileType;
      });
      
      if (!isAccepted) {
        toast({
          title: "Invalid file type",
          description: `Please upload a file of type: ${accept}`,
          variant: "destructive",
        });
        return;
      }
    }
    
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast({
        title: "File too large",
        description: `File size should not exceed ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }
    
    simulateUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    onUpload("");
    setFileName("");
  };

  const isImage = currentFile && (
    currentFile.startsWith("data:image/") || 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(currentFile)
  );

  // Render the file preview if we have a current file
  const renderFilePreview = () => {
    if (!currentFile) return null;
    
    return (
      <div className="mt-4 p-3 bg-black/30 rounded-lg border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isImage ? (
            <div className="w-10 h-10 rounded bg-black/50 overflow-hidden flex-shrink-0">
              <img 
                src={currentFile} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
              <File className="w-5 h-5 text-primary" />
            </div>
          )}
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{fileName || "Uploaded file"}</p>
            <p className="text-xs text-gray-400">
              {isImage ? "Image file" : "Document file"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={removeFile}
          className="text-gray-400 hover:text-white hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {!currentFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-all ${
            isDragging
              ? "border-primary/50 bg-primary/5"
              : "border-white/10 hover:border-white/20 bg-black/30"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center">
            {isUploading ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-gray-400">Uploading {fileName}...</p>
              </div>
            ) : (
              <>
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  {accept.includes("image") ? (
                    <Image className="h-6 w-6 text-primary" />
                  ) : (
                    <Upload className="h-6 w-6 text-primary" />
                  )}
                </div>
                <p className="text-sm font-medium mb-1">
                  Drag and drop your file here
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  or click to browse from your computer
                </p>
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept={accept}
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("fileUpload")?.click()}
                  className="border-white/10 hover:bg-white/5"
                >
                  Browse Files
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500">File uploaded</span>
          </div>
          {renderFilePreview()}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("fileUpload")?.click()}
            className="mt-2 border-white/10 hover:bg-white/5 w-fit"
          >
            Replace File
          </Button>
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
