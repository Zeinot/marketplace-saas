$pptxPath = "C:\Users\Zeinot\Downloads\marketplace-saas\output\Presentation_Cache_Redis.pptx"
$pdfPath = "C:\Users\Zeinot\Downloads\marketplace-saas\output\Presentation_Cache_Redis.pdf"

try {
    $powerpoint = New-Object -ComObject PowerPoint.Application
    $powerpoint.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
    
    $presentation = $powerpoint.Presentations.Open($pptxPath)
    
    $presentation.SaveAs($pdfPath, 32)  # 32 = PDF format
    
    $presentation.Close()
    $powerpoint.Quit()
    
    Write-Host "PDF generated successfully: $pdfPath"
} catch {
    Write-Error "Failed to convert PPTX to PDF: $_"
}
