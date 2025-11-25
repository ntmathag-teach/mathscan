import React from 'react';
import { FileData } from '../types';
import { X, FileText, RefreshCw, Image as ImageIcon } from 'lucide-react';

interface FilePreviewProps {
  fileData: FileData;
  onClear: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileData, onClear }) => {
  const isPdf = fileData.mimeType === 'application/pdf';

  return (
    <div className="relative w-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm group hover:shadow-md transition-shadow duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between p-3 px-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 truncate max-w-[85%]">
          {isPdf ? (
             <div className="p-2 bg-red-50 rounded-lg border border-red-100">
                <FileText className="w-5 h-5 text-red-500" />
             </div>
          ) : (
             <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                <ImageIcon className="w-5 h-5 text-blue-500" />
             </div>
          )}
          <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-slate-700 truncate leading-tight" title={fileData.file.name}>
                {fileData.file.name}
              </span>
              <span className="text-[11px] text-slate-400 font-medium uppercase mt-0.5">
                {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
              </span>
          </div>
        </div>
        <button 
          onClick={onClear}
          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-500"
          title="Xóa file hiện tại"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Preview Body */}
      <div className="h-[400px] w-full bg-slate-50 flex items-center justify-center overflow-auto relative">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
        
        {isPdf ? (
          <embed 
            src={fileData.previewUrl} 
            type="application/pdf" 
            className="w-full h-full relative z-10" 
          />
        ) : (
          <img 
            src={fileData.previewUrl} 
            alt="Preview" 
            className="max-w-full max-h-full object-contain p-4 relative z-10 drop-shadow-sm" 
          />
        )}
      </div>

      {/* Footer Action */}
      <div className="p-3 border-t border-gray-100 bg-white">
        <button 
            onClick={onClear}
            className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-sm group/btn"
        >
            <RefreshCw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
            Chọn tài liệu khác
        </button>
      </div>
    </div>
  );
};

export default FilePreview;
