import React, { useState } from 'react';
import { ProcessingStatus, FileData } from './types';
import { geminiService } from './services/geminiService';
import FileUpload from './components/FileUpload';
import FilePreview from './components/FilePreview';
import ResultDisplay from './components/ResultDisplay';
import { Loader2, Calculator, AlertCircle, Sparkles, FileText, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileSelect = (data: FileData) => {
    setFileData(data);
    setStatus(ProcessingStatus.IDLE);
    setResult('');
    setError('');
  };

  const handleClearFile = () => {
    setFileData(null);
    setStatus(ProcessingStatus.IDLE);
    setResult('');
    setError('');
  };

  const handleProcess = async () => {
    if (!fileData) return;

    setStatus(ProcessingStatus.PROCESSING);
    setError('');

    try {
      const text = await geminiService.processFile(fileData);
      setResult(text);
      setStatus(ProcessingStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi không xác định");
      setStatus(ProcessingStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen text-slate-800">
      
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">MathScan</h1>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">AI to LaTeX Converter</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Gemini 2.5 Flash
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-[calc(100vh-8rem)]">
          
          {/* Left Column: Input (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pr-1 custom-scrollbar">
            
            {/* Step 1 Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white p-6 flex-none relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
               
               <div className="flex items-center gap-3 mb-4 relative z-10">
                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm ring-4 ring-white shadow-sm">1</div>
                 <h2 className="text-lg font-bold text-slate-800">Tải lên tài liệu</h2>
               </div>

               {!fileData ? (
                 <FileUpload onFileSelect={handleFileSelect} isLoading={status === ProcessingStatus.PROCESSING} />
               ) : (
                 <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <FilePreview fileData={fileData} onClear={handleClearFile} />
                    
                    {status !== ProcessingStatus.PROCESSING && status !== ProcessingStatus.SUCCESS && (
                      <button
                         onClick={handleProcess}
                         className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <Sparkles className="w-5 h-5 group-hover/btn:animate-ping" />
                        <span>Bắt đầu chuyển đổi</span>
                        <ArrowRight className="w-5 h-5 ml-auto opacity-70" />
                      </button>
                    )}
                 </div>
               )}
            </div>

             {/* Status Cards */}
             {status === ProcessingStatus.PROCESSING && (
                <div className="flex-1 flex flex-col items-center justify-center bg-white/60 backdrop-blur rounded-2xl border border-white shadow-lg p-8 text-center animate-in fade-in duration-500">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                        <div className="relative bg-white p-4 rounded-full shadow-md">
                            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Đang xử lý AI...</h3>
                    <p className="text-slate-500 mt-2 max-w-xs mx-auto">Hệ thống đang phân tích cấu trúc, nhận diện công thức và hình học.</p>
                </div>
             )}
             
             {status === ProcessingStatus.ERROR && (
                 <div className="bg-red-50/80 backdrop-blur border border-red-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 animate-in shake">
                    <div className="bg-red-100 p-2 rounded-full flex-none">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-red-900 text-lg">Lỗi xử lý</h4>
                        <p className="text-red-700 mt-1 mb-3">{error}</p>
                        <button 
                            onClick={handleProcess} 
                            className="px-4 py-2 bg-white text-red-700 font-semibold rounded-lg shadow-sm border border-red-100 hover:bg-red-50 transition-colors text-sm"
                        >
                            Thử lại ngay
                        </button>
                    </div>
                 </div>
             )}
          </div>

          {/* Right Column: Output (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 h-full flex flex-col">
             <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white flex flex-col h-full overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex-none bg-white flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm ring-4 ring-white shadow-sm">2</div>
                         <div>
                             <h2 className="text-lg font-bold text-slate-800">Kết quả đầu ra</h2>
                             <p className="text-xs text-slate-400 font-medium">Sẵn sàng copy sang Word</p>
                         </div>
                     </div>
                </div>
                
                <div className="flex-1 p-1 bg-slate-50/50 overflow-hidden relative">
                    {result ? (
                        <ResultDisplay 
                            key={fileData?.previewUrl || 'empty'} 
                            content={result} 
                            fileData={fileData} 
                        />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 m-4 rounded-xl bg-slate-50/50">
                            <div className="p-6 bg-white rounded-full shadow-sm mb-4">
                                <FileText className="w-12 h-12 text-slate-200" />
                            </div>
                            <p className="font-medium text-lg">Kết quả sẽ hiển thị tại đây</p>
                            <p className="text-sm">Vui lòng tải lên tài liệu ở cột bên trái</p>
                        </div>
                    )}
                </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;