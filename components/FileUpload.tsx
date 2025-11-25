import React, { useRef } from 'react';

interface FileUploadProps {
  onImageSelect: (base64: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Lấy phần data base64 sau dấu phẩy (bỏ prefix data:image...)
        const base64Data = base64String.split(',')[1]; 
        onImageSelect(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="file-upload-container" style={{ margin: '20px 0', textAlign: 'center' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
      >
        📷 Chọn ảnh bài toán
      </button>
    </div>
  );
};

export default FileUpload;
