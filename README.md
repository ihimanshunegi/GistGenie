# Web Content Summarizer Chrome Extension

The Web Content Summarizer Chrome Extension is a tool that allows users to summarize the content of webpages using OpenAI's GPT-3.5 Turbo model. It provides two summary modes: general summary and bullet-point summary. The extension utilizes Chrome's extension APIs and content scripting to interact with the current active tab's content.

## Table of Contents

- [Web Content Summarizer Chrome Extension](#web-content-summarizer-chrome-extension)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  
## Features

- Summarize the content of a webpage using GPT-3.5 Turbo.
- Choose between general summary or bullet-point summary.
- Cache previously generated summaries to avoid redundant requests.
- Copy generated summaries to the clipboard for easy sharing.

## Installation

1. Clone or download this repository to your local machine.

2. Open Google Chrome and go to `chrome://extensions/`.

3. Enable "Developer mode" in the top right corner of the page.

4. Click on the "Load unpacked" button and select the directory where you cloned/downloaded the repository.

5. The extension should now be installed and visible in your browser's toolbar.

## Usage

1. Navigate to a webpage you want to summarize.

2. Click on the Web Content Summarizer Chrome Extension icon in the browser toolbar.

3. Choose the desired summary type (general or bullet-point) from the dropdown.

4. Click the "Summarize" button to generate the summary.

5. The summary will be displayed on the extension popup. You can copy it to the clipboard using the "Copy" button.

6. If a summary has been generated for the same webpage and summary type before, it will be cached and can be quickly retrieved.

