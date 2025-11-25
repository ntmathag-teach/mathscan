import React from 'react';
import { X } from 'lucide-react';
import { FileData } from '../types';

interface FilePreviewProps {
  fileData: FileData;
  onClear: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileData, onClear }) => {
  return (
    <div className="relative group">
      <div className="absolute -top-2 -right-2 z-10">
        <button
          onClick={onClear}
          className="bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
          title="Xóa ảnh"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-50">
        <img
          src={fileData.previewUrl}
          alt="Preview"
          className="w-full h-auto object-contain max-h-[300px]"
        />
        <div className="p-3 bg-white border-t border-slate-100">
          <p className="text-xs text-slate-500 truncate font-medium">
            {fileData.file.name}
          </p>
          <p className="text-[10px] text-slate-400">
            {(fileData.file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
