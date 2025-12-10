This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
eslint.config.js
index.html
jsconfig.json
package.json
public/vite.svg
README.md
repomix.config.json
src/App.css
src/App.jsx
src/assets/react.svg
src/components/aiChatBot.jsx
src/components/Card.jsx
src/components/imageSlider.jsx
src/components/Navbar.jsx
src/components/pages/about.jsx
src/components/pages/admin/addProducts.jsx
src/components/pages/admin/AdminAllProductView.jsx
src/components/pages/admin/dashboard.jsx
src/components/pages/admin/EditProducts.jsx
src/components/pages/admin/notification.jsx
src/components/pages/admin/payment.jsx
src/components/pages/HomeContainer.jsx
src/components/pages/Homepage.jsx
src/components/pages/Login.jsx
src/components/pages/NotFound.jsx
src/components/pages/productoverview.jsx
src/components/pages/service.jsx
src/components/pages/shipping.jsx
src/components/pages/singUp.jsx
src/components/pages/viewCart.jsx
src/components/utils/cart.jsx
src/components/utils/mediaupload.jsx
src/index.css
src/main.jsx
text.text
vite.config.js
```

# Files

## File: src/components/pages/admin/payment.jsx
```javascript
import React from 'react'

export default function payment() {
  return (
    <div>payment</div>
  )
}
```

## File: eslint.config.js
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

## File: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: jsconfig.json
```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "src/*"
            ],
            "@components/*": [
                "src/components/*"
            ],
            "@utils/*": [
                "src/utils/*"
            ]
        }
    },
    "include": [
        "src"
    ]
}
```

## File: public/vite.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
```

## File: README.md
```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```

## File: repomix.config.json
```json
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",
  "input": {
    "maxFileSize": 52428800
  },
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "truncateBase64": false,
    "copyToClipboard": false,
    "includeFullDirectoryStructure": false,
    "tokenCountTree": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": false,
      "includeLogs": false,
      "includeLogsCount": 50
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDotIgnore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
```

