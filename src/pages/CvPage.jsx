import React from 'react';
import { Download, ExternalLink, ArrowLeft, FileText } from 'lucide-react';
import cvFile from '../assets/CV/cv.pdf';
import '../styles/CvPage.css';

export default function CvPage({ onBackToWork }) {
  return (
    <div className="cv-page-root">
      <div className="cv-page-container">

        {/* Top Header / Actions Bar */}
        <div className="cv-header-actions">
          <div className="cv-title-group">
            <button className="cv-back-btn" onClick={onBackToWork}>
              <ArrowLeft size={18} />
              <span>Back to Work</span>
            </button>
            <div className="cv-heading-wrap">
              <h1 className="cv-page-title">Curriculum Vitae</h1>
              {/* <span className="cv-tag">PDF DOCUMENT</span> */}
            </div>
          </div>

          <div className="cv-button-group">
            <a
              href={cvFile}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-action-btn secondary"
              title="Open PDF in new tab"
            >
              <ExternalLink size={16} />
              <span>Open in New Tab</span>
            </a>

            <a
              href={cvFile}
              download="Anish_Maji_CV.pdf"
              className="cv-action-btn primary"
              title="Download CV PDF"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* PDF Previewer Container */}
        <div className="cv-previewer-card">
          <div className="cv-previewer-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="cv-file-label">
              <FileText size={14} />
              <span>cv.pdf</span>
            </div>
          </div>

          <div className="cv-iframe-wrapper">
            <iframe
              src={`${cvFile}#toolbar=0&navpanes=0&scrollbar=1`}
              title="CV Document Preview"
              className="cv-pdf-iframe"
            />

            {/* Fallback for browsers that block PDF embeds */}
            <div className="cv-fallback-notice">
              <p>Unable to preview PDF directly in browser?</p>
              <a href={cvFile} download="Anish_Maji_CV.pdf" className="cv-fallback-link">
                Click here to download the CV PDF
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
