import React, { useState } from 'react';
import axios from 'axios';

const SEOChecker = () => {
  const [url, setUrl] = useState('');
  const [seoData, setSeoData] = useState(null);

  const analyzeURL = async () => {
    try {
      const post_array = [
        {
          url,
          for_mobile: true,
          tag: 'some_string_123',
          pingback_url: 'https://your-server.com/pingscript?id=$id&tag=$tag',
        },
      ];

      const response = await axios.post(
        'https://api.dataforseo.com/v3/on_page/lighthouse/task_post',
        post_array,
        {
          auth: {
            username: 'shortburst007@gmail.com',
            password: 'dfafc008fd6d4f2a',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (
        response.data &&
        response.data.tasks &&
        response.data.tasks.length > 0
      ) {
        const taskId = response.data.tasks[0].id;
        fetchAnalysisResults(taskId);
      } else {
        console.error('No task ID available.');
      }
    } catch (error) {
      console.error('Error analyzing URL:', error);
    }
  };

  const fetchAnalysisResults = async (taskId) => {
    try {
      const response = await axios.get(
        `https://api.dataforseo.com/v3/on_page/lighthouse/task_get/json/${taskId}`,
        {
          auth: {
            username: 'shortburst007@gmail.com',
            password: 'dfafc008fd6d4f2a',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setSeoData(response.data);
      console.log('Analysis Results:', response.data);
    } catch (error) {
      console.error('Error fetching analysis results:', error);
    }
  };

  const handleAnalyzeClick = () => {
    if (!url) {
      console.error('URL is required.');
      return;
    }

    analyzeURL();
  };

  return (
    <div className="seo-checker-container">
      <h1>SEO Analysis</h1>
      <input
        type="text"
        placeholder="Enter URL (e.g., example.com or example.com/file-name.html)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAnalyzeClick}>Analyze</button>

      {seoData && (
        <div className="seo-data">
          <h2>SEO Analysis Results</h2>
          <pre>{JSON.stringify(seoData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SEOChecker;
