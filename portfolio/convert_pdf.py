import fitz  # PyMuPDF
import sys

def convert_pdf_to_png(pdf_path, output_png_path):
    print(f"Opening PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    
    if len(doc) == 0:
        print("Error: PDF has no pages.")
        sys.exit(1)
        
    page = doc[0]  # Get the first page
    
    # Render with 300 DPI for high quality (zoom factor = 300 / 72 = 4.167)
    zoom = 300 / 72
    matrix = fitz.Matrix(zoom, zoom)
    
    print("Rendering page to image...")
    pix = page.get_pixmap(matrix=matrix)
    
    print(f"Saving image to: {output_png_path}")
    pix.save(output_png_path)
    print("Conversion successful!")

if __name__ == "__main__":
    pdf = r"C:\Users\pavan\.gemini\antigravity\brain\f2ab68ee-5a56-444c-82f4-01132f5e7fd6\media__1783522863085.pdf"
    output = r"C:\Users\pavan\.gemini\antigravity\scratch\portfolio\internship.png"
    convert_pdf_to_png(pdf, output)
