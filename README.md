# Web Content Summarizer Chrome Extension

![Web Content Summarizer Logo](assets/icons/icon128.png)

The Web Content Summarizer Chrome Extension is a powerful tool that allows you to summarize web content quickly and efficiently using OpenAI's GPT-3.5 Turbo model. This extension provides two summary modes: general summaries and bullet-point summaries, catering to different use cases. It also supports multiple languages, including English, Hindi, French, German, Japanese, and Spanish. The extension is designed to handle various edge cases and ensure a seamless user experience.

## Table of Contents

- [Web Content Summarizer Chrome Extension](#web-content-summarizer-chrome-extension)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Edge Case Handling](#edge-case-handling)

## Features

- Summarize the content of webpages using the power of GPT-3.5 Turbo.
- Choose between two summary modes:
  - **General Summary**: Get a concise summary of the webpage's content.
  - **Bullet-Point Summary**: Summarize the content in a bullet-point format.
- Select your preferred language for the summary from a list of six supported languages.
- **Cache previously generated summaries**: If a summary has been generated for the same webpage, summary type, and language before, it will be quickly retrieved from the cache, saving time and resources.
- Copy generated summaries to the clipboard for easy sharing and reference.
- Handle various edge cases to ensure a reliable user experience.

## Installation

Follow these steps to install the Web Content Summarizer Chrome Extension:

1. Clone or download this repository to your local machine.

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" in the top right corner of the extensions page.

4. Click on the "Load unpacked" button.

5. Select the directory where you cloned or downloaded the repository.

6. The extension should now be installed and visible in your browser's toolbar.

## Usage

Using the Web Content Summarizer Chrome Extension is easy:

1. Navigate to a webpage you want to summarize.

2. Click on the Web Content Summarizer icon in your browser's toolbar.

3. Choose the desired summary type (general or bullet-point) from the dropdown.

4. Select your preferred language from the language dropdown (English, Hindi, French, German, Japanese, or Spanish).

5. Click the "Summarize" button to generate the summary.

6. The summary will be displayed on the extension popup. You can copy it to the clipboard using the "Copy" button.

7. **Cached Summaries**: If a summary has been generated for the same webpage, summary type, and language before, it will be quickly retrieved from the cache, saving time and resources.

## Edge Case Handling

The Web Content Summarizer Chrome Extension is designed to handle various edge cases to ensure a smooth user experience. Here are some of the edge cases it addresses:

1. **Network Connectivity Failure**: Gracefully handle situations where there is no internet connection.

2. **Content Reading Script Failure**: Address issues that may arise when extracting content from webpages.

3. **Summary Generation Failure**: Handle errors that occur during summary generation.

4. **Active Tab Information Unavailable**: Ensure the extension works only on active tabs and handles situations where tab information is not available.

5. **Cache Storage Error**: Handle errors related to caching summary data.

6. **Unsupported Content Types**: Handle unsupported content types gracefully.

7. **Compatibility**: Ensure compatibility with various webpage formats and layouts.

8. **User Experience**: Prioritize a smooth and user-friendly experience throughout the extension's use.

9. **Handling Special Tabs**: Recognize and handle special tabs like new tabs, blank tabs, and extension pages to provide a consistent user experience.

