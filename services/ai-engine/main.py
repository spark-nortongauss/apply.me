from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import List, Dict
import numpy as np

app = FastAPI(title="Pathfinder AI Engine", version="1.0.0")


class CVAnalysisRequest(BaseModel):
    text: str
    goals: List[str] = Field(default_factory=list)


class ResumeGenerationRequest(BaseModel):
    profile: Dict
    target: str
    variant: str = "corporate"


class CoverLetterRequest(BaseModel):
    profile: Dict
    job: Dict


class JobFitRequest(BaseModel):
    career_vector: List[float]
    job_vector: List[float]


class RecommendationsRequest(BaseModel):
    missing_skills: List[str]


def cosine_similarity(a: List[float], b: List[float]) -> float:
    va, vb = np.array(a), np.array(b)
    if np.linalg.norm(va) == 0 or np.linalg.norm(vb) == 0:
        return 0.0
    return float(np.dot(va, vb) / (np.linalg.norm(va) * np.linalg.norm(vb)))


@app.post("/analyze-cv")
def analyze_cv(payload: CVAnalysisRequest):
    inferred_skills = ["Strategic Communication", "Cross-functional Leadership", "Data-driven Decisioning"]
    career_vector = [0.81, 0.77, 0.68, 0.74, 0.86, 0.71, 0.64, 0.79]
    return {
        "summary": "High-growth leadership profile with strong product and execution signals.",
        "skills": inferred_skills,
        "career_vector": career_vector,
        "salary_band": {"min": 150000, "max": 210000, "currency": "USD"},
        "recommendations": [
            "Quantify outcomes in each experience bullet.",
            "Highlight scope ownership and team size managed.",
            "Add portfolio artifacts tied to business impact."
        ]
    }


@app.post("/generate-resume")
def generate_resume(payload: ResumeGenerationRequest):
    return {
        "variant": payload.variant,
        "positioning_statement": f"{payload.target} leader who translates strategy into measurable outcomes.",
        "bullets": [
            "Scaled product adoption by 43% across enterprise segment in 12 months.",
            "Reduced churn by 18% via data-informed lifecycle experimentation.",
            "Led cross-functional squad of 11 across product, design, and engineering."
        ]
    }


@app.post("/generate-cover-letter")
def generate_cover_letter(payload: CoverLetterRequest):
    company = payload.job.get("company", "your company")
    role = payload.job.get("title", "the role")
    return {
        "cover_letter": f"I am excited to apply for {role} at {company}. My background in building high-impact teams and measurable product growth aligns strongly with your mission."
    }


@app.post("/job-fit-score")
def job_fit_score(payload: JobFitRequest):
    similarity = cosine_similarity(payload.career_vector, payload.job_vector)
    fit_score = round(similarity * 100, 2)
    return {
        "fit_score": fit_score,
        "success_probability": round(min(0.98, similarity * 1.08), 2),
        "hiring_probability": round(min(0.95, similarity * 0.99), 2),
        "explanations": [
            "Strong leadership and domain overlap.",
            "Moderate gap in infrastructure architecture depth."
        ]
    }


@app.post("/career-recommendations")
def career_recommendations(payload: RecommendationsRequest):
    return {
        "learning_paths": [
            {
                "skill": skill,
                "actions": [
                    f"Complete a practical certification in {skill}",
                    f"Build a portfolio project demonstrating {skill}",
                    f"Publish a case study proving applied {skill} outcomes"
                ]
            }
            for skill in payload.missing_skills
        ]
    }
