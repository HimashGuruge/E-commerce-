import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import uploadMediaToSupabase from '@/components/utils/mediaUpload';
import { MdCloudUpload, MdCheckCircle, MdError, MdTextFields, MdCrop } from 'react-icons/md';

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.9);
  });
};

export default function AdsManage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState(null);

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
      const croppedFile = new File([croppedBlob], `ad-${Date.now()}.jpg`, { type: "image/jpeg" });
      setFile(croppedFile);
      setPreview(URL.createObjectURL(croppedBlob));
      setShowCropper(false);
      URL.revokeObjectURL(tempImage);
    } catch (e) { console.error(e); }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      setStatus({ type: 'error', msg: 'Please provide a title and crop an image.' });
      return;
    }
    setUploading(true);
    try {
      const publicUrl = await uploadMediaToSupabase(file);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ads`, {
        title: title,
        imageUrl: publicUrl
      });
      setStatus({ type: 'success', msg: 'Ad published successfully!' });
      setFile(null); setPreview(null); setTitle("");
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to publish.' });
    } finally { setUploading(false); }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      {showCropper && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-3xl h-[60vh] bg-gray-900 rounded-2xl overflow-hidden">
            <Cropper
              image={tempImage}
              crop={crop}
              zoom={zoom}
              aspect={21 / 7} // Home Page එකට ගැලපෙන Ratio එක
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-6 w-full max-w-md space-y-4">
            <input type="range" value={zoom} min={1} max={3} step={0.1} onChange={(e) => setZoom(e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg accent-blue-500" />
            <div className="flex gap-4">
              <button onClick={() => setShowCropper(false)} className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-bold">Cancel</button>
              <button onClick={confirmCrop} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 font-bold"><MdCrop size={20} /> Confirm Crop</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Campaign Manager</h2>
        
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Advertisement Title</label>
          <div className="relative group">
            <MdTextFields className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., MEGA SALE 2026" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none ring-2 ring-transparent focus:ring-blue-500/20 transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Banner Image</label>
          <div className="relative aspect-[21/7] w-full border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden bg-gray-50/50 group">
            <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
            {preview ? (
              <img src={preview} alt="Cropped" className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <MdCloudUpload size={40} className="mb-2" />
                <p className="font-bold">Click to Upload and Crop</p>
              </div>
            )}
          </div>
        </div>

        {status.msg && <div className={`p-4 rounded-2xl font-bold text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{status.msg}</div>}

        <button onClick={handleUpload} disabled={uploading} className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-slate-900 hover:bg-blue-600 shadow-xl transition-all">
          {uploading ? 'Publishing...' : 'Publish Campaign'}
        </button>
      </div>
    </div>
  );
}