## File: src/App.jsx
```javascript
import Homepage from "@/components/pages/Homepage";
import NotFound from "@/components/pages/NotFound"; // import new page
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Uploadmedia from "@/components/utils/mediaUpload";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

## File: src/assets/react.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: src/components/imageSlider.jsx
```javascript
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function ImageSlider({ images = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return null;

  return (
    <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      {/* Main Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
        <img
          src={images[currentImage]}
          alt={`product-${currentImage}`}
          className="w-full h-full object-cover object-center"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 sm:left-3 md:left-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black/60 transition"
        >
          <AiOutlineLeft size={20} className="sm:text-[24px] md:text-[28px]" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 sm:right-3 md:right-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-black/60 transition"
        >
          <AiOutlineRight size={20} className="sm:text-[24px] md:text-[28px]" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-3 justify-center overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
              currentImage === index ? "border-red-500" : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`thumb-${index}`}
              className="w-16 h-16 object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
```

## File: src/components/pages/about.jsx
```javascript
import React from 'react';

export default function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700 text-lg">
        Welcome to our website! This is the About page where you can share information
        about your company, mission, or services.
      </p>
    </div>
  );
}
```

## File: src/components/pages/NotFound.jsx
```javascript
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
```

## File: src/components/pages/service.jsx
```javascript
import React from 'react';

export default function Service() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
      <p className="text-gray-700 text-lg">
        Here you can describe the services your company offers. Add details to help
        users understand what you provide.
      </p>
    </div>
  );
}
```

## File: src/components/pages/shipping.jsx
```javascript
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Truck, Package, CreditCard, Shield, CheckCircle, ArrowLeft, Lock, MapPin, User, Phone, Edit, Plus, Trash2, Calendar } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
export default function Shipping() {
  const location = useLocation();
  const navigate = useNavigate();
  const quoteData = location.state;

  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    phone: '+94 77 123 4567',
    email: 'john@example.com'
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    type: 'Home',
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    isDefault: false
  });

  const token = localStorage.getItem('token');

  // Fetch addresses from API on load
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/addresses', {
          headers: { Authorization: token }
        });
        setAddresses(res.data);
        const defaultAddr = res.data.find(addr => addr.isDefault) || res.data[0];
        setSelectedAddress(defaultAddr || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Save or update address with Axios
  const handleSaveAddress = async () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.addressLine1 || !addressForm.city) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields (Name, Phone, Address, City)',
      });
      return;
    }

    try {
      setLoading(true);
      let response;

      if (editingAddressIndex !== null) {
        // Update existing address
        const addrId = addresses[editingAddressIndex].id;
        response = await axios.put(
          `http://localhost:4000/api/addresses/${addrId}`,
          addressForm,
          { headers: { Authorization: token } }
        );

        const updatedAddresses = [...addresses];
        updatedAddresses[editingAddressIndex] = response.data;
        setAddresses(updatedAddresses);
        setSelectedAddress(response.data);

        Swal.fire({
          icon: 'success',
          title: 'Address Updated',
          timer: 1500,
          showConfirmButton: false
        });

      } else {
        // Add new address
        response = await axios.post(
          'http://localhost:4000/api/addresses',
          addressForm,
          { headers: { Authorization: token } }
        );

        let updatedAddresses = [...addresses];
        if (addressForm.isDefault) {
          updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
        }

        updatedAddresses.push(response.data);
        setAddresses(updatedAddresses);
        if (addressForm.isDefault || updatedAddresses.length === 1) {
          setSelectedAddress(response.data);
        }

        Swal.fire({
          icon: 'success',
          title: 'Address Added',
          timer: 1500,
          showConfirmButton: false
        });
      }

      setAddressForm({
        type: 'Home',
        name: userInfo.name,
        phone: userInfo.phone,
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        postalCode: '',
        isDefault: false
      });
      setShowAddressForm(false);
      setEditingAddressIndex(null);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete address with Axios
  const handleDeleteAddress = async (index) => {
    const addressId = addresses[index].id;

    console.log(addressId);

    const result = await Swal.fire({
      title: 'Delete Address?',
      text: 'Are you sure you want to delete this address?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/addresses/${addressId}`, {
          headers: { Authorization: token }
        });

        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);

        if (selectedAddress?.id === addressId) {
          setSelectedAddress(updatedAddresses[0] || null);
        }

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          timer: 1500,
          showConfirmButton: false
        });

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to delete address',
        });
      }
    }
  };

  // Set default address
  const handleSetDefaultAddress = async (index) => {
    try {
      const addrId = addresses[index].id;
      const res = await axios.put(
        `http://localhost:4000/api/addresses/${addrId}`,
        { isDefault: true },
        { headers: { Authorization: token } }
      );

      const updatedAddresses = addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index
      }));

      setAddresses(updatedAddresses);
      setSelectedAddress(updatedAddresses[index]);

      Swal.fire({
        icon: 'success',
        title: 'Default Address Updated',
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to set default address',
      });
    }
  };

  // Update user info with Axios
  const handleUserInfoUpdate = async () => {
    const { value: formData } = await Swal.fire({
      title: 'Update Contact Information',
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Full Name" value="${userInfo.name}">
        <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${userInfo.phone}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${userInfo.email}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        const phone = document.getElementById('swal-phone').value;
        const email = document.getElementById('swal-email').value;
        if (!name || !phone || !email) Swal.showValidationMessage('Please fill all fields');
        return { name, phone, email };
      }
    });

    if (formData) {
      try {
        setLoading(true);
        const res = await axios.put(
          'http://localhost:4000/api/user',
          formData,
          { headers: { Authorization: token } }
        );
        setUserInfo(res.data);

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          timer: 1500,
          showConfirmButton: false
        });

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to update info',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Proceed to payment (same as before)
  const handleProceedToPayment = async () => {
    if (!quoteData || quoteData.total <= 0) {
      Swal.fire({ icon: 'error', title: 'Order Error', text: 'Cannot proceed to payment. Order data missing or total is zero.' });
      return;
    }
    if (!selectedAddress) {
      Swal.fire({ icon: 'error', title: 'Shipping Address Required', text: 'Please select/add a shipping address.' });
      return;
    }

    setLoading(true);
    try {
      await Swal.fire({ title: 'Processing Order...', html: 'Preparing your order for payment', allowOutsideClick: false, timer: 1000, didOpen: () => Swal.showLoading() });
      navigate('/payments', {
        state: { orderData: { ...quoteData, items: quoteData.orderedItems, timestamp: new Date().toISOString(), orderId: `ORD-${Date.now()}-${Math.floor(Math.random()*1000)}`, shippingAddress: selectedAddress, userInfo: userInfo } }
      });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Processing Failed', text: 'There was an error processing your order.' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shipping & Order Confirmation</h1>
              <p className="text-gray-600">Review your order and shipping details before payment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary & Shipping */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  Shipping Address
                </h2>
                <button
                  onClick={() => {
                    setAddressForm({
                      type: 'Home',
                      name: userInfo.name,
                      phone: userInfo.phone,
                      addressLine1: '',
                      addressLine2: '',
                      city: '',
                      province: '',
                      postalCode: '',
                      isDefault: false
                    });
                    setEditingAddressIndex(null);
                    setShowAddressForm(true);
                  }}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Address
                </button>
              </div>

              {/* Contact Information */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Contact Information
                  </h3>
                  <button
                    onClick={handleUserInfoUpdate}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-medium">{userInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-medium">{userInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{userInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Address Selection */}
              {showAddressForm ? (
                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                  <h3 className="font-bold text-gray-800 mb-4">
                    {editingAddressIndex !== null ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Type
                      </label>
                      <select
                        name="type"
                        value={addressForm.type}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={addressForm.name}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={addressForm.phone}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={addressForm.addressLine1}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={addressForm.addressLine2}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Province
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={addressForm.province}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={addressForm.postalCode}
                        onChange={handleAddressFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={addressForm.isDefault}
                      onChange={handleAddressFormChange}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      id="defaultAddress"
                    />
                    <label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-700">
                      Set as default shipping address
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveAddress}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editingAddressIndex !== null ? 'Update Address' : 'Save Address'}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddressIndex(null);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <div
                        key={address.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAddress?.id === address.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedAddress(address)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className={`p-1 rounded mr-2 ${
                              address.type === 'Home' ? 'bg-green-100 text-green-800' :
                              address.type === 'Work' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              <span className="text-xs font-medium">{address.type}</span>
                            </div>
                            {address.isDefault && (
                              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(index);
                              }}
                              className="p-1 text-gray-500 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(index);
                              }}
                              className="p-1 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">{address.name}</p>
                          <p className="text-gray-600">{address.phone}</p>
                          <p className="mt-2">{address.addressLine1}</p>
                          {address.addressLine2 && (
                            <p>{address.addressLine2}</p>
                          )}
                          <p>{address.city}, {address.province} {address.postalCode}</p>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          {!address.isDefault && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetDefaultAddress(index);
                              }}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Set as Default
                            </button>
                          )}
                          {selectedAddress?.id === address.id && (
                            <span className="text-xs text-green-600 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Selected
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No addresses saved yet.</p>
                      <p className="text-sm text-gray-400 mt-1">Add an address to continue</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-amber-500" />
                  Order Summary
                </h2>
                <span className="text-sm font-medium text-gray-500">
                  {quoteData?.orderedItems?.length || 0} item(s)
                </span>
              </div>

              {quoteData ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">Rs. {quoteData.total?.toFixed(2)}</p>
                        {quoteData.discount > 0 && (
                          <p className="text-sm text-green-600 mt-1">
                            You saved Rs. {quoteData.discount?.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <CreditCard className="h-8 w-8 text-amber-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>Rs. {quoteData.labeledTotal?.toFixed(2)}</span>
                    </div>
                    {quoteData.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>- Rs. {quoteData.discount?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-lg">Rs. {quoteData.total?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Order Items:</h3>
                    <div className="space-y-3">
                      {quoteData.orderedItems?.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.productName}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              Rs. {(item.lastPrice * item.qty).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              Rs. {item.lastPrice.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No order data found. Please return to cart.</p>
                  <button
                    onClick={() => navigate('/cart')}
                    className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Go to Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Confirmation & Payment Button */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Methods Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                Payment Options
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Credit/Debit Card</p>
                    <p className="text-xs text-gray-500 mt-1">Visa, MasterCard, American Express</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <svg className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Digital Wallets</p>
                    <p className="text-xs text-gray-500 mt-1">Apple Pay, Google Pay, Samsung Pay</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <svg className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Bank Transfer</p>
                    <p className="text-xs text-gray-500 mt-1">Direct bank payment</p>
                  </div>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Cash on Delivery</p>
                    <p className="text-xs text-gray-500 mt-1">Pay when you receive</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Security Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Secure Checkout
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>256-bit SSL encryption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>PCI DSS compliant</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Your data is protected</span>
                </li>
              </ul>
            </div>

            {/* Order Confirmation Button */}
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Ready to Pay</h3>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Amount to Pay</p>
                    <p className="text-xs text-gray-500">Order #{quoteData ? `ORD-${Date.now().toString().slice(-6)}` : '-----'}</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    Rs. {quoteData?.total?.toFixed(2) || '0.00'}
                  </p>
                  {quoteData?.discount > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      You saved Rs. {quoteData.discount.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* THIS IS THE PAYMENT BUTTON */}
                <button
                  onClick={handleProceedToPayment}
                  disabled={!quoteData || quoteData.total <= 0 || loading || !selectedAddress}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    quoteData && quoteData.total > 0 && !loading && selectedAddress
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Preparing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By proceeding, you agree to our{' '}
                  <button className="text-purple-600 hover:text-purple-700">Terms & Conditions</button>
                </p>
              </div>

              {/* Help Text */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Need help?{' '}
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Contact Support
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/pages/singUp.jsx
```javascript
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "customer",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log("User created:", response.data);
      setLoading(false);
      navigate("/login"); // redirect after signup
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="border p-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL (optional)"
          value={formData.profileImage}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
```

## File: src/components/utils/cart.jsx
```javascript
export function loadCart() {
  const cart = localStorage.getItem("cart");
  if (cart != null) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

export function addToCart(productId, qty) {
  const cart = loadCart();
  const index = cart.findIndex((item) => {
    return item.productId == productId;
  });
  if (index == -1) {
    cart.push({ productId, qty });
  } else {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].qty = newQty;
    }
  }
  saveCart(cart);
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function deleteItem(productId) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId == productId);
  if (index != -1) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}
```

## File: src/components/utils/mediaupload.jsx
```javascript
import { createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc2JlZWxmZHFqaGZ5Z2hnb3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzA2NjgsImV4cCI6MjA3OTgwNjY2OH0.WbA2YyeUh9XiZo2yJpLt0Lj4Fs9u44N7E3W94oAGhkY";

const url = "https://sosbeelfdqjhfyghgoqm.supabase.co";

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }

    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];
    const timestamp = new Date().getTime();
    fileName = timestamp + file.name + "." + extension;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(publicUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
```

## File: src/index.css
```css
@import "tailwindcss";
```

## File: src/main.jsx
```javascript
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(

    <App />

)
```

## File: .gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
.env

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## File: package.json
```json
{
  "name": "app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.86.0",
    "@tailwindcss/vite": "^4.1.17",
    "axios": "^1.13.2",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^0.556.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.6",
    "sweetalert2": "^11.26.3",
    "tailwindcss": "^4.1.17",
    "uuid": "^13.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

## File: src/components/Card.jsx
```javascript
import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  productId,
  lastPrices, // now price
  images = [],
  productName,
  price, // old price
}) {
  const firstImageUrl = images.length > 0 ? images[0] : null;

  // Convert to numbers
  const nowPriceNum = lastPrices ? Number(lastPrices) : null; // current price
  const oldPriceNum = Number(price); // previous price

  // Check if product is on sale
  const isSale = oldPriceNum && oldPriceNum > nowPriceNum;

  // Compute discount percentage
  const discountPercentage = isSale
    ? Math.round(((oldPriceNum - nowPriceNum) / oldPriceNum) * 100)
    : 0;

  return (
    <Link to={`/productoverview/${productId}`}>
      <div className="max-w-xs mx-auto my-4 bg-white rounded-xl w-[300px] h-[480px] shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          {firstImageUrl ? (
            <img
              src={firstImageUrl}
              alt={`Image of ${productName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              [Image Not Available]
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col justify-between h-[220px]">
          <h3
            className="text-xl font-bold text-gray-800 mb-2 truncate"
            title={productName}
          >
            {productName}
          </h3>

          {/* Price Section */}
          <div className="mt-2">
            {isSale ? (
              <div className="flex items-center space-x-2">
                {/* Old Price */}
                <span className="text-gray-400 line-through text-sm">
                  Rs.{oldPriceNum}
                </span>

                {/* Current Price */}
                <span className="text-lg font-bold text-green-600">
                  Rs.{nowPriceNum}
                </span>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                Rs.{nowPriceNum}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
```

## File: src/components/pages/admin/AdminAllProductView.jsx
```javascript
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye, 
  FiCopy, 
  FiDownload, 
  FiRefreshCw,
  FiPlus
} from "react-icons/fi";
import { MdGridView, MdList } from "react-icons/md";
import Swal from "sweetalert2";

export default function AdminAllProductView() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/products", {
          headers: { Authorization: token },
        });
        const productsData = res.data?.data || res.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load products',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, token]);

  // Get unique categories and brands for filters
  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category).filter(Boolean);
    return ["all", ...new Set(allCategories)];
  }, [products]);

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return ["all", ...new Set(allBrands)];
  }, [products]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.productName?.toLowerCase().includes(term) ||
        product.productId?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.altNames?.some(name => name.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "all") {
      result = result.filter(product => product.brand === selectedBrand);
    }

    // Sorting
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        result.sort((a, b) => b.stock - a.stock);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, selectedCategory, selectedBrand, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      html: `Are you sure you want to delete <strong>"${productName}"</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/products/${productId}`, {
          headers: { Authorization: token },
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Product has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });

        // Remove from state
        setProducts(prev => prev.filter(p => p.productId !== productId));
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: err.response?.data?.message || 'Failed to delete product',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Selection',
        text: 'Please select products to delete',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Bulk Delete?',
      html: `Are you sure you want to delete ${selectedProducts.size} product(s)?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Delete ${selectedProducts.size} Items`,
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        const deletePromises = Array.from(selectedProducts).map(productId =>
          axios.delete(`http://localhost:4000/api/products/${productId}`, {
            headers: { Authorization: token },
          })
        );

        await Promise.all(deletePromises);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${selectedProducts.size} product(s) deleted`,
          timer: 2000,
          showConfirmButton: false
        });

        // Refresh products
        setProducts(prev => prev.filter(p => !selectedProducts.has(p.productId)));
        setSelectedProducts(new Set());
      } catch (err) {
        console.error("Bulk delete error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'Failed to delete selected products',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === currentProducts.length) {
      setSelectedProducts(new Set());
    } else {
      const allIds = new Set(currentProducts.map(p => p.productId));
      setSelectedProducts(allIds);
    }
  };

  const handleSelectProduct = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Product ID copied to clipboard',
      timer: 1500,
      showConfirmButton: false
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} products • {selectedProducts.size} selected
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={() => navigate("/admin/dashboard/addproducts")}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            title="Refresh"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, ID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded ${viewMode === "table" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdList size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded ${viewMode === "grid" ? "bg-white shadow" : "text-gray-600"}`}
            >
              <MdGridView size={20} />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === "all" ? "All Brands" : brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock: High to Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bulk Actions</label>
            <div className="flex space-x-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Action</option>
                <option value="delete">Delete Selected</option>
                <option value="export">Export Selected</option>
              </select>
              <button
                onClick={() => bulkAction === "delete" && handleBulkDelete()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                disabled={!bulkAction}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Selection */}
        {selectedProducts.size > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="text-blue-700 font-medium">
              {selectedProducts.size} product(s) selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedProducts(new Set())}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table (Table View) */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === currentProducts.length && currentProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.productId)}
                          onChange={() => handleSelectProduct(product.productId)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            {product.images?.[0] ? (
                              <img
                                className="h-16 w-16 object-cover rounded-lg"
                                src={product.images[0]}
                                alt={product.productName}
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.productName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <span className="font-mono">{product.productId}</span>
                              <button
                                onClick={() => copyToClipboard(product.productId)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                                title="Copy ID"
                              >
                                <FiCopy size={14} />
                              </button>
                            </div>
                            <div className="text-xs text-gray-400 truncate max-w-xs">
                              {product.description?.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </div>
                        {product.lastPrices && product.lastPrices > product.price && (
                          <div className="text-xs text-gray-500 line-through">
                            ${parseFloat(product.lastPrices).toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/product/${product.productId}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product.productId, product.productName)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-lg mb-2">No products found</div>
                      <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                          setSelectedBrand("all");
                        }}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.productId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="relative">
                  {product.images?.[0] ? (
                    <img
                      className="w-full h-48 object-cover"
                      src={product.images[0]}
                      alt={product.productName}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.productId)}
                    onChange={() => handleSelectProduct(product.productId)}
                    className="absolute top-2 left-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{product.productName}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate("/admin/dashboard/editproducts", { state: { product } })}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId, product.productName)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📦</div>
              <div className="text-gray-600 text-xl mb-2">No products found</div>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: src/components/pages/admin/EditProducts.jsx
```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  FiEdit, 
  FiSave, 
  FiTrash2, 
  FiImage, 
  FiPackage, 
  FiDollarSign, 
  FiTag, 
  FiGrid,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiBox
} from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  
  // Status options
  const statusOptions = [
    { value: "pending", label: "Pending", icon: FiClock, color: "bg-yellow-100 text-yellow-800" },
    { value: "ready", label: "Ready", icon: FiCheckCircle, color: "bg-green-100 text-green-800" },
    { value: "delivered", label: "Delivered", icon: FiTruck, color: "bg-blue-100 text-blue-800" },
    { value: "out_of_stock", label: "Out of Stock", icon: FiBox, color: "bg-red-100 text-red-800" },
  ];

  // Categories and brands for dropdown
  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food", "Office"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "HP", "Microsoft", "Other"];

  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
    status: "pending", // Added status field
  });

  // Fetch product data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        let productData;
        
        if (location.state?.product) {
          productData = location.state.product;
        } else if (id) {
          const response = await axios.get(
            `http://localhost:4000/api/products/${id}`,
            { headers: { Authorization: token } }
          );
          productData = response.data;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Product Selected',
            text: 'Please select a product to edit',
            confirmButtonColor: '#d33',
          }).then(() => navigate("/admin/products"));
          return;
        }

        // Set form data including status
        setFormData({
          productId: productData.productId || "",
          productName: productData.productName || "",
          altNames: productData.altNames?.join(", ") || "",
          price: productData.price || "",
          lastPrices: productData.lastPrices || productData.price || "",
          stock: productData.stock || "",
          description: productData.description || "",
          category: productData.category || "General",
          brand: productData.brand || "Unbranded",
          status: productData.status || "pending", // Set status from API
        });

        if (productData.images && Array.isArray(productData.images)) {
          setExistingImageUrls(productData.images);
        }

      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load product data',
          confirmButtonColor: '#d33',
        }).then(() => navigate("/admin/products"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [token, navigate, location.state, id]);

  // Handle new image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove new image preview
  const removeNewImage = (index) => {
    const newImagesCopy = [...newImages];
    const newPreviews = [...imagePreviews];
    
    URL.revokeObjectURL(newPreviews[index]);
    newImagesCopy.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setNewImages(newImagesCopy);
    setImagePreviews(newPreviews);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    Swal.fire({
      title: 'Remove Image?',
      text: "This image will be removed from the product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newExistingImages = [...existingImageUrls];
        newExistingImages.splice(index, 1);
        setExistingImageUrls(newExistingImages);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Quick status update handler
  const handleQuickStatusUpdate = (newStatus) => {
    Swal.fire({
      title: `Change Status to ${newStatus.toUpperCase()}?`,
      text: `Are you sure you want to change product status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update status!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(prev => ({ ...prev, status: newStatus }));
        Swal.fire({
          icon: 'success',
          title: 'Status Updated!',
          text: `Product status changed to ${newStatus}`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Product name is required',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Please enter a valid price',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    if (existingImageUrls.length === 0 && newImages.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Images',
        text: 'Please add at least one product image',
        confirmButtonColor: '#d33',
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      // Upload new images
      const uploadedImages = newImages.length > 0 
        ? await Promise.all(newImages.map(uploadMediaToSupabase))
        : [];

      // Prepare payload including status
      const payload = {
        ...formData,
        altNames: formData.altNames 
          ? formData.altNames.split(",").map(n => n.trim()).filter(n => n)
          : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: [...existingImageUrls, ...uploadedImages],
        status: formData.status, // Include status in payload
        updatedAt: new Date().toISOString(),
      };

      // Update product
      await axios.patch(
        `http://localhost:4000/api/products/${formData.productId}`,
        payload,
        { 
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          } 
        }
      );

      // Success alert
      await Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'Product has been successfully updated',
        showConfirmButton: false,
        timer: 2000
      });

      // Reset image states
      setNewImages([]);
      setImagePreviews([]);

      // Navigate back
      navigate("/admin/dashboard/adminviewproducts");

    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update product. Please try again.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading product data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Status */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-blue-100 mt-2">Update product information</p>
              </div>
              <div className="mt-4 md:mt-0 space-y-2">
                <div className="text-sm opacity-90">Product ID</div>
                <div className="text-xl font-mono font-bold">{formData.productId}</div>
                
                {/* Current Status Display */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="text-sm opacity-90">Current Status:</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                  }`}>
                    {statusOptions.find(s => s.value === formData.status)?.label || "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Product Info */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                {/* Alternate Names */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiGrid className="mr-2" /> Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Status
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {statusOptions.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => handleQuickStatusUpdate(status.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                          formData.status === status.value
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <status.icon className={`h-6 w-6 mb-2 ${
                          formData.status === status.value ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          formData.status === status.value ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {status.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Select product status from dropdown or click on status cards above
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="space-y-6">
                {/* Existing Images */}
                {existingImageUrls.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Images ({existingImageUrls.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {existingImageUrls.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Product ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {imagePreviews.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Images to Add ({imagePreviews.length})
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`New ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                            title="Remove image"
                          >
                            <MdClose size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Add More Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FiImage className="text-4xl text-gray-400 mx-auto mb-4" />
                      <div className="text-gray-600 font-medium mb-2">Click to upload new images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Status Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <FiCheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Status Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
                      }`}>
                        {statusOptions.find(s => s.value === formData.status)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Stock Level:</span>
                      <span className={`font-medium ${
                        parseInt(formData.stock) > 10 ? 'text-green-600' : 
                        parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {formData.stock || 0} units
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-3">
                      💡 <strong>Status Guide:</strong> Pending → Ready → Delivered
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 space-y-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Update Product
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate("/admin/dashboard/adminviewproducts")}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Update Only Status?',
                          text: 'Would you like to update just the status without saving other changes?',
                          icon: 'question',
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: 'Save All Changes',
                          denyButtonText: 'Update Status Only',
                          cancelButtonText: 'Cancel'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleSave();
                          } else if (result.isDenied) {
                            // Update only status
                            const statusOnlyPayload = { status: formData.status };
                            axios.patch(
                              `http://localhost:4000/api/products/${formData.productId}`,
                              statusOnlyPayload,
                              { 
                                headers: { 
                                  Authorization: token,
                                  'Content-Type': 'application/json'
                                } 
                              }
                            ).then(() => {
                              Swal.fire({
                                icon: 'success',
                                title: 'Status Updated!',
                                text: 'Product status has been updated',
                                timer: 1500,
                                showConfirmButton: false
                              });
                            }).catch(error => {
                              console.error("Status update failed:", error);
                              Swal.fire({
                                icon: 'error',
                                title: 'Status Update Failed',
                                text: 'Failed to update product status',
                                confirmButtonColor: '#d33',
                              });
                            });
                          }
                        });
                      }}
                      className="w-full px-6 py-3 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Preview</h3>
            <div className={`px-4 py-1 rounded-full text-sm font-medium ${
              statusOptions.find(s => s.value === formData.status)?.color || "bg-gray-100 text-gray-800"
            }`}>
              {statusOptions.find(s => s.value === formData.status)?.label}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Preview */}
            <div className="md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                {existingImageUrls.length > 0 || imagePreviews.length > 0 ? (
                  <img
                    src={existingImageUrls[0] || imagePreviews[0]}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Product Status</div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    formData.status === 'pending' ? 'bg-yellow-500' :
                    formData.status === 'ready' ? 'bg-green-500' :
                    formData.status === 'delivered' ? 'bg-blue-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">{statusOptions.find(s => s.value === formData.status)?.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formData.status === 'pending' && 'Product is awaiting processing'}
                  {formData.status === 'ready' && 'Product is ready for delivery'}
                  {formData.status === 'delivered' && 'Product has been delivered'}
                  {formData.status === 'out_of_stock' && 'Product is currently out of stock'}
                </p>
              </div>
            </div>
            
            {/* Info Preview */}
            <div className="md:w-2/3">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{formData.productName || "Product Name"}</h4>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-blue-600 mr-3">
                  ${parseFloat(formData.price || 0).toFixed(2)}
                </span>
                {formData.lastPrices && parseFloat(formData.lastPrices) > parseFloat(formData.price) && (
                  <span className="text-lg text-gray-500 line-through">
                    ${parseFloat(formData.lastPrices).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{formData.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Brand</div>
                  <div className="font-medium">{formData.brand}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Stock</div>
                  <div className={`font-medium ${
                    parseInt(formData.stock) > 10 ? 'text-green-600' : 
                    parseInt(formData.stock) > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formData.stock || 0} units
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Product ID</div>
                  <div className="font-mono font-medium">{formData.productId}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Availability</div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    formData.status === 'out_of_stock' 
                      ? 'bg-red-100 text-red-800' 
                      : parseInt(formData.stock) > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {formData.status === 'out_of_stock' 
                      ? 'Out of Stock' 
                      : parseInt(formData.stock) > 0 
                        ? 'In Stock' 
                        : 'Low Stock'}
                  </div>
                  {formData.status === 'delivered' && (
                    <div className="text-sm text-gray-600 flex items-center">
                      <FiTruck className="h-4 w-4 mr-1" /> Delivered
                    </div>
                  )}
                </div>
              </div>
              <div className="text-gray-600">
                {formData.description || "No description provided"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/pages/admin/notification.jsx
```javascript
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function Notification() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch all message threads (admin endpoint)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/chat/admin/messages", {
          headers: { Authorization: token },
        });
        
        // Based on your backend controller, data is in res.data.data
        if (res.data.data) {
          setUsers(res.data.data);
        } else if (res.data.messages) {
          // Alternative response format
          setUsers(res.data.messages);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        if (err.response?.status === 403) {
          alert("You don't have admin privileges");
        }
      }
    };
    
    if (token) {
      fetchMessages();
    }
  }, [token]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser]);

  // Handle admin reply
  const handleReply = async () => {
    if (!selectedUser || !replyText.trim()) return;

    setLoading(true);
    try {
      // Using your backend endpoint structure
      const res = await axios.post(
        "http://localhost:4000/api/chat/adminReply",
        { 
          userId: selectedUser.userId, // Send userId, not _id
          text: replyText  // Changed from 'message' to 'text'
        },
        { 
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      alert(res.data.message || "Reply sent successfully");

      const newMessage = {
        _id: Date.now().toString(),
        sender: "admin",
        text: replyText,
        timestamp: new Date().toISOString(),
      };

      // Update selectedUser messages locally
      setSelectedUser((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      // Update main users array
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.userId === selectedUser.userId || u._id === selectedUser._id
            ? { 
                ...u, 
                messages: [...u.messages, {
                  sender: "admin",
                  text: replyText,
                  timestamp: new Date().toISOString()
                }] 
              }
            : u
        )
      );

      setReplyText("");
      scrollToBottom();
    } catch (err) {
      console.error("Error sending reply:", err);
      if (err.response) {
        console.error("Response error:", err.response.data);
        alert(`Failed to send reply: ${err.response.data.message || err.response.statusText}`);
      } else {
        alert("Failed to send reply");
      }
    } finally {
      setLoading(false);
    }
  };

  // Format messages for display
  const formatMessages = (messages) => {
    if (!messages || !Array.isArray(messages)) return [];
    
    return messages.map(msg => ({
      ...msg,
      // Ensure sender is in lowercase for comparison
      sender: msg.sender?.toLowerCase() || "unknown"
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Chat Dashboard</h1>
      
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left border-b font-semibold text-gray-700">User ID</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Email</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Messages</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Last Updated</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No chat threads found
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const formattedMessages = formatMessages(user.messages);
                const userMessages = formattedMessages.filter(m => m.sender === 'user');
                const lastUserMessage = userMessages[userMessages.length - 1];
                
                return (
                  <tr key={user._id || user.userId} className="border-t hover:bg-gray-50">
                    <td className="p-3 border-b">
                      <div className="font-medium">{user.userId}</div>
                      <div className="text-xs text-gray-500">Thread: {user._id?.substring(0, 8)}...</div>
                    </td>
                    <td className="p-3 border-b text-gray-600">{user.userEmail}</td>
                    <td className="p-3 border-b">
                      <div className="text-sm">
                        <span className="font-medium">{formattedMessages.length}</span> messages
                        {lastUserMessage && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            Last: "{lastUserMessage.text?.substring(0, 50)}..."
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3 border-b">
                      {user.updatedAt ? (
                        <div>
                          <div className="text-sm">{new Date(user.updatedAt).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{new Date(user.updatedAt).toLocaleTimeString()}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="p-3 border-b">
                      <button
                        onClick={() => {
                          setSelectedUser({
                            ...user,
                            messages: formatMessages(user.messages)
                          });
                          setShowPopup(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                      >
                        View & Reply
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Chat with User</h2>
                <p className="text-sm text-blue-100">
                  User ID: {selectedUser.userId} | Email: {selectedUser.userEmail}
                </p>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                ✖
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {selectedUser.messages?.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No messages in this thread yet.
                </div>
              ) : (
                selectedUser.messages
                  ?.sort((a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt))
                  .map((msg, i) => (
                    <div
                      key={msg._id || i}
                      className={`mb-3 flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user'
                            ? 'bg-white border border-gray-200 rounded-tl-none'
                            : 'bg-blue-100 border border-blue-200 rounded-tr-none'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`font-semibold ${msg.sender === 'user' ? 'text-gray-700' : 'text-blue-700'}`}>
                            {msg.sender === 'user' ? '👤 User' : '🛡️ Admin'}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-800">{msg.text}</p>
                      </div>
                    </div>
                  ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input Area */}
            <div className="border-t p-4">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your reply..."
                rows="3"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                disabled={loading}
              />
              <div className="flex justify-end mt-3 space-x-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  disabled={loading}
                >
                  Close
                </button>
                <button
                  onClick={handleReply}
                  disabled={loading || !replyText.trim()}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reply"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: src/components/pages/HomeContainer.jsx
```javascript
import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/components/Card";
import axios from "axios";

export default function HomeContainer() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        if (Array.isArray(response.data)) {
          setAllProducts(response.data);
          setDisplayedProducts(response.data.slice(0, visibleCount));
          setHasMore(response.data.length > visibleCount);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    
    setTimeout(() => {
      const newCount = visibleCount + 8;
      setVisibleCount(newCount);
      setDisplayedProducts(allProducts.slice(0, newCount));
      setHasMore(allProducts.length > newCount);
      setLoadingMore(false);
    }, 500);
  }, [allProducts, loadingMore, hasMore, visibleCount]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.5, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadingMore, loadMore]);

  // Window scroll listener (alternative method)
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Load more when 300px from bottom
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, loadingMore, loadMore]);

  if (loading && displayedProducts.length === 0) {
    return (
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      
      {/* add managements some title here */}
        <div className="bg-amber-300 w-full h-[200px]">










          
        </div>
      <div className="p-4 md:p-8">

{/*banners casorle here */}

        <div>
          <h1>banners</h1>
        </div>




        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <Card
              key={product._id || product.productId}
              productId={product.productId}
              productName={product.productName}
              lastPrices={product.lastPrices}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>

        {/* Loading indicator */}
        {loadingMore && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mr-3"></div>
              <span className="text-teal-600">Loading more products...</span>
            </div>
          </div>
        )}

        {/* Observer target for Intersection Observer */}
        <div ref={observerTarget} className="h-10"></div>

        {/* Show load more button as fallback */}
        {hasMore && !loadingMore && (
          <div className="text-center py-8">
            <div className="mb-4 text-gray-600 text-sm">
              Scroll down to load more or click below
            </div>
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Load More ({allProducts.length - displayedProducts.length} remaining)
            </button>
          </div>
        )}

        {/* All loaded message */}
        {!hasMore && allProducts.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-full">
              🎉 All {allProducts.length} products loaded!
            </div>
            <p className="text-gray-500 text-sm mt-2">
              You've reached the end of our products
            </p>
          </div>
        )}

        {/* Scroll indicator for mobile */}
        {hasMore && displayedProducts.length > 8 && (
          <div className="fixed bottom-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg text-sm animate-bounce lg:hidden">
            ↓ Scroll for more
          </div>
        )}
      </div>
    </div>
  );
}
```

## File: text.text
```
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddProducts from "./addProducts";
import AdminAllProductView from "@/components/pages/admin/AdminAllProductView";
import EditProducts from "@/components/pages/admin/EditProducts";
import { MdOutlineGridView, MdAddBox, MdEdit } from "react-icons/md";

export default function Dashboard() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar (always visible) */}
      <div className="w-64 h-full bg-white text-gray-700 flex flex-col shadow-md border-r border-gray-200">
        <div className="py-6 flex justify-center border-b border-gray-200 px-4">
          <Link
            to="/admin/dashboard"
            className="text-2xl font-bold text-blue-600 tracking-wide"
          >
            Dashboard
          </Link>
        </div>

        <nav className="flex flex-col gap-2 px-4 mt-6">
          <Link
            to="adminviewproducts"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-base font-medium hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <MdOutlineGridView className="text-xl" /> View Products
          </Link>

          <Link
            to="products"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-base font-medium hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <MdAddBox className="text-xl" /> Add Product
          </Link>

          <Link
            to="editproducts"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-base font-medium hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <MdEdit className="text-xl" /> Edit Product
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome to your dashboard
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <Routes>
            <Route path="products" element={<AddProducts />} />
            <Route path="adminviewproducts" element={<AdminAllProductView />} />
            <Route path="editproducts" element={<EditProducts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
```

## File: vite.config.js
```javascript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

## File: src/components/Navbar.jsx
```javascript
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsAdmin(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAdmin(decoded.role === "admin"); // Check if user is admin
    } catch {
      setUser(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    authcheck();
    window.addEventListener("authChange", authcheck);
    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          MyBrand
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </Link>
          <Link
            to="/service"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Service
          </Link>
          
          <Link
            to={`/viewcart?userId=${user ? user.id : ""}`}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Cart
          </Link>

          {/* Show Notification link only for admins */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Admin Dashboard
            </Link>
          )}

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt={user.name || "User profile"}
                className="w-10 h-10 rounded-full object-cover border shadow-sm"
              />
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded shadow-md">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/service" onClick={() => setMenuOpen(false)}>
            Service
          </Link>
          <Link to="/viewcart" onClick={() => setMenuOpen(false)}>
            Cart
          </Link>

          {/* Show Admin Dashboard link only for admins in mobile */}
          {isAdmin && (
            <Link to="/notification" onClick={() => setMenuOpen(false)}>
              Admin Dashboard
            </Link>
          )}

          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
```

## File: src/components/pages/admin/addProducts.jsx
```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";
import { FiUpload, FiImage, FiDollarSign, FiPackage, FiTag, FiShoppingCart } from "react-icons/fi";

export default function AddProducts() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    productId: uuidv4().substring(0, 8).toUpperCase(),
    productName: "",
    altNames: "",
    price: "",
    lastPrices: "",
    stock: "",
    description: "",
    category: "General",
    brand: "Unbranded",
  });

  const categories = ["General", "Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys", "Food"];
  const brands = ["Unbranded", "Nike", "Samsung", "Apple", "Sony", "Adidas", "Dell", "LG", "Other"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        alert("Only administrators can add products.");
        navigate("/");
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // Generate new product ID
  const generateNewId = () => {
    setFormData(prev => ({
      ...prev,
      productId: uuidv4().substring(0, 8).toUpperCase()
    }));
  };

  // Handle image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      alert("Product name is required");
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return false;
    }
    if (images.length === 0) {
      alert("Please upload at least one image");
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setUploading(true);
    const token = localStorage.getItem("token");
    
    try {
      // Upload images to Supabase
      const imgUrls = await Promise.all(
        images.map(file => uploadMediaToSupabase(file))
      );

      // Prepare payload
      const payload = {
        ...formData,
        productId: `PROD-${formData.productId}`,
        altNames: formData.altNames ? formData.altNames.split(",").map(n => n.trim()).filter(n => n) : [],
        price: parseFloat(formData.price),
        lastPrices: formData.lastPrices ? parseFloat(formData.lastPrices) : parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: imgUrls,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Send to backend
      const res = await axios.post(
        "http://localhost:4000/api/products",
        payload,
        { 
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log("Product saved:", res.data);
      
      // Show success message and reset form
      alert("✅ Product uploaded successfully!");
      
      // Reset form
      setFormData({
        productId: uuidv4().substring(0, 8).toUpperCase(),
        productName: "",
        altNames: "",
        price: "",
        lastPrices: "",
        stock: "",
        description: "",
        category: "General",
        brand: "Unbranded",
      });
      setImages([]);
      setImagePreviews([]);
      
      // Optional: Navigate to products page
      // navigate("/products");

    } catch (err) {
      console.error("Upload failed:", err);
      let errorMessage = "Failed to upload product.";
      
      if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText;
      } else if (err.request) {
        errorMessage = "No response from server. Check your connection.";
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-blue-100 mt-2">Fill in the product details below</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={generateNewId}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  title="Generate new ID"
                >
                  🔄 New ID
                </button>
                <div className="text-right">
                  <div className="text-sm opacity-90">Product ID</div>
                  <div className="text-xl font-mono font-bold">PROD-{formData.productId}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiShoppingCart className="mr-2" /> Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Alternate Names
                  </label>
                  <input
                    type="text"
                    name="altNames"
                    value={formData.altNames}
                    onChange={handleChange}
                    placeholder="Separate with commas (e.g., iPhone 15, Smartphone)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: Other names customers might search for</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FiDollarSign className="mr-2" /> Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Price
                    </label>
                    <input
                      type="number"
                      name="lastPrices"
                      value={formData.lastPrices}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiPackage className="mr-2" /> Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column - Images & Description */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FiImage className="mr-2" /> Product Images *
                  </label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-3 mb-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{imagePreviews.length} image(s) selected</p>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    <FiUpload className="text-3xl text-gray-400 mx-auto mb-3" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-gray-600 font-medium mb-1">Click to upload images</div>
                      <div className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</div>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product features, specifications, etc."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading Product...
                      </>
                    ) : (
                      "Upload Product"
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    * Required fields. All product information will be saved to our database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/pages/admin/dashboard.jsx
```javascript
import React, { useEffect, useState } from "react";
import { 
  RxHamburgerMenu, 
  RxDashboard, 
  RxPerson, 
  RxExit 
} from "react-icons/rx";
import { 
  MdOutlineGridView, 
  MdAddBox, 
  MdEdit, 
  MdNotifications,
  MdShoppingCart,
  MdBarChart,
  MdSettings,
  MdChevronRight,
  MdChevronLeft
} from "react-icons/md";
import { 
  FiUsers, 
  FiPackage, 
  FiDollarSign, 
  FiTrendingUp 
} from "react-icons/fi";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddProducts from "./addProducts";
import AdminAllProductView from "./AdminAllProductView";
import EditProducts from "./EditProducts";
import Notification from "./notification";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Stats for dashboard
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newUsers: 0,
  });

  // Auth check
  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'Only administrators can access this dashboard',
          confirmButtonColor: '#d33',
        }).then(() => {
          navigate("/");
        });
        return;
      }
      setUser(decoded);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      // Mock data for now
      setStats({
        totalProducts: 128,
        totalOrders: 45,
        totalRevenue: 12500,
        newUsers: 12,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    authcheck();
    fetchStats();
    window.addEventListener("authChange", authcheck);
    setLoading(false);
    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: "Are you sure you want to logout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Top Bar - Only on Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-teal-500 p-4 flex justify-between items-center z-50 shadow-lg">
        <div className="flex items-center">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mr-4 text-white"
          >
            <RxHamburgerMenu size={28} />
          </button>
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm text-blue-100">Welcome</div>
            <div className="text-white font-semibold">{user?.name || "Admin"}</div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </span>
          </div>
        </div>
      </div>

      {/* SIDEBAR - Always visible on desktop, collapsible on mobile */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl z-40 transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/admin/dashboard" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mr-3">
              <RxDashboard className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">AdminPanel</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{user?.name || "Admin User"}</div>
              <div className="text-sm text-gray-500">{user?.email || "admin@example.com"}</div>
              <div className="text-xs mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full inline-block">
                Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {/* Main Navigation */}
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
              Navigation
            </div>

            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-blue-600">
                <RxDashboard size={20} />
              </div>
              <span>Overview</span>
            </Link>

            <Link
              to="/admin/dashboard/adminviewproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-green-600">
                <MdOutlineGridView size={20} />
              </div>
              <span>View Products</span>
            </Link>

            <Link
              to="/admin/dashboard/addproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-purple-600">
                <MdAddBox size={20} />
              </div>
              <span>Add Product</span>
            </Link>


                        <Link
              to="/admin/dashboard/addproducts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-purple-600">
                <MdAddBox size={20} />
              </div>
              <span>Ads Managements</span>
            </Link>

            <Link
              to="/admin/dashboard/notification"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-red-600 relative">
                <MdNotifications size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <span>Notifications</span>
              <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                3 new
              </span>
            </Link>

            {/* Additional Sections */}
            <>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 px-2">
                Analytics
              </div>

              <Link
                to="/admin/dashboard/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-indigo-600">
                  <MdShoppingCart size={20} />
                </div>
                <span>Orders</span>
                <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">45</span>
              </Link>

              <Link
                to="/admin/dashboard/users"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-teal-600">
                  <FiUsers size={20} />
                </div>
                <span>Users</span>
              </Link>

              <Link
                to="/admin/dashboard/analytics"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-amber-600">
                  <MdBarChart size={20} />
                </div>
                <span>Analytics</span>
              </Link>

              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-4 px-2">
                Settings
              </div>

              <Link
                to="/admin/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                <div className="text-gray-600">
                  <MdSettings size={20} />
                </div>
                <span>Settings</span>
              </Link>
            </>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium bg-red-50 text-red-600 hover:bg-red-100 transition group"
          >
            <RxExit size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className=" w-full lg:ml-10">
        {/* Overlay for mobile sidebar */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Dashboard Header */}
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Welcome back, {user?.name?.split(' ')[0] || "Admin"}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your store today.
              </p>
            </div>
            <div className="mt-2 lg:mt-0">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-md font-semibold text-gray-700">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: "Total Products", 
                value: stats.totalProducts, 
                icon: <FiPackage className="text-blue-600" size={24} />, 
                change: "+12%", 
                color: "bg-blue-50", 
                textColor: "text-blue-600" 
              },
              { 
                title: "Total Orders", 
                value: stats.totalOrders, 
                icon: <MdShoppingCart className="text-green-600" size={24} />, 
                change: "+8%", 
                color: "bg-green-50", 
                textColor: "text-green-600" 
              },
              { 
                title: "Total Revenue", 
                value: `$${stats.totalRevenue.toLocaleString()}`, 
                icon: <FiDollarSign className="text-purple-600" size={24} />, 
                change: "+23%", 
                color: "bg-purple-50", 
                textColor: "text-purple-600" 
              },
              { 
                title: "New Users", 
                value: stats.newUsers, 
                icon: <FiUsers className="text-orange-600" size={24} />, 
                change: "+5%", 
                color: "bg-orange-50", 
                textColor: "text-orange-600" 
              },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-sm font-semibold ${stat.textColor}`}>
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTERED CONTENT AREA */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[500px] flex flex-col">
              <Routes>
                <Route index element={
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">📊</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
                    <p className="text-gray-600 max-w-2xl mb-8">
                      Select a section from the sidebar to manage products, view notifications, or access other admin features.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                      <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                        <div className="text-blue-600 font-bold text-lg mb-2">📦 Products</div>
                        <div className="text-gray-600 text-sm">Manage your product inventory</div>
                      </div>
                      <div className="p-6 bg-green-50 border border-green-100 rounded-xl text-center">
                        <div className="text-green-600 font-bold text-lg mb-2">🛒 Orders</div>
                        <div className="text-gray-600 text-sm">View and manage customer orders</div>
                      </div>
                      <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl text-center">
                        <div className="text-purple-600 font-bold text-lg mb-2">📈 Analytics</div>
                        <div className="text-gray-600 text-sm">Track store performance</div>
                      </div>
                    </div>
                  </div>
                } />
                <Route path="adminviewproducts" element={<AdminAllProductView />} />
                <Route path="addproducts" element={<AddProducts />} />
                <Route path="editproducts" element={<EditProducts />} />
                <Route path="notification" element={<Notification />} />
                <Route path="*" element={
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 max-w-md mb-8">
                      The page you're looking for doesn't exist in the admin dashboard.
                    </p>
                    <button 
                      onClick={() => navigate('/admin/dashboard')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
          <p>Admin Dashboard v1.0 • © {new Date().getFullYear()} Your Company</p>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/pages/Login.jsx
```javascript
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password }
      );

      // Save token
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("authChange"));

      // Navigate
      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md mx-auto">
        {/* Header - Centered properly */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Card - Proper padding and spacing */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8 border border-white/20">
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/50 text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password - Proper alignment */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() =>
                  alert("Forgot password functionality would go here")
                }
                className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            {/* Login Button - Full width and centered content */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Sign In
                </div>
              )}
            </button>

            {/* Divider - Better alignment */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons - Proper spacing */}
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => alert("Google login would go here")}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  ></path>
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  ></path>
                </svg>
                <span className="text-sm font-medium">Continue with Google</span>
              </button>
            </div>

            {/* Sign Up Link - Centered */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                >
                  Sign up now
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Centered */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <button className="text-amber-600 hover:text-amber-700">
              Terms
            </button>{" "}
            and{" "}
            <button className="text-amber-600 hover:text-amber-700">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>

      {/* Add CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
```

## File: src/components/pages/viewCart.jsx
```javascript
import React, { useEffect, useState } from "react";
import { loadCart, deleteItem } from "@/components/utils/cart";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, AlertCircle, ChevronRight, Package, Tag, CreditCard, Shield, Truck } from "lucide-react";

const initialQuoteState = {
  orderedItems: [],
  total: 0,
  labeledTotal: 0,
  discount: 0,
  message: "Calculating prices...",
};

export default function ViewCart() {
  const [quoteData, setQuoteData] = useState(initialQuoteState);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setQuoteData({ ...initialQuoteState, message: "Please log in to view your cart." });
      return;
    }
    setUser(token);
  }, []);

  // Load cart and fetch quote
  useEffect(() => {
    if (!user) return;

    const cart = loadCart();
    if (!cart.length) {
      setQuoteData({ ...initialQuoteState, message: "Your cart is empty." });
      return;
    }

    const fetchQuote = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post("http://localhost:4000/api/orders/quote", { orderedItems: cart });
        setQuoteData(data);
      } catch (error) {
        console.error("Quote API Error:", error);
        setQuoteData({ ...initialQuoteState, message: "Failed to fetch prices." });
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [user]);

  // Delete item with confirmation
  const handleDelete = (productId, productName) => {
    Swal.fire({
      title: 'Remove Item',
      text: `Are you sure you want to remove "${productName}" from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(productId);

        const updatedItems = quoteData.orderedItems.filter(item => item.productId !== productId);
        const newLabeledTotal = updatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
        const newTotal = updatedItems.reduce((sum, i) => sum + i.lastPrice * i.qty, 0);
        const newDiscount = newLabeledTotal - newTotal;

        setQuoteData({
          orderedItems: updatedItems,
          labeledTotal: newLabeledTotal,
          total: newTotal,
          discount: newDiscount,
          message: updatedItems.length === 0 ? "Your cart is empty." : "Cart updated successfully!",
        });

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Item Removed',
          text: 'The item has been removed from your cart.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Clear entire cart
  const handleClearCart = () => {
    Swal.fire({
      title: 'Clear Cart',
      text: 'Are you sure you want to clear all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear all!',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        setQuoteData({ ...initialQuoteState, message: "Your cart has been cleared." });
        
        Swal.fire({
          icon: 'success',
          title: 'Cart Cleared',
          text: 'All items have been removed from your cart.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Checkout
  const handleCheckout = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please log in to proceed to checkout.",
        confirmButtonColor: "#f59e0b",
        backdrop: 'rgba(0,0,0,0.5)'
      });
      navigate("/login");
      return;
    }

    if (!quoteData.orderedItems.length || quoteData.total <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Your cart is empty or calculation failed. Please add items to proceed.",
        confirmButtonColor: "#f59e0b",
        backdrop: 'rgba(0,0,0,0.5)'
      });
      return;
    }

    Swal.fire({
      title: "Confirm Checkout",
      html: `
        <div class="text-left">
          <p class="mb-4">You are about to place an order for:</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p class="font-semibold text-lg">Rs. ${quoteData.total.toFixed(2)}</p>
            <p class="text-sm text-gray-600">${quoteData.orderedItems.length} item(s) in your cart</p>
          </div>
          <p class="text-sm text-gray-600">You will be redirected to the shipping details page.</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Proceed to Shipping",
      cancelButtonText: "Review Order",
      backdrop: 'rgba(0,0,0,0.5)'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/shipping/", { state: quoteData });
      }
    });
  };

  const { orderedItems, total, labeledTotal, discount, message } = quoteData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-amber-500 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          </div>
          <p className="text-gray-600">Review and manage your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Message Banner */}
            {message && (
              <div className="mb-6">
                <div className={`flex items-center p-4 rounded-lg ${
                  message.includes("Please log in") || message.includes("Failed") 
                    ? "bg-red-50 border border-red-200"
                    : message.includes("empty")
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-blue-50 border border-blue-200"
                }`}>
                  <AlertCircle className={`h-5 w-5 mr-3 ${
                    message.includes("Please log in") || message.includes("Failed")
                      ? "text-red-500"
                      : message.includes("empty")
                      ? "text-amber-500"
                      : "text-blue-500"
                  }`} />
                  <span className={`text-sm ${
                    message.includes("Please log in") || message.includes("Failed")
                      ? "text-red-700"
                      : message.includes("empty")
                      ? "text-amber-700"
                      : "text-blue-700"
                  }`}>{message}</span>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Cart Items ({orderedItems.length})
                  </h2>
                  {orderedItems.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              {user && orderedItems.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {orderedItems.map((item) => (
                    <div key={item.productId} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start space-x-4">
                        {/* Product Image Placeholder */}
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-amber-600" />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.productName}</h3>
                              <p className="text-sm text-gray-500 mt-1">Product ID: {item.productId}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  Qty: {item.qty}
                                </span>
                              </div>
                            </div>
                            
                            {/* Price and Actions */}
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                {item.discount > 0 && (
                                  <span className="text-sm text-gray-400 line-through">
                                    Rs. {(item.price * item.qty).toFixed(2)}
                                  </span>
                                )}
                                <span className="text-lg font-bold text-gray-900">
                                  Rs. {(item.lastPrice * item.qty).toFixed(2)}
                                </span>
                              </div>
                              {item.discount > 0 && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                  <Tag className="h-3 w-3 mr-1" />
                                  Save Rs. {(item.discount * item.qty).toFixed(2)}
                                </span>
                              )}
                              <button
                                onClick={() => handleDelete(item.productId, item.productName)}
                                className="mt-3 flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8">Add some products to get started!</p>
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Continue Shopping
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              )}
            </div>

            {/* Security Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Secure Payment</h4>
                  <p className="text-sm text-gray-500">100% safe and secure</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over Rs. 5000</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({orderedItems.length} items)</span>
                    <span className="font-medium">Rs. {labeledTotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">Discount</span>
                      </div>
                      <span className="font-bold text-green-700">- Rs. {discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>

                  <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Included</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between py-4 border-t border-gray-200">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <p className="text-sm text-gray-500">Including all taxes</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">Rs. {total.toFixed(2)}</div>
                      {labeledTotal > 0 && (
                        <div className="text-sm text-gray-500 line-through">Rs. {labeledTotal.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={!user || total <= 0 || loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    total > 0 && user && !loading
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Checkout</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                >
                  Continue Shopping
                </button>

                {/* Help Text */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Need help?{" "}
                    <button className="text-amber-600 hover:text-amber-700 font-medium">
                      Contact Support
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Tips */}
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Shopping Tips
              </h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Free shipping on orders above Rs. 5000
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Prices are inclusive of all taxes
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  You can modify your order before checkout
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  30-day return policy applies to all items
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/aiChatBot.jsx
```javascript
import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";

export default function AiChatBot() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);

  // Show loading SweetAlert
  const showLoadingAlert = (title, text) => {
    return Swal.fire({
      title: title || "Loading...",
      text: text || "Please wait",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  };

  // Show success SweetAlert
  const showSuccessAlert = (title, text) => {
    return Swal.fire({
      title: title || "Success!",
      text: text || "Operation completed successfully",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Show error SweetAlert
  const showErrorAlert = (title, text) => {
    return Swal.fire({
      title: title || "Error!",
      text: text || "Something went wrong",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
    });
  };

  // Show confirmation dialog
  const showConfirmationDialog = async (title, text, confirmText = "Yes", cancelText = "No") => {
    const result = await Swal.fire({
      title: title || "Are you sure?",
      text: text || "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    });
    return result.isConfirmed;
  };

  // Load messages with SweetAlert loading
  const loadMessages = useCallback(async () => {
    if (loading) return;

    const loadingAlert = showLoadingAlert("Loading Messages", "Fetching your chat history...");
    
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/chat/getMessagesbyid", {
        headers: { Authorization: token },
      });
      
      if (res.data && res.data.messages) {
        setMessages(res.data.messages);
      } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
        setMessages(res.data.data);
      } else {
        setMessages([]);
      }
      
      await loadingAlert.close();
    } catch (err) {
      await loadingAlert.close();
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            showErrorAlert("Session Expired", "Please login again to continue chatting.");
            // Optional: Redirect to login
            // window.location.href = "/login";
            break;
          case 403:
            showErrorAlert("Access Denied", "You don't have permission to access chat history.");
            break;
          case 404:
            showErrorAlert("Not Found", "Chat history not found.");
            break;
          default:
            showErrorAlert("Error", "Failed to load messages. Please try again.");
        }
      } else {
        showErrorAlert("Network Error", "Unable to connect to the server. Please check your connection.");
      }
      console.error("Error loading messages:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Load messages when chat opens
  useEffect(() => {
    if (open && token) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [open]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll when messages change
  useEffect(() => {
    if (open && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, open]);

  // Handle reply with SweetAlert
  const handleReply = async () => {
    if (!newMessage.trim() || sending) return;
    
    // Optional: Show confirmation for long messages
    if (newMessage.trim().length > 500) {
      const confirmed = await showConfirmationDialog(
        "Send Long Message?",
        "Your message is quite long. Are you sure you want to send it?",
        "Send",
        "Cancel"
      );
      if (!confirmed) return;
    }
    
    const messageToSend = newMessage.trim();
    
    // Create local message
    const localMessage = {
      _id: Date.now(),
      sender: "User",
      text: messageToSend,
      createdAt: new Date().toISOString(),
    };

    // Optimistic Update
    setMessages((prev) => [...prev, localMessage]);
    setNewMessage("");
    setSending(true);

    try {
      // Show sending indicator
      const sendingAlert = showLoadingAlert("Sending", "Your message is being sent...");
      
      await axios.post(
        "http://localhost:4000/api/chat/sendMessage",
        { text: messageToSend }, 
        { 
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      await sendingAlert.close();
      await showSuccessAlert("Sent!", "Message delivered successfully");
      
      // Wait a bit before reloading messages
      setTimeout(() => {
        loadMessages();
      }, 500);
      
    } catch (error) {
      console.error("Message sending failed:", error);
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            showErrorAlert("Session Expired", "Please login again to send messages.");
            break;
          case 403:
            showErrorAlert("Permission Denied", "You don't have permission to send messages.");
            break;
          case 429:
            showErrorAlert("Too Many Requests", "Please wait a moment before sending another message.");
            break;
          case 500:
            showErrorAlert("Server Error", "Our server encountered an error. Please try again later.");
            break;
          default:
            showErrorAlert("Failed to Send", "Unable to send message. Please try again.");
        }
      } else if (error.request) {
        showErrorAlert("Network Error", "Unable to connect to the server. Please check your internet connection.");
      } else {
        showErrorAlert("Error", "Something went wrong. Please try again.");
      }
      
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg._id !== localMessage._id));
      setNewMessage(messageToSend);
    } finally {
      setSending(false);
    }
  };

  // Handle chat window toggle with confirmation if there's unsent message
  const handleToggleChat = async () => {
    if (newMessage.trim() && !open) {
      const confirmed = await showConfirmationDialog(
        "Unsaved Message",
        "You have an unsent message. Open chat anyway?",
        "Open",
        "Continue Writing"
      );
      if (!confirmed) return;
    }
    setOpen(!open);
  };

  // Clear chat history
  const handleClearChat = async () => {
    if (messages.length === 0) return;
    
    const confirmed = await showConfirmationDialog(
      "Clear Chat History?",
      "This will remove all your chat history. This action cannot be undone.",
      "Clear All",
      "Cancel"
    );
    
    if (!confirmed) return;
    
    const loadingAlert = showLoadingAlert("Clearing", "Removing chat history...");
    
    try {
      await axios.delete("http://localhost:4000/api/chat/clearMessages", {
        headers: { Authorization: token },
      });
      
      await loadingAlert.close();
      await showSuccessAlert("Cleared!", "All chat history has been removed.");
      setMessages([]);
    } catch (error) {
      await loadingAlert.close();
      showErrorAlert("Clear Failed", "Failed to clear chat history. Please try again.");
      console.error("Error clearing messages:", error);
    }
  };

  // Debug: Check token with SweetAlert
  useEffect(() => {
    if (!token && open) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please login to use the chat feature.",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = "/login";
        } else {
          setOpen(false);
        }
      });
    }
  }, [open, token]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button with notification badge */}
      <div className="relative">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          onClick={handleToggleChat}
        >
          💬
          {messages.length > 0 && !open && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {messages.length > 9 ? '9+' : messages.length}
            </span>
          )}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-0 -right-0 animate-ping"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-0 -right-0"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Assistant</h3>
                <p className="text-xs opacity-80">
                  {(loading || sending) ? "Processing..." : "Online"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  className="text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition"
                  title="Clear chat history"
                >
                  🗑️
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-lg hover:text-gray-200 transition"
                title="Close chat"
              >
                ✖
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {/* Loading Indicator with SweetAlert2 style */}
            {loading && messages.length === 0 && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm">Loading your conversation history...</p>
              </div>
            )}

            {/* No messages */}
            {!loading && messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💬</span>
                </div>
                <h4 className="font-semibold text-gray-700">Start a Conversation</h4>
                <p className="text-gray-500 text-sm mt-1">Ask me anything! I'm here to help.</p>
                <div className="mt-4 text-left bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1">Try asking:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• "Hello, how can you help me?"</li>
                    <li>• "Explain machine learning in simple terms"</li>
                    <li>• "What's the weather like today?"</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message._id}
                className={`p-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                  message.sender !== "User"
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"
                    : "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                } max-w-[85%] ${
                  message.sender !== "User" ? "mr-auto" : "ml-auto"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.sender !== "User" 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                      : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                  }`}>
                    {message.sender !== "User" ? "AI" : "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {message.sender}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {message.text}
                    </p>
                    <small className="text-xs text-gray-500 block mt-2">
                      {new Date(message.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </small>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Sending indicator */}
            {sending && (
              <div className="text-center py-2">
                <div className="inline-flex items-center space-x-2 text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="text-sm">Sending message...</span>
                </div>
              </div>
            )}
            
            {/* Scroll Ref */}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer with Reply */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  disabled={loading || sending}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed pr-12"
                  onKeyPress={(e) => { 
                    if (e.key === 'Enter' && !sending && newMessage.trim()) {
                      handleReply();
                    }
                  }}
                  maxLength={2000}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {newMessage.length}/2000
                </div>
              </div>
              <button
                onClick={handleReply}
                disabled={loading || sending || !newMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center w-12"
                title={sending ? "Sending..." : "Send message"}
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                ) : (
                  <span className="text-lg">➤</span>
                )}
              </button>
            </div>
            {newMessage.length > 1500 && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Message getting too long ({newMessage.length}/2000)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: src/components/pages/productoverview.jsx
```javascript
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "@/components/imageSlider";
import { addToCart } from "../utils/cart";
import { FiShoppingCart, FiPackage, FiTag, FiInfo, FiArrowLeft, FiStar, FiTruck, FiShield } from "react-icons/fi";
import { MdLocalOffer, MdOutlineInventory2 } from "react-icons/md";
import Swal from "sweetalert2";

export default function ProductOverview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
        
        if (response.data && response.data.product) {
          setProduct(response.data);
          
          // Fetch related products (same category)
          fetchRelatedProducts(response.data.product.category, response.data.product.productId);
        } else {
          setError("Product data not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/category/${category}`);
      if (Array.isArray(response.data)) {
        // Filter out current product and limit to 4 related products
        const filtered = response.data
          .filter(p => p.productId !== currentProductId)
          .slice(0, 4);
        setRelatedProducts(filtered);
      }
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyNow = () => {
    if (!product?.product || product.product.stock <= 0) return;

    Swal.fire({
      title: 'Proceed to Checkout?',
      text: `Buy "${product.product.productName}" for LKR ${(product.product.lastPrices * quantity).toFixed(2)}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Continue shopping'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/shipping/?productId=${product.product.productId}&productName=${encodeURIComponent(product.product.productName)}`, {
          state: {
            orderedItems: [
              {
                productId: product.product.productId,
                productName: product.product.productName,
                price: product.product.price,
                lastPrice: product.product.lastPrices,
                qty: quantity,
                image: product.product.images?.[0] || '',
              },
            ],
            total: product.product.lastPrices * quantity,
            labeledTotal: product.product.price * quantity,
            discount: (product.product.price - product.product.lastPrices) * quantity,
            message: "Buying single product now",
          },
        });
      }
    });
  };

  const handleAddToCart = async () => {
    if (!product?.product || product.product.stock <= 0) return;

    setAddingToCart(true);
    try {
      addToCart(product.product.productId, quantity);
      
      await Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: `${quantity} × "${product.product.productName}" added to your cart`,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add',
        text: 'Could not add item to cart. Please try again.',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Product Details</h2>
          <p className="text-gray-500">Please wait while we fetch the product information...</p>
        </div>
      </div>
    );
  }

  if (error || !product?.product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "Product Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for might not exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <FiArrowLeft /> Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const data = product.product;
  const discountPercentage = data.price > 0 
    ? Math.round(((data.price - data.lastPrices) / data.price) * 100) 
    : 0;
  const hasDiscount = data.price > data.lastPrices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <FiArrowLeft /> Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6">
              <ImageSlider 
                images={data.images} 
                showThumbnails={true}
                autoplay={true}
              />
              
              {/* Product Highlights */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <FiTruck className="text-blue-600" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <FiShield className="text-green-600" />
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <MdOutlineInventory2 className="text-purple-600" />
                  <span className="text-sm font-medium">In Stock: {data.stock}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                  <FiPackage className="text-amber-600" />
                  <span className="text-sm font-medium">Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FiStar className="text-amber-500" />
                  Related Products
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {relatedProducts.map((related) => (
                    <div 
                      key={related.productId}
                      className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/productoverview/${related.productId}`)}
                    >
                      <img 
                        src={related.images?.[0] || '/placeholder-image.jpg'} 
                        alt={related.productName}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium text-gray-800 truncate">{related.productName}</p>
                      <p className="text-green-600 font-bold text-sm">
                        {formatPrice(related.lastPrices || related.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Product ID & Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">SKU: {data.productId}</span>
                <div className="flex items-center gap-2">
                  <FiTag className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{data.category}</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {data.productName}
              </h1>

              {/* Alternate Names */}
              {data.altNames && data.altNames.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Also known as:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.altNames.map((name, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-green-600">
                    {formatPrice(data.lastPrices)}
                  </span>
                  
                  {hasDiscount && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        {formatPrice(data.price)}
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-full">
                        -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
                
                {/* Price per unit */}
                <p className="text-sm text-gray-500">
                  {quantity > 1 && (
                    <>
                      {formatPrice(data.lastPrices)} each • Total: {formatPrice(data.lastPrices * quantity)}
                    </>
                  )}
                </p>
              </div>

              {/* Stock Status */}
              <div className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                data.stock > 10 ? 'bg-green-100 text-green-800' : 
                data.stock > 0 ? 'bg-amber-100 text-amber-800' : 
                'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  data.stock > 10 ? 'bg-green-500' : 
                  data.stock > 0 ? 'bg-amber-500' : 
                  'bg-red-500'
                }`}></div>
                <span className="font-medium">
                  {data.stock > 10 ? 'In Stock' : 
                   data.stock > 0 ? `Only ${data.stock} left` : 
                   'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={data.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= data.stock) setQuantity(val);
                    }}
                    className="w-20 text-center border border-gray-300 rounded-lg py-2"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= data.stock}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    Max: {data.stock} units
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={data.stock <= 0 || addingToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={data.stock <= 0}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FiInfo className="text-gray-600" />
                  Product Description
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {data.description || "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold text-gray-800">{data.category}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="font-semibold text-gray-800">{data.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/pages/Homepage.jsx
```javascript
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "@/components/pages/HomeContainer";
import Login from "./Login";
import Dashboard from "@/components/pages/admin/dashboard";
import NotFound from "@/components/pages/NotFound";
import Signup from "@/components/pages/singUp";
import Productoverview from "./productoverview";
import ViewCartPage from "./viewCart";
import ShipingPage from "@/components/pages/shipping";
import AboutPage from "@/components/pages/about.jsx";
import ServicePage from "@/components/pages/service.jsx";
import { jwtDecode } from "jwt-decode"; // FIXED IMPORT
import AiChatBot from "@/components/aiChatBot";
import PaymentPage from "@/components/pages/admin/payment";

export default function Homepage() {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState("customer");

  useEffect(() => {
    const authcheck = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser("customer");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setUser(decoded.role === "admin" ? "admin" : "customer");
      } catch {
        setUser("customer");
      }
    };

    authcheck(); // first check
    window.addEventListener("authChange", authcheck);

    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      {/* Main content area */}
      <div className="w-full h-[calc(100vh-100px)]">
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/viewcart" element={<ViewCartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shipping/" element={<ShipingPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />

          <Route path="/payments" element={<PaymentPage />} />

          <Route path="/admin/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/productoverview/:productId"
            element={<Productoverview />}
          />
        </Routes>
      </div>

      {/* Show chatbot only for customer */}
      {user === "customer" && <AiChatBot />}
    </div>
  );
}
```
