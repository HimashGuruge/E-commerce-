import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import {
  MdCloudUpload,
  MdCheckCircle,
  MdError,
  MdTextFields,
  MdCrop,
  MdDelete,
  MdDesktopWindows,
  MdInfo,
} from "react-icons/md";
import Swal from "sweetalert2";

// Image Cropping Helper
const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
  });
};

export default function AdsManage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [ads, setAds] = useState([]);

  // Cropper States
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const fetchAds = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/ads`
      );
      setAds(res.data);
    } catch (err) {
      console.error("Error fetching ads", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const onCropComplete = useCallback((_area, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setTempImage(url);
      setShowCropper(true);
    }
  };

  const confirmCrop = async () => {
    try {
      const croppedBlob = await getCroppedImg(tempImage, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], `ad-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });
      setFile(croppedFile);
      setPreview(URL.createObjectURL(croppedBlob));
      setShowCropper(false);
      URL.revokeObjectURL(tempImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      Swal.fire({
        icon: "error",
        title: "Missing Info",
        text: "Please add a title and an image.",
      });
      return;
    }
    setUploading(true);
    try {
      const publicUrl = await uploadMediaToSupabase(file);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ads`, {
        title: title,
        imageUrl: publicUrl,
      });
      Swal.fire({
        icon: "success",
        title: "Campaign Launched!",
        timer: 2000,
        showConfirmButton: false,
      });
      setFile(null);
      setPreview(null);
      setTitle("");
      fetchAds();
    } catch (err) {
      Swal.fire("Error", "Failed to publish.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Campaign?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/ads/${id}`);
        fetchAds();
        Swal.fire("Deleted!", "", "success");
      } catch (err) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen space-y-10 bg-[#f9fafb]">
      {/* --- SECTION: CAMPAIGN BUILDER --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: INPUTS (7/12) */}
        <div className="lg:col-span-7 bg-white rounded-[32px] shadow-sm border border-gray-200 p-6 md:p-10 space-y-8">
          <header className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <MdCloudUpload size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                Campaign Manager
              </h2>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                Global Ad Management
              </p>
            </div>
          </header>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Headline Text
              </label>
              <div className="relative group">
                <MdTextFields
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., WINTER COLLECTION 2026"
                  className="w-full pl-14 pr-6 py-4.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Banner Design
              </label>
              <div className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-[24px] bg-gray-50 hover:bg-white hover:border-blue-400 transition-all duration-300">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  accept="image/*"
                />
                <div className="p-10 text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-gray-200">
                    <MdCloudUpload size={28} className="text-blue-500" />
                  </div>
                  <p className="text-gray-600 font-bold text-sm">
                    Upload High-Res Banner
                  </p>
                  <p className="text-gray-400 text-[9px] mt-1 uppercase font-black tracking-widest italic">
                    Supports JPG, PNG (21:7 Ratio)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full py-5 rounded-[22px] font-black text-[11px] uppercase tracking-[0.2em] text-white bg-gray-900 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {uploading ? "Processing Launch..." : "Publish to Storefront"}
          </button>
        </div>

        {/* RIGHT: LIVE MOCKUP PREVIEW (5/12) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <MdDesktopWindows size={16} /> Real-time Preview
            </h3>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic">
              Live Feed
            </span>
          </div>

          <div className="bg-[#111827] rounded-[32px] p-2.5 shadow-2xl shadow-blue-900/10 border border-gray-800">
            {/* Fake Browser Toolbar */}
            <div className="flex items-center gap-1.5 p-3 px-5 border-b border-gray-800/50">
              <div className="w-2 h-2 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 rounded-full bg-amber-500/80" />
              <div className="w-2 h-2 rounded-full bg-green-500/80" />
              <div className="h-3 w-32 bg-gray-800 rounded-full ml-4" />
            </div>

            <div className="relative aspect-[21/9] bg-gray-900 rounded-b-[24px] overflow-hidden group">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Mockup"
                    className="w-full h-full object-cover opacity-90 animate-in fade-in duration-500"
                  />
                  {/* Banner Content Overlay Simulation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <p className="text-white font-black text-xl leading-tight drop-shadow-xl uppercase italic tracking-tighter max-w-[80%]">
                      {title || "Campaign Headline"}
                    </p>
                    <div className="mt-3 w-max px-5 py-2 bg-blue-600 text-white text-[9px] font-black rounded-lg uppercase shadow-lg">
                      Shop Now
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 p-8 text-center bg-slate-900/50">
                  <MdCrop size={32} className="mb-3 opacity-10" />
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                    Image preview will appear here
                    <br />
                    after cropping
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 flex gap-4">
            <MdInfo className="text-blue-500 shrink-0" size={24} />
            <p className="text-[11px] text-blue-700/80 font-medium leading-relaxed italic">
              The preview simulates how customers will see the banner on your
              homepage. Ensure text is readable against the background.
            </p>
          </div>
        </div>
      </div>

      {/* --- SECTION: ACTIVE ADS LIST --- */}
      <div className="space-y-6 pt-10 border-t border-gray-200">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black text-gray-800 tracking-tight">
            Active Campaigns ({ads.length})
          </h3>
          <button
            onClick={fetchAds}
            className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
          >
            Refresh List
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="group bg-white p-4 rounded-[28px] border border-gray-100 flex items-center gap-5 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div className="relative w-40 aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-500 text-white text-[7px] font-black uppercase rounded shadow-lg flex items-center gap-1">
                  <span className="w-1 h-1 bg-white rounded-full animate-ping" />{" "}
                  Live
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-gray-800 uppercase tracking-tight truncate text-sm">
                  {ad.title}
                </h4>
                <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">
                  ID: {ad._id.slice(-6)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(ad._id)}
                className="p-3.5 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm shrink-0"
              >
                <MdDelete size={18} />
              </button>
            </div>
          ))}
          {ads.length === 0 && (
            <div className="md:col-span-2 py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[40px] flex flex-col items-center justify-center text-gray-400">
              <MdDesktopWindows size={48} className="mb-4 opacity-10" />
              <p className="font-black text-xs uppercase tracking-[0.2em]">
                No Active Campaigns
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- CROPPER MODAL (FIXED POSITION) --- */}
      {showCropper && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl h-[60vh] bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl">
            <Cropper
              image={tempImage}
              crop={crop}
              zoom={zoom}
              aspect={21 / 7}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-8 w-full max-w-sm space-y-6">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(e.target.value)}
              className="w-full h-1.5 bg-gray-800 rounded-lg accent-blue-600"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowCropper(false)}
                className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
              >
                Discard
              </button>
              <button
                onClick={confirmCrop}
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <MdCrop size={16} /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
