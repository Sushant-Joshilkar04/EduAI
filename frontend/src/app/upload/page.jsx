"use client";

import { SidebarDemo } from '@/components/Sidebar';
import React, { useState, useEffect } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { 
  Brain, BookOpen, Zap, FileText, Calendar, Download, Eye, Trash2, 
  Upload as UploadIcon, ChevronDown, ChevronUp, RotateCcw, Check, X 
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { uploadPDF, getMyDocuments, getDocumentById, deleteDocument } from "@/api/pdf";

const SpotlightCard = ({ children, className = "", spotlight = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-700 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

// Flashcard Component
const FlashcardComponent = ({ flashcard, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="h-48 sm:h-52" style={{ perspective: '1000px' }}>
      <div 
        className={`relative w-full h-full transition-transform duration-600 cursor-pointer`}
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front - Question */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <SpotlightCard className="h-full p-4 sm:p-6 flex flex-col justify-center">
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 font-bold text-sm">{index + 1}</span>
              </div>
              <h4 className="text-white font-semibold text-sm sm:text-base mb-2">Question</h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{flashcard.question}</p>
              <p className="text-gray-500 text-xs mt-4">Click to reveal answer</p>
            </div>
          </SpotlightCard>
        </div>
        
        {/* Back - Answer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <SpotlightCard className="h-full p-4 sm:p-6 flex flex-col justify-center bg-purple-900/20">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <h4 className="text-white font-semibold text-sm sm:text-base mb-2">Answer</h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{flashcard.answer}</p>
              <p className="text-gray-500 text-xs mt-4">Click to flip back</p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

// MCQ Component
const MCQComponent = ({ mcq, index }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (optionIndex) => {
    if (showResult) return;
    setSelectedAnswer(optionIndex);
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <SpotlightCard className="p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
            <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
          </div>
          <h4 className="text-white font-semibold text-sm sm:text-base">Multiple Choice</h4>
        </div>
        {showResult && (
          <button
            onClick={resetQuestion}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">{mcq.question}</p>
      
      <div className="space-y-2">
        {mcq.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === mcq.correct_answer;
          const isSelected = selectedAnswer === optionIndex;
          
          let buttonClass = "w-full text-left p-3 rounded-lg border transition-all duration-200 text-sm sm:text-base ";
          
          if (!showResult) {
            buttonClass += "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white";
          } else {
            if (isCorrect) {
              buttonClass += "border-green-500/50 bg-green-500/20 text-green-300";
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-500/50 bg-red-500/20 text-red-300";
            } else {
              buttonClass += "border-gray-700 bg-gray-800/30 text-gray-400";
            }
          }
          
          return (
            <button
              key={optionIndex}
              onClick={() => handleAnswerSelect(optionIndex)}
              className={buttonClass}
              disabled={showResult}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && isCorrect && <Check className="w-4 h-4 text-green-400" />}
                {showResult && isSelected && !isCorrect && <X className="w-4 h-4 text-red-400" />}
              </div>
            </button>
          );
        })}
      </div>
      
      {showResult && (
        <div className="mt-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
          <p className="text-sm text-gray-300">
            {selectedAnswer === mcq.correct_answer 
              ? "✅ Correct! Well done." 
              : `❌ Incorrect. The correct answer was: ${mcq.options[mcq.correct_answer]}`
            }
          </p>
        </div>
      )}
    </SpotlightCard>
  );
};

// Summary Component
const SummaryComponent = ({ summary }) => {
  return (
    <SpotlightCard className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
          <Zap className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className="text-white font-semibold text-lg sm:text-xl">Summary</h3>
      </div>
      
      <div className="space-y-3">
        {summary.map((point, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
              <span className="text-yellow-400 font-bold text-xs">{index + 1}</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </SpotlightCard>
  );
};

// AI Content Display Component
const AIContentDisplay = ({ aiData }) => {
  const [activeTab, setActiveTab] = useState('summary');

  if (!aiData) return null;

  const tabs = [
    { id: 'summary', label: 'Summary', icon: Zap, count: aiData.summary?.length || 0 },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen, count: aiData.flashcards?.length || 0 },
    { id: 'mcqs', label: 'MCQs', icon: Brain, count: aiData.mcqs?.length || 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'summary' && aiData.summary && (
          <SummaryComponent summary={aiData.summary} />
        )}
        
        {activeTab === 'flashcards' && aiData.flashcards && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {aiData.flashcards.map((flashcard, index) => (
              <FlashcardComponent key={index} flashcard={flashcard} index={index} />
            ))}
          </div>
        )}
        
        {activeTab === 'mcqs' && aiData.mcqs && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {aiData.mcqs.map((mcq, index) => (
              <MCQComponent key={index} mcq={mcq} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Previous Uploads Dropdown
const PreviousUploadsDropdown = ({ documents, onSelectDocument, onDeleteDocument, loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (documents.length === 0) return null;

  const handleDelete = async (e, docId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this document?')) {
      await onDeleteDocument(docId);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-lg transition-colors text-sm sm:text-base border border-gray-700"
      >
        <FileText className="w-4 h-4" />
        <span>Previous Uploads ({documents.length})</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between hover:bg-gray-800/50 transition-colors border-b border-gray-800 last:border-b-0"
            >
              <button
                onClick={() => {
                  onSelectDocument(doc);
                  setIsOpen(false);
                }}
                className="flex-1 text-left px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {doc.name || doc.filename || 'Untitled Document'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(doc.createdAt || doc.uploadDate || new Date()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={(e) => handleDelete(e, doc.id)}
                className="p-2 mr-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingAI, setProcessingAI] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deleting, setDeleting] = useState(null);

  // Load previous documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        const docs = await getMyDocuments(token);
        setDocuments(docs);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    setFiles(files);
    console.log(files);
    
    if (files.length > 0) {
      const file = files[0];
      try {
        setProcessingAI(true);
        const formData = new FormData();
        formData.append('pdf', file);
        
        const token = localStorage.getItem('token');
        
        if (token) {
          const result = await uploadPDF(formData, token);
          
          setSelectedDocument({
            id: result._id,
            name: result.fileName || file.name,
            filename: result.fileName || file.name,
            fileUrl: result.fileUrl,
            createdAt: new Date().toISOString()
          });
          
          if (result.aiContent) {
            setAiData(result.aiContent);
          }
          
          await loadDocuments();
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      } finally {
        setProcessingAI(false);
      }
    }
  };

  const handleSelectDocument = async (document) => {
    try {
      setProcessingAI(true);
      const token = localStorage.getItem('token');
      if (token) {
        const docData = await getDocumentById(document.id, token);
        setSelectedDocument(docData);
        
        if (docData.aiContent) {
          setAiData(docData.aiContent);
        } else {
          setAiData(null);
        }
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      alert('Error loading document. Please try again.');
    } finally {
      setProcessingAI(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      setDeleting(documentId);
      const token = localStorage.getItem('token');
      if (token) {
        await deleteDocument(documentId, token);
        
        // If the deleted document is currently selected, clear the selection
        if (selectedDocument && selectedDocument.id === documentId) {
          setSelectedDocument(null);
          setAiData(null);
        }
        
        // Reload documents list
        await loadDocuments();
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const resetToUpload = () => {
    setFiles([]);
    setSelectedDocument(null);
    setAiData(null);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-950">
        <div className={sidebarOpen ? "w-[270px] min-w-[220px] max-w-xs transition-all duration-300" : "w-[60px] min-w-[60px] max-w-[60px] transition-all duration-300 sticky top-0 h-screen"}>
          <SidebarDemo open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Header Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4 sm:p-6 md:p-8 lg:p-10 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
                AI-Powered Study Assistant
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-300 mb-4 sm:mb-5 md:mb-6 lg:mb-8 px-2">
                Upload PDFs &lt;10MB → AI generates quizzes, flashcards, summaries
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
                  <span className="font-medium text-sm sm:text-base md:text-lg">Smart Quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400" />
                  <span className="font-medium text-sm sm:text-base md:text-lg">Flashcards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400" />
                  <span className="font-medium text-sm sm:text-base md:text-lg">Quick Summaries</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              {/* File Upload Section */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">
                    Upload Document
                  </h2>
                  <div className="flex items-center gap-4">
                    <PreviousUploadsDropdown 
                      documents={documents}
                      onSelectDocument={handleSelectDocument}
                      onDeleteDocument={handleDeleteDocument}
                      loading={loading}
                    />
                    {selectedDocument && (
                      <button
                        onClick={resetToUpload}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                      >
                        <UploadIcon className="w-4 h-4" />
                        New Upload
                      </button>
                    )}
                  </div>
                </div>
                
                {!selectedDocument && <FileUpload onChange={handleFileUpload} />}
                
                {selectedDocument && (
                  <SpotlightCard className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                          <FileText className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {selectedDocument.name || selectedDocument.filename || 'Document'}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            AI processing completed • Ready for study
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteDocument(selectedDocument.id)}
                        disabled={deleting === selectedDocument.id}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete document"
                      >
                        {deleting === selectedDocument.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </SpotlightCard>
                )}
              </div>

              {/* Processing State */}
              {processingAI && (
                <div className="flex items-center justify-center p-8 mb-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Processing document with AI...</p>
                  </div>
                </div>
              )}

              {/* AI Generated Content */}
              {aiData && !processingAI && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    AI Generated Content
                  </h2>
                  <AIContentDisplay aiData={aiData} />
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-400">Loading documents...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}