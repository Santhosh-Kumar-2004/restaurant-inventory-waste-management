from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="OTP Auth Verification System(MVP)",
    description="A simple full-stack auction system MVP using OTP (One-Time Password) instead of passwords.",
    version="0.7.0",   
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)