#!/usr/bin/env node
'use strict';

/*
  Minimal resume CLI (no external deps).
  Usage:
    node index.js
    node index.js --json      # prints JSON for programmatic use
*/

const args = process.argv.slice(2);

const resume = {
  name: "Nehal Bana",
  title: "Java Software Engineer",
  location: "Bangalore, India",
  linkedin: "https://linkedin.com/in/nehal-bana",
  email: "nehalbana27@gmail.com",
  summary: "Experienced Java Backend Developer with expertise in Spring Boot, Kafka, Redis, AWS, and microservices architecture. Proven track record of designing and deploying scalable, secure, and resilient systems, including AI-driven applications. Strong background in Core Java, system design, REST APIs, SQL/MySQL, and NoSQL. Enthusiastic about cloud technologies, continuous integration, and delivering high-quality code in agile environments.",
  skills: ["Java", "Spring Boot", "SQL", "Docker", "Kubernetes", "DSA", "NodeJs", "Microservises", "MySQL"],
  experience: [
     {
      company: "AccelGrowth Technology pvt. ltd.",
      role: "Java Developer",
      period: "2024 - Present",
      bullets: [
         "Developed a scalable resume processing system for handling uploads, AI summaries, and recruiter notifications, ensuring horizontal scalability.",
      "Designed a robust Java-based upload service with file validation, temporary storage, Redis caching, and S3 persistent storage.",
      "Built a document processing service in Java integrating with Kafka for efficient text extraction from various document formats and robust job distribution.",
      "Implemented Kafka-based asynchronous communication between microservices to generate evaluation reports and send notifications via email.",
      "Created an AI summarization service using Java integrated with the Ollama model to analyze resumes and job descriptions, generating personalized PDF scorecards and intelligent candidate-job match insights using a CV parser class."
      ]
    },
    {
      company: "Qspear Consultancy Services Pvt. Ltd.",
      role: "Java Developer Trainee",
      period: "2023",
      bullets: [
        "Developed and implemented comprehensive software development standards to enhance code quality and team collaboration.",
      "Implemented a priming solution to eliminate latency spikes caused by lazy initialization of beans and configuration loading, improving customer experience.",
      "Designed and implemented monitoring and alerting systems for legacy applications to ensure reliability and proactive issue resolution."
    ]
    },

  ],
  education: [
    { degree: "B.Tech Computer Science", institution: "Dr. A.P.J Abdul Kalam Technical University", year: "2020" }
  ]
};

// Allow machine-readable output
if (args.includes('--json') || args.includes('-j')) {
  console.log(JSON.stringify(resume, null, 2));
  process.exit(0);
}

// Helpers
const width = Math.min(process.stdout.columns || 80, 80);

function wrap(text, w) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const word of words) {
    if ((cur + ' ' + word).trim().length > w) {
      lines.push(cur.trim());
      cur = word;
    } else {
      cur += (cur ? ' ' : '') + word;
    }
  }
  if (cur) lines.push(cur.trim());
  return lines.join('\n');
}

function center(text, w) {
  if (text.length >= w) return text;
  const pad = Math.floor((w - text.length) / 2);
  return ' '.repeat(pad) + text;
}

function renderExperience(exp) {
  return exp.map(e => {
    const head = `${e.company} — ${e.role} (${e.period})`;
    const bullets = e.bullets.map(b => '   • ' + b).join('\n');
    return `${head}\n${bullets}`;
  }).join('\n\n');
}

// Build output
let out = '';
out += '='.repeat(width) + '\n';
out += center(resume.name, width) + '\n';
out += center(resume.title, width) + '\n';
out += '='.repeat(width) + '\n\n';

out += `Location: ${resume.location}\nLinkedIn: ${resume.linkedin}\nEmail: ${resume.email}\n\n`;
out += 'Summary\n-------\n' + wrap(resume.summary, width) + '\n\n';
out += 'Skills\n------\n' + resume.skills.join(', ') + '\n\n';
out += 'Experience\n----------\n' + renderExperience(resume.experience) + '\n\n';
out += 'Education\n---------\n' + resume.education.map(e => `${e.degree}, ${e.institution} (${e.year})`).join('\n') + '\n\n';
out += '='.repeat(width) + '\n';

console.log(out);
