"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ReactFlow } from "@xyflow/react";

import { generateStudyPlan, getAllStudyPlans, getStudyPlanById, deleteStudyPlan } from "@/api/planner"
import { SidebarDemo } from "@/components/Sidebar";

export default function StudyPlanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);

  const [topics, setTopics] = useState("");
  const [deadlineDays, setDeadlineDays] = useState(7);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [loading, setLoading] = useState(false);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // New state for saved plans
  const [savedPlans, setSavedPlans] = useState([]);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkDeviceType = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      if (isMobileDevice) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Load saved plans on component mount
  useEffect(() => {
    loadSavedPlans();
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Load all saved study plans
  const loadSavedPlans = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoadingPlans(true);
      const res = await getAllStudyPlans(token);
      setSavedPlans(res.plans || []);
    } catch (err) {
      console.error("Error loading saved plans:", err);
    } finally {
      setLoadingPlans(false);
    }
  };

  // Load a specific study plan by ID
  const loadStudyPlan = async (planId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const res = await getStudyPlanById(planId, token);
      setNodes(res.plan.nodes || []);
      setEdges(res.plan.edges || []);
      setCurrentPlanId(planId);
      
      // Update form fields if plan data includes them
      if (res.plan.topics) {
        setTopics(res.plan.topics.join(", "));
      }
      if (res.plan.deadlineDays) {
        setDeadlineDays(res.plan.deadlineDays);
      }
      if (res.plan.hoursPerDay) {
        setHoursPerDay(res.plan.hoursPerDay);
      }
    } catch (err) {
      console.error("Error loading study plan:", err);
      alert("Failed to load study plan.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a study plan
  const handleDeletePlan = async (planId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("Are you sure you want to delete this study plan?")) return;

    try {
      await deleteStudyPlan(planId, token);
      setSavedPlans(prev => prev.filter(plan => plan.id !== planId));
      
      // Clear current plan if it was deleted
      if (currentPlanId === planId) {
        setNodes([]);
        setEdges([]);
        setCurrentPlanId(null);
      }
      
      alert("Study plan deleted successfully!");
    } catch (err) {
      console.error("Error deleting study plan:", err);
      alert("Failed to delete study plan.");
    }
  };

  const handleGenerate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to continue.");

    const topicList = topics.split(",").map((t) => t.trim()).filter(Boolean);
    if (topicList.length === 0) return alert("Please enter at least one topic.");

    try {
      setLoading(true);
      const res = await generateStudyPlan(
        { topics: topicList, deadlineDays, hoursPerDay },
        token
      );
      setNodes(res.plan.nodes || []);
      setEdges(res.plan.edges || []);
      setCurrentPlanId(res.plan.id || null);
      
      // Refresh saved plans list
      loadSavedPlans();
    } catch (err) {
      console.error("Error generating study plan:", err);
      alert("Failed to generate study plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear current plan
  const handleClearPlan = () => {
    setNodes([]);
    setEdges([]);
    setCurrentPlanId(null);
    setTopics("");
    setDeadlineDays(7);
    setHoursPerDay(2);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-950">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile 
            ? `fixed top-0 left-0 z-50 h-full transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } w-[270px]`
            : sidebarOpen
              ? "w-[270px] min-w-[220px] max-w-xs transition-all duration-300"
              : "w-[60px] min-w-[60px] max-w-[60px] transition-all duration-300"
          }
        `}
      >
        <SidebarDemo 
          open={sidebarOpen} 
          setOpen={setSidebarOpen}
          isMobile={isMobile}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6 min-h-0">
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden mb-4 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Header */}
        <div className="text-white space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">AI-Powered Study Planner</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Generate a visual study plan tailored to your topics & timeline
          </p>
        </div>

        {/* Saved Plans Section */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold">Saved Plans</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSavedPlans(!showSavedPlans)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {showSavedPlans ? "Hide" : "Show"} ({savedPlans.length})
              </button>
              <button
                onClick={loadSavedPlans}
                disabled={loadingPlans}
                className="text-green-400 hover:text-green-300 text-sm"
              >
                {loadingPlans ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>

          {showSavedPlans && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {savedPlans.length === 0 ? (
                <p className="text-gray-400 text-sm">No saved plans yet.</p>
              ) : (
                savedPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      currentPlanId === plan.id 
                        ? 'bg-blue-900 border-blue-600' 
                        : 'bg-gray-800 border-gray-700'
                    }`}
                  >
                    <div className="flex-1">
                      <h3 className="text-white text-sm font-medium">
                        {plan.title || plan.topics?.join(", ") || "Untitled Plan"}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : ""}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadStudyPlan(plan.id)}
                        className="text-blue-400 hover:text-blue-300 text-xs px-2 py-1 rounded"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter topics (comma-separated)"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-gray-800 text-white border border-gray-700 text-sm sm:text-base"
          />
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <label className="block text-gray-400 text-xs sm:text-sm mb-1">
                Deadline (days)
              </label>
              <input
                type="number"
                placeholder="7"
                value={deadlineDays}
                onChange={(e) => setDeadlineDays(Number(e.target.value))}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-gray-800 text-white border border-gray-700 text-sm sm:text-base"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-400 text-xs sm:text-sm mb-1">
                Hours per day
              </label>
              <input
                type="number"
                placeholder="2"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-gray-800 text-white border border-gray-700 text-sm sm:text-base"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors"
            >
              {loading ? "Generating..." : "Generate Study Plan"}
            </button>
            <button
              onClick={handleClearPlan}
              className="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Current Plan Info */}
        {currentPlanId && (
          <div className="bg-green-900 border border-green-600 rounded-lg p-3">
            <p className="text-green-200 text-sm">
              📋 Currently viewing saved plan (ID: {currentPlanId})
            </p>
          </div>
        )}

        {/* Flow Visualizer */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 h-[400px] sm:h-[500px] md:h-[600px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="top-right"
          >
            <Background />
            <Controls 
              position="top-left"
              showZoom={true}
              showFitView={true}
              showInteractive={false}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}