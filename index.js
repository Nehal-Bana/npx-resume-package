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
  email: "nehal@example.com",
  summary: "Concise summary describing your strongest skills and what you bring to the role.",
  skills: ["Java", "Spring Boot", "SQL", "Docker", "Kubernetes", "DSA"],
  experience: [
    {
      company: "Qspear Consultancy Services Pvt. Ltd.",
      role: "Java Developer Intern",
      period: "2023",
      bullets: [
        "Implemented REST endpoints and unit tests.",
        "Optimized database queries to reduce latency by X%."
      ]
    },
    {
      company: "Company B",
      role: "Software Engineer",
      period: "2024 - Present",
      bullets: [
        "Built microservices using Spring Boot.",
        "Designed CI/CD pipelines."
      ]
    }
  ],
  education: [
    { degree: "B.Tech Computer Science", institution: "ABC University", year: "2020" }
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
