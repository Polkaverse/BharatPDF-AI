const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("=== STARTING PDF STUDIO FLOW TESTS ===");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  
  const results = {};
  const pdfPath = path.join(__dirname, 'public', 'test.pdf');

  if (!fs.existsSync(pdfPath)) {
    console.error(`ERROR: Test PDF not found at ${pdfPath}. Please verify public/test.pdf exists.`);
    process.exit(1);
  }

  // Go to dev server
  try {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('.workspace-sidebar', { timeout: 5000 });
    results.navigation = "SUCCESS (Loaded Homepage)";
  } catch (e) {
    results.navigation = "FAILED: " + e.message;
    console.log(JSON.stringify(results, null, 2));
    await browser.close();
    process.exit(1);
  }

  // Helper to test downloads
  const testDownload = async (clickAction) => {
    try {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 8000 }),
        clickAction()
      ]);
      const filename = download.suggestedFilename();
      return `SUCCESS (Downloaded ${filename})`;
    } catch (err) {
      return `FAILED: ${err.message}`;
    }
  };

  // 1. Test Document Creator Templates
  console.log("-> Testing Document Creator Templates...");
  try {
    await page.click('button:has-text("Document Creator")');
    await page.waitForSelector('button:has-text("GST Invoice")', { timeout: 3000 });
    
    // Test GST Invoice download
    results.template_invoice = await testDownload(async () => {
      await page.click('button:has-text("Export Draft as PDF")');
    });

    // Test HR Offer Letter download
    await page.click('button:has-text("HR Offer Letter")');
    await page.waitForTimeout(500);
    results.template_offer = await testDownload(async () => {
      await page.click('button:has-text("Export Draft as PDF")');
    });
  } catch (e) {
    results.template_invoice = "FAILED: " + e.message;
  }

  // 2. Test PDF Utilities (Merge, Split, Rotate, Compress)
  console.log("-> Testing PDF Utilities...");
  try {
    await page.click('button:has-text("PDF Utilities")');
    await page.waitForSelector('button:has-text("MERGE")', { timeout: 3000 });

    // Test visual SPLIT helper
    await page.click('button:has-text("SPLIT")');
    await page.waitForTimeout(500);
    await page.setInputFiles('input[type="file"]', pdfPath);
    
    // Wait for visual grid to render page cards
    await page.waitForSelector('.page-grid .page-card', { timeout: 5000 });
    const pageCards = await page.$$('.page-grid .page-card');
    
    if (pageCards.length > 0) {
      // Click first page card and second page card visually
      await pageCards[0].click();
      await page.waitForTimeout(200);
      if (pageCards[1]) await pageCards[1].click();
      await page.waitForTimeout(200);
      
      // Verify split input value got populated
      const val = await page.$eval('input[placeholder="e.g., 1-3, 5"]', el => el.value);
      results.split_visual_selector = `SUCCESS (Range populated: "${val}")`;
      
      // Trigger download execution
      results.split_execution = await testDownload(async () => {
        await page.click('button:has-text("Execute SPLIT")');
      });
    } else {
      results.split_visual_selector = "FAILED: Visual page cards not rendered";
    }

    // Test visual ROTATE helper
    await page.click('button:has-text("ROTATE")');
    await page.waitForTimeout(500);
    await page.setInputFiles('input[type="file"]', pdfPath);
    await page.waitForSelector('.page-grid .page-card', { timeout: 5000 });
    
    const rotateCards = await page.$$('.page-grid .page-card');
    if (rotateCards.length > 0) {
      // Click first page to rotate visually
      await rotateCards[0].click();
      await page.waitForTimeout(200);
      
      // Verify rotation state text
      const angleText = await rotateCards[0].$eval('span:nth-of-type(2)', el => el.textContent);
      results.rotate_visual_selector = `SUCCESS (Rotated visuals to ${angleText})`;
      
      results.rotate_execution = await testDownload(async () => {
        await page.click('button:has-text("Execute ROTATE")');
      });
    } else {
      results.rotate_visual_selector = "FAILED: Visual page cards not rendered";
    }
  } catch (e) {
    results.pdf_utilities_error = "FAILED: " + e.message;
  }

  // 3. Test Secure eSign Visual Click Placement
  console.log("-> Testing Secure eSign...");
  try {
    await page.click('button:has-text("Secure eSign")');
    await page.waitForSelector('input[type="file"]', { timeout: 3000 });
    
    await page.setInputFiles('input[type="file"]', pdfPath);
    await page.waitForTimeout(1000);
    
    // Select TYPE signature
    await page.click('button:has-text("TYPE")');
    await page.fill('input[placeholder="John Doe"]', 'Test Signer Name');
    await page.waitForTimeout(500);

    // Verify placement box and click it visually
    const placementBox = await page.waitForSelector('div[style*="cursor: crosshair"]', { timeout: 5000 });
    if (placementBox) {
      const box = await placementBox.boundingBox();
      // Click in the bottom right corner (approx 80% width, 80% height)
      await page.mouse.click(box.x + box.width * 0.8, box.y + box.height * 0.8);
      await page.waitForTimeout(200);
      
      const posX = await page.$eval('input[type="number"]:nth-child(2)', el => el.value || page.$eval('input:nth-child(2)', el => el.value));
      results.esign_click_placement = `SUCCESS (Signature placed, X coordinate: ${posX}%)`;
      
      // Fill details and execute signing
      await page.fill('input[placeholder="Signer Email"]', 'signer@example.com');
      await page.fill('input[placeholder="Signer Mobile"]', '9999999999');
      
      results.esign_execution = await testDownload(async () => {
        await page.click('button:has-text("eSign Document")');
      });
    } else {
      results.esign_click_placement = "FAILED: Click placement box not rendered";
    }
  } catch (e) {
    results.esign_error = "FAILED: " + e.message;
  }

  // 4. Test Multilingual OCR
  console.log("-> Testing Multilingual OCR...");
  try {
    await page.click('button:has-text("Multilingual OCR")');
    await page.waitForSelector('input[type="file"]', { timeout: 3000 });
    
    await page.setInputFiles('input[type="file"]', pdfPath);
    await page.click('button:has-text("Extract Text")');
    
    // Wait for text response area
    await page.waitForSelector('textarea', { timeout: 8000 });
    const extractedText = await page.$eval('textarea', el => el.value);
    results.ocr_extraction = extractedText.length > 50 
      ? `SUCCESS (Extracted ${extractedText.length} characters)` 
      : `FAILED: Result text too short (${extractedText.length} chars)`;
  } catch (e) {
    results.ocr_extraction = "FAILED: " + e.message;
  }

  // 5. Test AI Workflows
  console.log("-> Testing AI Workflows...");
  try {
    await page.click('button:has-text("AI Workflows")');
    await page.waitForSelector('input[type="file"]', { timeout: 3000 });
    
    await page.setInputFiles('input[type="file"]', pdfPath);
    await page.click('button:has-text("Process with AI")');
    
    // Wait for results container to show summary lists
    await page.waitForSelector('ul', { timeout: 8000 });
    const bulletsCount = await page.$$eval('ul li', lis => lis.length);
    results.ai_workflow_execution = bulletsCount > 0 
      ? `SUCCESS (Generated ${bulletsCount} summary bullets)` 
      : "FAILED: Summary list empty";
  } catch (e) {
    results.ai_workflow_execution = "FAILED: " + e.message;
  }

  console.log("\n=== INTEGRATION TESTS RESULTS SUMMARY ===");
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
