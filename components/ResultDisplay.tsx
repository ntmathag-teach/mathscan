import React from 'react';
import { Copy, Check } from 'lucide-react';
import { FileData } from '../types';

interface ResultDisplayProps {
  content: string;
  fileData: FileData | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col relative group">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm ${
            copied
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Đã copy' : 'Copy kết quả'}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200 custom-scrollbar">
        <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;
