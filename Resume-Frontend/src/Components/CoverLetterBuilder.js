import React, { useState } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF
import '../styles/CoverLetterBuilder.css';

const CoverLetterBuilder = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');

  const handleDownload = () => {
    const coverLetter = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Address: ${address}

      Cover Letter:
      ${content}
    `;

    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cover-letter.txt';
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    
    // Title
    doc.text('Cover Letter', 10, 10);
    doc.setFontSize(12);
    
    // Add personal information
    doc.text(`Name: ${name}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Phone: ${phone}`, 10, 50);
    doc.text(`Address: ${address}`, 10, 60);
    doc.line(10, 65, 200, 65); // Horizontal line

    // Add cover letter content
    doc.setFontSize(14);
    doc.text('Dear Hiring Manager,', 10, 75);
    doc.setFontSize(12);
    doc.text(content, 10, 85);

    // Closing statement
    doc.text('Sincerely,', 10, 130);
    doc.text(name, 10, 140);

    // Save the PDF
    doc.save('cover-letter.pdf');
  };

  return (
    <div className="cover-letter-builder">
      <div className="input-section">
        <h1>Build Your Cover Letter</h1>
        <div className="input-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Cover Letter Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button className="download-button" onClick={handleDownload}>
          Download Cover Letter (TXT)
        </button>
        <button className="export-pdf-button" onClick={handleExportPDF}>
          Export as PDF
        </button>
      </div>
      <div className="letter-preview">
        <h2>Your Cover Letter Preview</h2>
        <div className="letter-content">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Dear Hiring Manager,</strong></p>
          <p>{content}</p>
          <p>Sincerely,</p>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
