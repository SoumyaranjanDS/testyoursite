import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import { Zap, Activity, Code, ChevronDown, Play, Globe, Database, RefreshCw, FileText, Plus, Trash2 } from "lucide-react";
import api from "../../api";
import SignatureBox from "../../components/common/SignatureBox";

const CONTENT_TYPES = [
  { value: "application/json", label: "JSON", desc: "Standard for REST APIs. Data sent as a JSON object." },
  { value: "application/x-www-form-urlencoded", label: "Form Data", desc: "Standard HTML form submission format. Key-value pairs." },
  { value: "multipart/form-data", label: "Multipart", desc: "Used for uploading files or complex binary data." },
  { value: "text/plain", label: "Text", desc: "Raw unformatted text string." },
  { value: "application/xml", label: "XML", desc: "Extensible Markup Language used in SOAP/Legacy APIs." }
];

const ACCEPT_TYPES = [
  { value: "*/*", label: "Any", desc: "Accepts any content type response." },
  { value: "application/json", label: "JSON", desc: "Expects JSON response from API." },
  { value: "text/html", label: "HTML", desc: "Expects HTML document response." },
  { value: "application/xml", label: "XML", desc: "Expects XML response." }
];

const LoadGenerator = () => {
  const { fetchTestHistory } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Form State
  const [method, setMethod] = useState("GET");
  const [targetUrl, setTargetUrl] = useState("");
  const [virtualUsers, setVirtualUsers] = useState(10);
  const [duration, setDuration] = useState(10);
  const [contentType, setContentType] = useState("application/json");
  const [acceptType, setAcceptType] = useState("*/*");
  const [body, setBody] = useState("");
  const [formData, setFormData] = useState([{ key: "", value: "" }]);
  const [isTestStarting, setIsTestStarting] = useState(false);

  // UI State
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [isContentTypeDropdownOpen, setIsContentTypeDropdownOpen] = useState(false);

  const methodRef = useRef(null);
  const contentRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (methodRef.current && !methodRef.current.contains(event.target)) {
        setIsMethodDropdownOpen(false);
      }
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsContentTypeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pre-fill if navigated with state (e.g. from Re-run Test)
  useEffect(() => {
    if (location.state?.testData) {
      const { testData } = location.state;
      setMethod(testData.method || "GET");
      setTargetUrl(testData.url || "");
      setVirtualUsers(testData.virtualUsers || 10);
      setDuration(testData.duration || 10);

      if (testData.headers) {
        let headersObj = testData.headers;
        if (typeof headersObj === "string") {
          try { headersObj = JSON.parse(headersObj); } catch (e) { }
        }
        if (headersObj && headersObj["Content-Type"]) {
          setContentType(headersObj["Content-Type"]);
        }
        if (headersObj && headersObj["Accept"]) {
          setAcceptType(headersObj["Accept"]);
        }
      }
      if (testData.body) {
        if (
          testData.headers && 
          (testData.headers["Content-Type"] === "application/x-www-form-urlencoded" || testData.headers["Content-Type"] === "multipart/form-data")
        ) {
          try {
            const params = new URLSearchParams(testData.body);
            const loadedFormData = [];
            params.forEach((value, key) => {
              loadedFormData.push({ key, value });
            });
            if (loadedFormData.length === 0) loadedFormData.push({ key: "", value: "" });
            setFormData(loadedFormData);
          } catch (e) {
            setFormData([{ key: "", value: "" }]);
          }
        } else {
          setBody(typeof testData.body === "string" ? testData.body : JSON.stringify(testData.body, null, 2));
        }
      }
    }
  }, [location.state]);

  const addFormDataRow = () => {
    setFormData([...formData, { key: "", value: "" }]);
  };

  const removeFormDataRow = (index) => {
    const newData = [...formData];
    newData.splice(index, 1);
    if (newData.length === 0) newData.push({ key: "", value: "" });
    setFormData(newData);
  };

  const updateFormData = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  const handleStartTest = async (e) => {
    e.preventDefault();
    if (!targetUrl) return;

    try {
      setIsTestStarting(true);

      let finalHeaders = {};
      if (method === "GET" || method === "HEAD") {
        finalHeaders["Accept"] = acceptType;
      } else {
        finalHeaders["Content-Type"] = contentType;
      }

      let finalBody = undefined;
      if (method !== "GET" && method !== "HEAD") {
        if (contentType === "application/x-www-form-urlencoded" || contentType === "multipart/form-data") {
          const params = new URLSearchParams();
          formData.forEach(({ key, value }) => {
            if (key.trim()) params.append(key, value);
          });
          finalBody = params.toString();
        } else {
          finalBody = body;
        }
      }

      const res = await api.post("/tests/run", {
        url: targetUrl,
        method,
        headers: finalHeaders,
        body: finalBody,
        virtualUsers: Number(virtualUsers),
        duration: Number(duration),
      });

      setTargetUrl("");
      setVirtualUsers(10);
      setDuration(10);

      fetchTestHistory();
      navigate(`/dashboard/history/${res.data.testId}`);
    } catch (err) {
      console.error("Failed to start test", err);
      alert("Failed to start test. Make sure backend is running.");
    } finally {
      setIsTestStarting(false);
    }
  };

  const methodColors = {
    GET: "text-blue-400",
    POST: "text-green-400",
    PUT: "text-yellow-400",
    PATCH: "text-orange-400",
    DELETE: "text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto pb-10 relative"
    >
      {/* Re-run Banner */}
      {location.state?.testData && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6 flex items-start sm:items-center gap-3"
        >
          <RefreshCw className="w-5 h-5 text-indigo-400 mt-0.5 sm:mt-0 shrink-0" />
          <div>
            <p className="text-sm font-bold text-indigo-100">Configuration Restored</p>
            <p className="text-xs text-indigo-200/70 mt-0.5">The fields below have been pre-filled from your previous test run. You can tweak them before launching again.</p>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Load Generator</h2>
            <p className="text-xs text-gray-400">Configure endpoint, traffic shape, and payload.</p>
          </div>
        </div>

        <button
          onClick={handleStartTest}
          disabled={isTestStarting || !targetUrl}
          className="relative group bg-white hover:bg-gray-200 text-black font-bold py-2.5 px-8 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out -translate-x-full" />
          {isTestStarting ? (
            <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          <span>{isTestStarting ? "Starting..." : "Run Sequence"}</span>
        </button>
      </div>

      <form onSubmit={handleStartTest} className="space-y-6">

        {/* Split Screen Grid: Target & Traffic Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-50">

          {/* Left Column: Target Definition */}
          {/* Ensure this box has a high z-index when method dropdown is open so it renders above the right box */}
          <div className={`relative ${isMethodDropdownOpen ? 'z-[100]' : 'z-10'}`}>
            <SignatureBox className="p-1 h-full">
              <div className="bg-[#121214]/50 rounded-[10px] p-6 border border-white/5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-gray-400">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium tracking-wide">1. Target Definition</span>
                </div>

                <div className="flex flex-col gap-4 flex-1 justify-center">
                  <div className="relative w-full z-[999]" ref={methodRef}>
                    <label className="text-xs text-gray-500 font-medium mb-1.5 block">Method</label>
                    <button
                      type="button"
                      onClick={() => setIsMethodDropdownOpen(!isMethodDropdownOpen)}
                      className="w-full bg-[#09090b] border border-white/10 text-white font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-all flex items-center justify-between hover:bg-white/5 group"
                    >
                      <span className={methodColors[method] || "text-white"}>{method}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isMethodDropdownOpen ? 'rotate-180' : ''} group-hover:text-white`} />
                    </button>

                    <AnimatePresence>
                      {isMethodDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-full bg-[#121214] border border-white/10 rounded-xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] backdrop-blur-xl z-[9999]"
                        >
                          {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                            <button
                              key={m}
                              type="button"
                              className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#1f1f22] hover:text-white transition-all border-b border-white/5 last:border-0"
                              onClick={() => {
                                setMethod(m);
                                setIsMethodDropdownOpen(false);
                              }}
                            >
                              <span className={`font-bold ${methodColors[m] || "text-white"}`}>{m}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="w-full relative z-[1]">
                    <label className="text-xs text-gray-500 font-medium mb-1.5 block">Endpoint URL</label>
                    <input
                      type="url"
                      placeholder="https://api.example.com/v1/resource"
                      className="w-full bg-[#09090b] border border-white/10 text-white rounded-xl px-5 py-3 focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all placeholder:text-gray-600 font-medium"
                      required
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </SignatureBox>
          </div>

          {/* Right Column: Traffic Profile */}
          <div className="relative z-0">
            <SignatureBox className="p-1 h-full">
              <div className="bg-[#121214]/50 rounded-[10px] p-6 border border-white/5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-gray-400">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium tracking-wide">2. Traffic Profile</span>
                </div>

                <div className="space-y-8 flex-1 justify-center flex flex-col">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-200">Virtual Users</label>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-indigo-400 font-bold text-sm">
                        {virtualUsers} <span className="text-[10px] opacity-70 font-normal">VUs</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      value={virtualUsers}
                      onChange={(e) => setVirtualUsers(e.target.value)}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 font-medium px-1">
                      <span>1</span>
                      <span>250</span>
                      <span>500</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium text-gray-200">Duration</label>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-bold text-sm">
                        {duration} <span className="text-[10px] opacity-70 font-normal">sec</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="300"
                      step="5"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 font-medium px-1">
                      <span>5s</span>
                      <span>150s</span>
                      <span>300s</span>
                    </div>
                  </div>
                </div>
              </div>
            </SignatureBox>
          </div>
        </div>

        {/* Request Payload */}
        <div className={`relative ${isContentTypeDropdownOpen ? 'z-40' : 'z-10'}`}>
          <SignatureBox className="p-1">
            <div className="bg-[#121214]/50 rounded-[10px] p-6 border border-white/5 flex flex-col">

              <div className="flex items-center gap-2 text-gray-400 mb-6">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wide">3. Request Data</span>
              </div>

              {/* Content Type Selector (Always Visible for All Methods) */}
              <div className="relative w-full z-[990]" ref={contentRef}>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">
                  {method === "GET" || method === "HEAD" ? "Header Selection (Accept)" : "Header Selection (Content-Type)"}
                </label>
                <button
                  type="button"
                  onClick={() => setIsContentTypeDropdownOpen(!isContentTypeDropdownOpen)}
                  className="w-full bg-[#09090b] border border-white/10 text-white text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-all flex items-center justify-between gap-3 hover:bg-white/5 group shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      {method === "GET" || method === "HEAD" 
                        ? ACCEPT_TYPES.find(c => c.value === acceptType)?.label || "Any"
                        : CONTENT_TYPES.find(c => c.value === contentType)?.label || "JSON"
                      }
                    </span>
                    <span className="text-gray-500 text-xs hidden sm:inline-block">
                      ({method === "GET" || method === "HEAD" ? acceptType : contentType})
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isContentTypeDropdownOpen ? 'rotate-180' : ''} group-hover:text-white`} />
                </button>

                <AnimatePresence>
                  {isContentTypeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-full bg-[#121214] border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl z-[9999]"
                    >
                      {(method === "GET" || method === "HEAD" ? ACCEPT_TYPES : CONTENT_TYPES).map((ct) => (
                        <button
                          key={ct.value}
                          type="button"
                          className="w-full text-left px-4 py-3 text-sm hover:bg-[#1f1f22] transition-all flex flex-col gap-1 border-b border-white/5 last:border-0 group"
                          onClick={() => {
                            if (method === "GET" || method === "HEAD") {
                              setAcceptType(ct.value);
                            } else {
                              setContentType(ct.value);
                            }
                            setIsContentTypeDropdownOpen(false);
                          }}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className={(method === "GET" || method === "HEAD" ? acceptType : contentType) === ct.value ? "font-bold text-white" : "font-medium text-gray-300 group-hover:text-white"}>
                              {ct.label}
                            </span>
                            {(method === "GET" || method === "HEAD" ? acceptType : contentType) === ct.value && (
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-500 leading-tight">
                            {ct.desc}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dynamic Body Input Box (Hidden if GET or HEAD) */}
              {method !== "GET" && method !== "HEAD" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6"
                >
                  <label className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    Request Body
                  </label>

                  {/* FORM DATA UI */}
                  {(contentType === "application/x-www-form-urlencoded" || contentType === "multipart/form-data") ? (
                    <div className="bg-[#09090b] rounded-xl border border-white/10 p-2 space-y-2">
                      {formData.map((row, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={row.key}
                            onChange={(e) => updateFormData(index, 'key', e.target.value)}
                            placeholder="Key"
                            className="flex-1 bg-[#121214] border border-white/5 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
                          />
                          <input
                            type="text"
                            value={row.value}
                            onChange={(e) => updateFormData(index, 'value', e.target.value)}
                            placeholder="Value"
                            className="flex-1 bg-[#121214] border border-white/5 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => removeFormDataRow(index)}
                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFormDataRow}
                        className="w-full flex items-center justify-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg py-2 transition-all mt-2 border border-indigo-500/20"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Field
                      </button>
                    </div>
                  ) : (
                    /* MONACO EDITOR UI (JSON/XML/Text) */
                    <div 
                      className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] focus-within:border-indigo-500/50 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all bg-[#09090b]"
                      style={{ height: `${Math.max(160, ((body.match(/\n/g) || []).length + 1) * 21 + 32)}px` }}
                    >
                      <Editor
                        height="100%"
                        language={contentType === 'application/json' ? 'json' : contentType === 'application/xml' ? 'xml' : 'text'}
                        theme="vs-dark"
                        value={body}
                        onChange={(val) => setBody(val || "")}
                        loading={<div className="flex items-center justify-center h-full w-full text-xs text-gray-500 font-medium">Initializing Editor...</div>}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 13,
                          lineNumbers: "on",
                          padding: { top: 16, bottom: 16 },
                          overviewRulerLanes: 0,
                          hideCursorInOverviewRuler: true,
                          scrollbar: { vertical: "hidden", horizontal: "hidden" },
                          renderLineHighlight: "none",
                          autoClosingBrackets: "always",
                          autoClosingQuotes: "always",
                          formatOnPaste: true,
                          scrollBeyondLastLine: false,
                          wordWrap: "on"
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              )}

            </div>
          </SignatureBox>
        </div>

      </form>
    </motion.div>
  );
};

export default LoadGenerator;
