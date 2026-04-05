# 🩺 Personalized Healthcare AI

Welcome to the **Personalized Healthcare AI** system! This project leverages **Machine Learning** to help you understand your core health metrics and provides you with dynamic, actionable advice to help you get active, stay fit, and reduce overall stress. 

**🌐 Check out the Live App:** [https://personalized-healthcare.netlify.app/](https://personalized-healthcare.netlify.app/)

## 🌟 How It Works

Instead of providing generic medical advice, this application acts as your data-driven health advisor:
1. **Input Your Vitals**: Enter your current physical state, including your **Age**, **Height**, **Weight**, **Sleep Schedule**, **Activity Levels**, and **Subjective Stress Level**.
2. **Instant BMI Calculation**: The system automatically computes your active Body Mass Index (BMI).
3. **Machine Learning Pipeline**: Your exact metrics are ingested by a sophisticated **Decision Tree Algorithm** that has been trained on a sprawling medical/lifestyle dataset. 
4. **Actionable Output**: Rather than a simple summary, the application responds with a highly-tailored "Actionable Advice" checklist. If your sleep is too low, it instructs you on circadian rhythms; if your BMI is elevated, it provides exact cardiovascular goals.

## 🛠️ Architecture & Under the Hood

This project involves an end-to-end Machine Learning pipeline optimized for zero-latency front-end deployment:
- **Jupyter Notebook (`model_training.ipynb`)**: Structures the healthcare datasets and trains our `Scikit-Learn` classification model.
- **`m2cgen` Model Transpilation**: The trained Python-based model is transported completely into JavaScript logic (`recommendation_model.js`). This architecture means **all sophisticated ML predictions run blazingly fast in the browser with zero backend server required**.
- **Vite + React Frontend**: The graphical interface (`healthcare-app/`) features an elegant, responsive Dark/Glassmorphism design scheme crafted entirely with Vanilla CSS. 

## 🚀 Getting Started Locally

If you want to run this application to check your own health and start getting fit:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone this repository to your local machine.
2. Navigate into the web application folder:
   ```bash
   cd healthcare-app
   ```
3. Install the required web dependencies:
   ```bash
   npm install
   ```
4. Start the live-reloading development server:
   ```bash
   npm run dev
   ```
5. Click on the `http://localhost:5173/` link generated in your terminal to view the app!

---
*Take control of your health with data. Start your fitness journey today!* 💪
