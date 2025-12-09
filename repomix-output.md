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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/chat/getMessages", {
          headers: { Authorization: token },
        });
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [token]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser]);

  const handleReply = async () => {
    if (!selectedUser || !replyText.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:4000/api/chat/adminReply",
        { userId: selectedUser._id, message: replyText }, // send MongoDB _id
        { headers: { Authorization: token } }
      );
      alert(res.data.message);

      const newMessage = {
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
          u._id === selectedUser._id ? { ...u, messages: [...u.messages, newMessage] } : u
        )
      );

      setReplyText("");
      scrollToBottom();
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left border-b">User ID</th>
            <th className="p-2 text-left border-b">Date</th>
            <th className="p-2 text-left border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2 border-b">{user.userId}</td>
              <td className="p-2 border-b">{new Date(user.createdAt).toLocaleString()}</td>
              <td className="p-2 border-b">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowPopup(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {showPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto flex flex-col">
            <h2 className="text-xl font-bold mb-4">Messages Id - {selectedUser.userId}</h2>

            <div className="flex-1 overflow-y-auto">
              {selectedUser.messages
                ?.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                .map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-2 flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`p-2 rounded shadow-sm max-w-[70%] ${
                        msg.sender === "user"
                          ? "bg-gray-100 text-black rounded-bl-none"
                          : "bg-blue-100 text-black rounded-br-none"
                      }`}
                    >
                      <strong>{msg.sender === "user" ? "User" : "Admin"}:</strong> {msg.text}
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              <div ref={messagesEndRef}></div>
            </div>

            <textarea
              className="w-full border p-2 rounded mb-4 mt-2"
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
              >
                Close
              </button>
              <button
                onClick={handleReply}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
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
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Shipping() {
  const location = useLocation();
  const quoteData = location.state;

  // State for shipping info
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle final order confirmation
  const handleConfirm = () => {
    if (quoteData && quoteData.total > 0) {
      // Here you would make the final API call to save the order with shippingInfo
      console.log("Final Order Data:", {
        quoteData,
        shippingInfo
      });

      alert(`Order Confirmed for Rs. ${quoteData.total.toFixed(2)}!\nShipping to: ${shippingInfo.name}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, Phone: ${shippingInfo.phone}`);
      // After successful API call, you can navigate to a success page
    } else {
      alert('Cannot confirm order. Order data is missing or total is zero.');
    }
  };

  return (
    <div className="shipping-container p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Shipping & Final Confirmation 🚚</h2>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Order Summary</h3>
        {quoteData ? (
          <>
            <p className="text-lg mb-1">
              Final Total: <span className="font-bold text-green-700">Rs. {quoteData.total?.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-700">
              Message: <span className="italic ml-2">{quoteData.message || "No message provided."}</span>
            </p>
          </>
        ) : (
          <p className="text-red-500 font-semibold">No order data was passed. Please return to the cart.</p>
        )}
      </div>

      {/* Shipping Form */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h3>
        <div className="space-y-4 p-4 bg-white border border-dashed border-gray-300 rounded-md">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Postal code"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., +94 7XXXXXXX"
            />
          </div>

        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleConfirm}
          className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white transition duration-150 ease-in-out ${
            quoteData && quoteData.total > 0
              ? "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!quoteData || quoteData.total <= 0}
        >
          Confirm Order (Rs. {quoteData && quoteData.total > 0 ? quoteData.total.toFixed(2) : '0.00'})
        </button>
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminAllProductView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products", {
          headers: { Authorization: "Bearer " + token },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, token, loading]);

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/products/${productId}`, {
          headers: { Authorization: "Bearer " + token },
        });
        Swal.fire("Deleted!", "Product deleted successfully.", "success");
        setLoading(true); // Trigger re-fetch
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        All Products
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((prod) => (
                <tr
                  key={prod.productId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-700">{prod.productId}</td>
                  <td className="px-4 py-3">
                    {prod.images?.length > 0 ? (
                      <img
                        src={prod.images[0]}
                        alt={prod.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {prod.productName}
                  </td>
                  <td className="px-4 py-3 text-gray-700">${prod.price}</td>
                  <td className="px-4 py-3 text-gray-700">{prod.stock}</td>
                  <td className="px-4 py-3 text-gray-700">{prod.category}</td>
                  <td className="px-4 py-3 text-gray-700">{prod.brand}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/dashboard/editproducts/`, {
                          state: { product: prod },
                        })
                      }
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod.productId)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

## File: src/components/pages/admin/EditProducts.jsx
```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import uploadMediaToSupabase from "@/components/utils/mediaUpload";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const existingProduct = location.state?.product || null;

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    productId: existingProduct?.productId || uuidv4(),
    productName: existingProduct?.productName || "",
    altNames: existingProduct?.altNames?.join(",") || "",
    price: existingProduct?.price || 0,
    lastPrices: existingProduct?.lastPrices || 0,
    stock: existingProduct?.stock || 0,
    description: existingProduct?.description || "",
    category: existingProduct?.category || "General",
    brand: existingProduct?.brand || "Unbranded",
    images: existingProduct?.images || [],
  });

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  const handleUpload = async () => {
    try {
      const uploadedImages = images.length
        ? await Promise.all(Array.from(images).map(uploadMediaToSupabase))
        : [];

      const payload = {
        ...formData,
        altNames: formData.altNames.split(",").map((n) => n.trim()),
        images: [...formData.images, ...uploadedImages],
      };

      if (existingProduct) {
        await axios.patch(
          `http://localhost:4000/api/products/${formData.productId}`,
          payload,
          { headers: { Authorization: "Bearer " + token } }
        );
      } else {
        await axios.post(`http://localhost:4000/api/products`, payload, {
          headers: { Authorization: "Bearer " + token },
        });
      }

      setImages([]);
      setFormData({ ...formData, images: payload.images });

      // ✅ SweetAlert2 success alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product saved successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/admin/dashboard/adminviewproducts");
      });
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save product. Try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Product ID</label>
          <input
            type="text"
            value={formData.productId}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 text-gray-600"
          />
        </div>

        {[
          "productName",
          "altNames",
          "price",
          "lastPrices",
          "stock",
          "description",
          "category",
          "brand",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {field === "description" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <input
                type={
                  ["price", "lastPrices", "stock"].includes(field)
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block mb-1">Product Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="w-full border p-2 rounded bg-gray-50"
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {formData.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="product"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          {existingProduct ? "Update Product" : "Upload & Save Product"}
        </button>
      </div>
    </div>
  );
}
```

## File: src/components/pages/HomeContainer.jsx
```javascript
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import axios from "axios";

export default function HomeContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch products කරන function එක
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array - component mount වෙද්දි විතරක් run වෙනවා

  // Loading state එක check කරන්න
  if (loading) {
    return (
      <div className="bg-teal-900 min-h-screen p-8 flex justify-center items-center">
        <div className="text-white text-xl">පොඩ්ඩක් ඉන්න... භාණ්ඩ ගෙනෙනවා</div>
      </div>
    );
  }

  return (
    <div>
      <div className=" min-h-screen p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {products.map((product, index) => (
            <Card
              key={index}
              productId={product.productId}
              productName={product.productName}
              lastPrices={product.lastPrices}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>
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

## File: src/components/aiChatBot.jsx
```javascript
import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react"; 

export default function AiChatBot() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state එකක් එකතු කිරීම
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null); 

  // 💡 FIX 1: Messages Load කරන Logic එක වෙනම useCallback function එකකට දැමීම
  const loadMessages = useCallback(async () => {
    if (loading) return; 

    setLoading(true); // Loading ආරම්භ කිරීම
    try {
      const res = await axios.get("http://localhost:4000/api/chat/getMessagesbyid", {
        headers: { Authorization: token },
      });
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Error loading messages:", err);
    } finally {
      setLoading(false); // Loading අවසන් කිරීම
    }
  }, [token, loading]); // loading state එක dependency එකක් ලෙස දමන්න

  // 2. පණිවිඩ ඉතිහාසය Load කිරීම සහ Chat එක වැහුවම messages Clear කිරීම
  useEffect(() => {
    if (open) {
      loadMessages(); // 💡 FIX 2: open වූ විට messages load කරන්න
    } else {
      setMessages([]);
    }
  }, [open, loadMessages]);
  
  // 3. අලුත් පණිවිඩයක් ආවම Chat Window එක පහළට Scroll කිරීමේ function එක
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // messages state එක වෙනස් වුණාම Scroll කරන්න
  useEffect(() => {
    if (open) {
      scrollToBottom(); 
    }
  }, [messages, open]);

  // Handle reply
  const handleReply = async () => {
    if (!newMessage.trim() || loading) return; // Loading වෙද්දී නැවත පණිවිඩ යැවීම නවත්වන්න

    const messageToSend = newMessage; 
    
    // Local Message Object එක හදමු
    const localMessage = {
      _id: Date.now(),
      sender: "User",
      text: messageToSend,
      createdAt: new Date().toISOString(),
    };

    // UI එකේ පණිවිඩය ඉක්මනින්ම පෙන්නමු (Optimistic Update)
    setMessages((prev) => [...prev, localMessage]);
    setNewMessage("");

    try {
      // Backend එකට පණිවිඩය යවමු
      await axios.post(
        "http://localhost:4000/api/chat/sendMessage",
        { text: messageToSend }, 
        { headers: { Authorization: token } }
      );
      
      // 💡 FIX 3: පණිවිඩය සාර්ථකව යැව්වාට පසු, AI response එක ගෙන ඒමට නැවත Fetch කරන්න
      loadMessages(); 
      
    } catch (error) {
      console.error("Message sending failed:", error);
      // දෝෂයක් ආවොත්, locally add කළ message එක ඉවත් කරන්න
      setMessages(prev => prev.filter(msg => msg._id !== localMessage._id));
      setNewMessage(messageToSend); 
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button */}
      <button
        className="bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-2">
            <h3 className="font-semibold">AI ChatBot {loading && "..."}</h3>
            <button onClick={() => setOpen(false)} className="text-lg">
              ✖
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
             {/* Loading Indicator */}
            {loading && messages.length === 0 && (
                <div className="text-center text-gray-500">Loading history...</div>
            )}

            {messages.map((message) => (
              <div
                key={message._id}
                className={`p-2 rounded-md shadow-sm ${
                  // "User" නොවන sender කෙනෙකුට "Admin" style එක දෙන්න
                  message.sender !== "User"
                    ? "bg-blue-100 text-left" // Bot/Admin පණිවිඩ
                    : "bg-gray-100 text-right" // User පණිවිඩ
                } max-w-[80%] ${
                    message.sender !== "User" ? "mr-auto" : "ml-auto"
                }`}
              >
                <p className="text-sm">
                  <span className="font-bold">{message.sender || "Unknown"}:</span>{" "}
                  {message.text} 
                </p>
                <small className="text-xs text-gray-500 block mt-1">
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </small>
              </div>
            ))}
            {/* Scroll Ref */}
            <div ref={messagesEndRef} /> 
          </div>

          {/* Footer with Reply */}
          <div className="border-t p-2 flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a reply..."
              disabled={loading} // Loading වෙද්දී disable කරන්න
              className="flex-1 border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              onKeyPress={(e) => { 
                if (e.key === 'Enter') {
                  handleReply();
                }
              }}
            />
            <button
              onClick={handleReply}
              disabled={loading || !newMessage.trim()} // Loading වෙද්දී disable කරන්න
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: src/components/Navbar.jsx
```javascript
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // ✅ hamburger & close icons

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ mobile menu state
  const navigate = useNavigate();

  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch {
      setUser(null);
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
  to={`/viewcart?userId=${user ? user.id : ""}`} // ✅ correct syntax
  className="text-gray-700 hover:text-blue-600 transition"
>
  Cart
</Link>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt={user.name || "User profile"}
                className="w-10 h-10 rounded-full object-cover border shadow-sm"
              />
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Dashboard
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

          {user ? (
            <>
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
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
import { jwtDecode } from "jwt-decode"; // Correct import

export default function AddProducts() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    productId: uuidv4(),
    productName: "",
    altNames: "",
    price: 0,
    lastPrices: 0,
    stock: 0,
    description: "",
    category: "General",
    brand: "Unbranded",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        alert("You are not authorized to access this page.");
        navigate("/"); // redirect non-admin users
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const imgUrls = await Promise.all(
        Array.from(images).map(uploadMediaToSupabase)
      );

      const payload = {
        ...formData,
        altNames: formData.altNames.split(",").map((n) => n.trim()),
        images: imgUrls,
      };

      const res = await axios.post(
        "http://localhost:4000/api/products",
        payload,
        { headers: { Authorization: "Bearer " + token } }
      );

      console.log("Product saved:", res.data);
      alert("Product uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Failed to upload product.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="space-y-4">
        {/* Form fields */}
        <input
          type="text"
          value={formData.productId}
          readOnly
          className="w-full border p-2 rounded bg-gray-100 text-gray-600"
        />
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="altNames"
          value={formData.altNames}
          onChange={handleChange}
          placeholder="Alternate Names"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="lastPrices"
          value={formData.lastPrices}
          onChange={handleChange}
          placeholder="Last Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="w-full border p-2 rounded bg-gray-50"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload & Save Product
        </button>
      </div>
    </div>
  );
}
```

## File: src/components/pages/admin/dashboard.jsx
```javascript
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineGridView, MdAddBox, MdEdit, MdNotifications } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // correct import
import AddProducts from "./addProducts";
import AdminAllProductView from "./AdminAllProductView";
import EditProducts from "./EditProducts";
import Notification from "./notification";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Auth check
  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch {
      setUser(null);
    }
  };

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    window.dispatchEvent(new Event("authChange"));
  };

  useEffect(() => {
    authcheck();
    window.addEventListener("authChange", authcheck);
    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="bg-blue-600 lg:hidden p-4 flex justify-between items-center w-full fixed top-0 left-0 z-50 shadow-md">
        <h1 className="text-white text-lg font-semibold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <RxHamburgerMenu size={28} className="text-white" />
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-screen w-64 bg-white text-gray-700 shadow-lg border-r border-gray-200 transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="py-6 flex justify-center border-b border-gray-200">
          <Link
            to="/admin/dashboard"
            className="text-2xl font-bold text-blue-600 tracking-wide"
          >
            Dashboard
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 px-4 mt-6">
          <Link
            to="/admin/dashboard/adminviewproducts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <MdOutlineGridView className="text-xl" /> View Products
          </Link>

          <Link
            to="/admin/dashboard/addproducts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <MdAddBox className="text-xl" /> Add Product
          </Link>

          <Link
            to="/admin/dashboard/editproducts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <MdEdit className="text-xl" /> Edit Product
          </Link>

          <Link
            to="/admin/dashboard/notification"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <MdNotifications className="text-xl" /> Notification
          </Link>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100 p-10">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Welcome to Admin Dashboard
        </h1>

        <div className="bg-white rounded-xl shadow-md p-4 min-h-[calc(100vh-150px)]">
          <Routes>
            <Route path="adminviewproducts" element={<AdminAllProductView />} />
            <Route path="addproducts" element={<AddProducts />} />
            <Route path="editproducts" element={<EditProducts />} />
            <Route path="notification" element={<Notification />} />
          </Routes>
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
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Login
        </h2>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-4 bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
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

const initialQuoteState = {
  orderedItems: [],
  total: 0,
  labeledTotal: 0,
  discount: 0,
  message: "Calculating prices...",
};

export default function ViewCart() {
  const [quoteData, setQuoteData] = useState(initialQuoteState);
  const [user, setUser] = useState(null); // null = not logged in
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setQuoteData({ ...initialQuoteState, message: "Please log in to view your cart." });
      return;
    }
    setUser(token); // you can decode if you need role
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
      try {
        const { data } = await axios.post("http://localhost:4000/api/orders/quote", { orderedItems: cart });
        setQuoteData(data);
      } catch (error) {
        console.error("Quote API Error:", error);
        setQuoteData({ ...initialQuoteState, message: "Failed to fetch prices." });
      }
    };

    fetchQuote();
  }, [user]);

  // Delete item
  const handleDelete = (productId) => {
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
      message: updatedItems.length === 0 ? "Your cart is empty." : "Updated cart.",
    });
  };

  // Checkout
  const handleCheckout = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to proceed to checkout.",
        confirmButtonColor: "#ffc107",
      });
      navigate("/login");
      return;
    }

    if (!quoteData.orderedItems.length || quoteData.total <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Your cart is empty or calculation failed. Please add items to proceed.",
        confirmButtonColor: "#ffc107",
      });
      return;
    }

    Swal.fire({
      title: "Confirm Checkout",
      text: `You are about to place an order for Rs. ${quoteData.total.toFixed(2)}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
      cancelButtonText: "Review Order",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/shipping/", { state: quoteData });
      }
    });
  };

  const { orderedItems, total, labeledTotal, discount, message } = quoteData;

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        🛒 Your Order Summary
      </h2>

      <p className="p-3 text-sm text-yellow-700 bg-yellow-100 rounded-lg text-center mb-6">
        {message}
      </p>

      {user && orderedItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Product", "Price", "Qty", "Subtotal", "Action"].map((title) => (
                  <th key={title} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orderedItems.map((item) => {
                const subtotal = item.qty * item.lastPrice;
                return (
                  <tr key={item.productId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.productName}
                      <span className="text-xs text-gray-500 block">({item.productId})</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {item.lastPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Rs. {subtotal.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold cursor-pointer">
                      <button onClick={() => handleDelete(item.productId)} className="hover:underline">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="bg-gray-100 border-t border-gray-300">
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-600">Price Total</td>
                <td className="px-6 py-3 text-sm font-bold text-gray-700">Rs. {labeledTotal.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr className="bg-yellow-100 border-t border-yellow-300">
                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-yellow-800">Discount</td>
                <td className="px-6 py-3 text-sm font-bold text-yellow-800">Rs. {discount.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr className="bg-green-100 border-t border-green-300">
                <td colSpan="3" className="px-6 py-4 text-right text-base font-bold text-green-800">Total After Discount</td>
                <td className="px-6 py-4 text-base font-bold text-green-800">Rs. {total.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="5" className="pt-4 pb-2 text-right">
                  <button
                    onClick={handleCheckout}
                    disabled={!user || total <= 0}
                    className={`w-full sm:w-auto inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white transition duration-150 ease-in-out ${
                      total > 0 && user
                        ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Proceed to Checkout (Rs. {total.toFixed(2)})
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500">{message}</p>
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

export default function ProductOverview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading product...
      </div>
    );

  if (error || !product)
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        {error || "Product not found"}
      </div>
    );

  const data = product.product;

  // --- Buy Now Handler ---
  const handleBuyNow = () => {
    if (data.stock <= 0) return;

    navigate(`/shipping/?productId=${data.productId}&productName=${data.productName}`, {
      state: {
        orderedItems: [
          {
            productId: data.productId,
            productName: data.productName,
            price: data.price,
            lastPrice: data.lastPrices,
            qty: 1,
          },
        ],
        total: data.lastPrices,
        labeledTotal: data.price,
        discount: data.price - data.lastPrices,
        message: "Buying single product now",
      },
    });
  };

  // --- Add to Cart Handler ---
  const handleAddToCart = () => {
    if (data.stock <= 0) return;
    addToCart(data.productId, 1);
    alert("Product added to cart");
  };

  return (
    <div className="min-h-screen w-full bg-amber-50 flex flex-col lg:flex-row items-center justify-center py-6 px-4 sm:px-6 gap-6">
      {/* Left: Image Slider */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md h-full hidden lg:block">
          <ImageSlider images={data.images} />
        </div>
        <div className="w-[300px] h-[300px] lg:hidden flex items-center justify-center">
          <ImageSlider images={data.images} />
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start bg-white rounded-2xl shadow-xl p-6 sm:p-8 border max-w-lg">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center lg:text-left">
          {data.productName}
        </h1>

        {/* Price Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-4 mb-4 justify-center lg:justify-start">
          {data.price > data.lastPrices && (
            <p className="text-red-600 text-lg sm:text-xl line-through font-medium">
              LKR {data.price.toFixed(2)}
            </p>
          )}
          <p className="text-3xl sm:text-4xl text-green-600 font-bold">
            LKR {data.lastPrices.toFixed(2)}
          </p>
        </div>

        {/* Stock */}
        <p
          className={`text-center px-3 py-2 rounded-full text-white font-medium mb-6 text-base ${
            data.stock > 0 ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {data.stock > 0 ? `In Stock (${data.stock})` : "Out of Stock"}
        </p>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 text-center lg:text-left">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg text-center lg:text-left">
            {data.description}
          </p>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow text-center sm:text-left">
            <p className="text-sm sm:text-base text-gray-500">Category</p>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              {data.category}
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow text-center sm:text-left">
            <p className="text-sm sm:text-base text-gray-500">Brand</p>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              {data.brand}
            </p>
          </div>
        </div>

        {/* Add to Cart & Buy Now */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
            onClick={handleAddToCart}
            disabled={data.stock <= 0}
          >
            Add to Cart
          </button>

          <button
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
            onClick={handleBuyNow}
            disabled={data.stock <= 0}
          >
            Buy Now
          </button>
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
