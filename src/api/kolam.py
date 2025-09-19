from fastapi import APIRouter, UploadFile, File, HTTPException, status
from pathlib import Path
import uuid
import os

from src.schemas import (
    KolamGenerationRequest,
    KolamGenerationResponse,
    KnowledgeRequest,
    KnowledgeResponse,
    PredictionResponse
)

from src.services.ai.detection_service import model, classes, predict_image
from src.services.ai.generation_service import query_knowledge_and_generate
from src.core.file_security import FileValidator, scan_file_for_malware
from src.core.config import settings


router = APIRouter(prefix="/kolam", tags=["Kolam"])


# Hard-coded mapping of class → design principle
DESIGN_PRINCIPLES = {
    "alpana": (
        "Alpana is a traditional Bengali floor art drawn freehand with rice paste. "
        "Its designs often include floral motifs, geometric shapes, and auspicious symbols. "
        "The principle emphasizes fluidity, symmetry, and spiritual intent, symbolizing prosperity and inviting positive energy."
    ),
    "jhoti": (
        "Jhoti is an Odia folk art created with rice paste on walls and floors, usually during festivals and rituals. "
        "The patterns are repetitive and symmetrical, focusing on lotus, conch, and floral forms. "
        "Its principle lies in freehand linear symmetry and repetition, representing devotion and auspiciousness."
    ),
    "kolam": (
        "Kolam is a South Indian geometric art form drawn daily with rice flour, often using dot grids. "
        "It emphasizes mathematical precision, symmetry, and continuity through intricate line patterns. "
        "The principle reflects infinity, prosperity, and harmony with nature, as rice also feeds small creatures."
    ),
    "mandana": (
        "Mandana is a tribal and folk art from Rajasthan and Madhya Pradesh, drawn with chalk, lime, or rice paste on red clay surfaces. "
        "It emphasizes strong geometric symmetry, balance, and sacred symbolism such as animals, plants, and deities. "
        "The principle centers on protection, prosperity, and marking sacred spaces in homes and courtyards."
    ),
    "muggu": (
        "Muggu, practiced in Andhra Pradesh and Telangana, is closely related to Kolam and drawn with rice flour or chalk powder. "
        "Its principle is based on dot-grid geometry, with symmetrical lines and curves connecting the dots. "
        "Muggu symbolizes auspicious beginnings, mathematical beauty, and the welcoming of prosperity."
    ),
    "phulkari": (
        "Phulkari, meaning 'flower work', is a Punjabi embroidery art created with vibrant silk threads on coarse fabric. "
        "The designs emphasize geometric arrangements of floral motifs and color balance across the fabric. "
        "Its principle lies in symmetry, repetition, and cultural storytelling, with each piece representing blessings, emotions, and heritage."
    ),
    "pookalam": (
        "Pookalam is a floral carpet tradition from Kerala, made during the Onam festival using concentric layers of colorful flowers. "
        "Its design principle is radial symmetry, with patterns growing outward like a mandala. "
        "It represents harmony, community participation, and celebration of abundance and unity."
    ),
    "rangoli": (
        "Rangoli is a pan-Indian decorative art form made with colored powders, flowers, or grains on the floor. "
        "It emphasizes symmetry, rhythm, and vibrant color harmony, often inspired by cultural motifs and deities. "
        "Its principle lies in balance and auspiciousness, welcoming prosperity and joy into the home."
    ),
    "thangka": (
        "Thangka is a Tibetan Buddhist painting on cloth, used as a teaching and meditation tool. "
        "Its designs follow strict iconographic rules and geometric grids, ensuring divine proportions and symmetry. "
        "The principle reflects spiritual order, meditation, and balance, serving as a bridge between artistic beauty and sacred symbolism."
    )
}



@router.post("/predict", response_model=PredictionResponse)
async def predict_kolam(file: UploadFile = File(...)):
    """
    Upload an image of a Kolam and get:
    - Highest scored class
    - Related design principle
    """
    try:
        # Validate file before processing
        FileValidator.validate_file(file)
        
        # Create secure upload directory
        uploads_dir = Path(settings.upload_dir)
        uploads_dir.mkdir(parents=True, exist_ok=True)

        # Generate secure file path
        temp_path = FileValidator.create_secure_upload_path(uploads_dir, file.filename)
        
        # Save uploaded file
        with temp_path.open("wb") as f:
            content = await file.read()
            f.write(content)
        
        # Validate file content
        FileValidator.validate_file_content(temp_path)
        
        # Scan for malware
        if not scan_file_for_malware(temp_path):
            temp_path.unlink()  # Delete suspicious file
            raise HTTPException(
                status_code=400, 
                detail="File failed security scan"
            )

        # Predict top-1 class
        preds = predict_image(model, temp_path, classes, topk=1)
        label, conf = preds[0]

        # Map to design principle
        principle = DESIGN_PRINCIPLES.get(
            label.lower(), "No design principle found for this class."
        )
        
        # Clean up temporary file
        try:
            temp_path.unlink()
        except Exception:
            pass  # File cleanup is best effort

        return PredictionResponse(
            label=label,
            confidence=conf,
            design_principle=principle,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Internal server error occurred during image processing"
        )

# ---------- Knowledge + Generation ----------
@router.post("/knowledge", response_model=KnowledgeResponse)
async def kolam_knowledge(req: KnowledgeRequest):
    """
    Query Kolam knowledge base and optionally generate an image.
    """
    try:
        explanation, image_base64 = query_knowledge_and_generate(
            req.query, req.generate_image
        )
        return KnowledgeResponse(explanation=explanation, image_base64=image_base64)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
