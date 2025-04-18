// Script pour prendre des captures d'écran des projets
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Liste des projets avec leurs URLs
const projects = [
  { name: 'bloompetals', url: 'http://localhost/bloomPetals/' },
  { name: 'cv', url: 'http://localhost/cv/' },
  { name: 'fansite', url: 'http://localhost/fansite/' },
  { name: 'oclock', url: 'http://localhost/oclock/' },
  { name: 'app-favorites', url: 'http://localhost/app-favorites/' },
  { name: 'pixelplush', url: 'https://pixelplush.shop/' },
  { name: 'clicker', url: 'http://localhost/clicker/' },
  { name: 'memory', url: 'http://localhost/memory/' },
  { name: 'cinetech', url: 'http://localhost/cinetech/' }
];

// Dossier de destination pour les captures d'écran
const screenshotsDir = path.join(__dirname, 'img', 'portfolio', 'screenshots');

// Vérifier si le dossier existe, sinon le créer
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Fonction pour prendre les captures d'écran
async function takeScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  console.log('Navigateur lancé, début des captures d\'écran...');

  for (const project of projects) {
    try {
      console.log(`Capture d'écran pour ${project.name}...`);
      const page = await browser.newPage();
      
      // Définir une taille d'écran standard
      await page.setViewport({ width: 1280, height: 800 });
      
      // Naviguer vers l'URL du projet
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 60000 });
      
      // Prendre la capture d'écran
      await page.screenshot({ 
        path: path.join(screenshotsDir, `${project.name}.jpg`),
        type: 'jpeg',
        quality: 80,
        fullPage: false
      });
      
      await page.close();
      console.log(`Capture d'écran pour ${project.name} terminée.`);
    } catch (error) {
      console.error(`Erreur lors de la capture d'écran pour ${project.name}:`, error);
    }
  }

  await browser.close();
  console.log('Toutes les captures d\'écran ont été prises.');
}

// Exécuter la fonction
takeScreenshots().catch(console.error);
