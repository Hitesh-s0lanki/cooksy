# Cooksy

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)  
![License](https://img.shields.io/badge/license-MIT-blue)

An AI-powered sous-chef that turns your pantry into mouthwatering recipes—complete with step-by-step instructions, on-brand dish imagery, and curated YouTube video tutorials.

---

## 🔥 Features

- **Chat-Driven Interface**  
  Tell Cooksy what ingredients you have and get personalized recipe suggestions.
- **Requirement Check & Hallucination Guardrails**  
  Validates inputs and prompts for clarification if needed.
- **AI-Generated Recipes**
  - Titles & Descriptions
  - Ingredients & Steps
  - Dietary Tags & Nutritional Info (coming soon)
- **On-the-Fly Dish Imagery**  
  AI-generated banners preview your finished dish.
- **Embedded Video Tutorials**  
  Handpicked YouTube videos for step-by-step guidance.
- **Usage Tracking & Plans**  
  Free-tier token counter with seamless upgrade flow.
- **Visual Workflow**  
  React Flow–powered pipeline: Start → Customer Info → Requirement Check → Content Generation → Evaluation → Image & Video Delivery

---

## 🖼️ Images

<p align="center">
  <img src="/images/home.png"   alt="Home Screen"   width="600" />  
  <em>Home screen with chat prompt</em>
</p>

<p align="center">
  <img src="/images/agentic-workflow.png"   alt="Workflow Editor"   width="600" />  
  <em>Agentic workflow editor (React Flow)</em>
</p>

<p align="center">
  <img src="/images/dish.png"   alt="Dish Page"   width="600" />  
  <em>AI-generated recipe, image banner & video tutorials</em>
</p>

---

## 🏗️ Tech Stack

- **Frontend**

  - Next.js (App Router)
  - React & React Flow
  - Tailwind CSS

- **Backend & API**

  - Next.js API Routes
  - FastAPI (Python) for recipe generation
  - OpenAI GPT-4 API
  - YouTube Data API

- **DevOps**
  - Docker
  - Vercel / Render / AWS

---
