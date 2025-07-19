/* eslint-disable style/key-spacing */
import type { Context } from "hono";

import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

// src/routes/home/home.index.ts
import { createRouter } from "@/lib/create-app";

const router = createRouter();

// Helper function to escape HTML
function escapeHtml(str: string) {
  return str.replace(/[&<>'"]/g, tag => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;",
  }[tag] || tag));
}

// Data
const features = [
  { icon: "⚡", text: "Serveur Hono.js ultra-rapide" },
  { icon: "🚀", text: "Déployable partout - serveur et serverless" },
  { icon: "🔐", text: "Système d'authentification intégré" },
  { icon: "🗝️", text: "Gestion des clés API" },
  { icon: "🛒", text: "API produits complète" },
  { icon: "👥", text: "Gestion des rôles utilisateurs" },
  { icon: "📝", text: "Documentation OpenAPI avec Scalar" },
  { icon: "🔁", text: "Prêt pour l'Edge avec Cloudflare Workers" },
];

const gettingStarted = [
  "Cloner le dépôt",
  "Lancer `pnpm install`",
  "Configurer votre fichier .env (copier .env.example)",
  "Ajouter toutes les variables, notamment l'URL de la base de données et la clé RESEND API",
  "Lancer `npx prisma migrate dev --name init` pour initialiser la base de données",
  "Lancer `npx prisma db seed && pnpm dev`",
  "Ouvrir `/scalar` pour voir la documentation API",
];

const deploymentOptions = [
  {
    title: "Railway | Render (Serveur Node.js)",
    link:"https://hono-api-starterkit-production.up.railway.app",
    steps: [
      "Aucun changement nécessaire : `git clone url du repo`",
      "Lancer `pnpm install`",
      "Ajouter les variables : `créer .env à partir de .env.example`",
      "Tester en local : seed puis pnpm dev",
      "Pousser sur github et déployer sur Railway",
    ],
    note: "Railway peut aussi fournir une URL de base de données Postgres à la place de Neon.",
  },
  {
    title: "Vercel Edge Runtime (serverless)",
    link:"https://hono-api-starterkit-vercel-edge.vercel.app",
    steps: [
      "Deux possibilités :",
      "1. Cloner le kit déjà configuré",
      "2. Suivre les étapes du fichier readme pour démarrer",
    ],
    note: "Vous pouvez tester en local avec pnpm run vercel:dev",
  },
  {
    title: "Cloudflare",
    link:"https://hono-starter-kit.gmukejohnbaptist.workers.dev/",
    steps: [
      "Beaucoup de changements, il faut utiliser le starter kit",
      "Installer Wrangler : `npm install -g wrangler`",
      "S'authentifier : `wrangler login`",
      "Configurer wrangler.toml",
      "Définir les variables d'environnement",
      "Déployer avec `wrangler publish`",
    ],
    note: "Fonctionne parfaitement avec Cloudflare Workers et Pages.",
  },
];

// HTML Route
router.get("/", (c: Context) => {
  // Generate feature HTML
  const featuresHtml = features.map(feature => `
    <li class="flex items-center bg-white p-4 rounded-lg shadow-sm">
      <span class="feature-icon">${escapeHtml(feature.icon)}</span>
      <span>${escapeHtml(feature.text)}</span>
    </li>
  `).join("");

  // Generate getting started HTML
  const gettingStartedHtml = gettingStarted.map(step => `
    <li>${escapeHtml(step)}</li>
  `).join("");

  // Generate deployment options HTML
  const deploymentHtml = deploymentOptions.map(option => `
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <a href=${option.link} class="text-xl font-medium mb-3 text-indigo-600 block">${escapeHtml(option.title)}</a>
      <ol class="list-decimal pl-5 space-y-1 mb-3">
        ${option.steps.map(step => `<li class="text-sm">${escapeHtml(step)}</li>`).join("")}
      </ol>
      <p class="text-sm text-gray-500">${escapeHtml(option.note)}</p>
    </div>
  `).join("");

  const aboutHonoHtml = `
    <section class="mb-12 bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">🌟 À propos de Hono</h2>
      <div class="space-y-4">
        <p class="text-gray-700">
          Hono est un framework web léger, rapide et flexible, conçu pour les applications web et API modernes.
        </p>
        <h3 class="text-xl font-medium text-indigo-600">Pourquoi choisir Hono plutôt qu'Express ?</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Déploiement universel :</strong> Le même code fonctionne sur Node.js, serverless, edge, etc.</li>
          <li><strong>Ultra-rapide :</strong> Optimisé pour la performance avec un minimum de surcoût</li>
          <li><strong>Fonctionnalités modernes :</strong> Support natif de WebSockets, WebAssembly et edge computing</li>
          <li><strong>TypeScript First :</strong> Excellente prise en charge de TypeScript dès l'installation</li>
          <li><strong>Écosystème de middlewares :</strong> Compatible avec les middlewares Express tout en étant plus léger</li>
          <li><strong>Edge Native :</strong> Conçu pour fonctionner efficacement sur les plateformes edge comme Cloudflare Workers</li>
          <li><strong>Zéro dépendance :</strong> Empreinte minimale pour des déploiements plus rapides</li>
        </ul>
        <div class="mt-4 p-4 bg-indigo-50 rounded-lg">
          <p class="text-indigo-700">
            <strong>Motivation principale :</strong> Hono a été créé pour combler le fossé entre les frameworks serveurs traditionnels
            et le edge computing moderne, offrant aux développeurs une façon unifiée de construire des applications pouvant tourner
            partout sans changer de code.
          </p>
        </div>
      </div>
    </section>
  `;

  const htmlContent = `<!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hono API Starter Kit - Vercel Edge</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          .feature-icon { width: 24px; height: 24px; margin-right: 8px; }
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 py-12">
          <header class="mb-12 text-center">
            <h1 class="text-4xl font-bold text-indigo-700 mb-4">Hono API Starter Kit - Vercel Edge</h1>
            <p class="text-xl text-gray-600">Un starter API robuste et prêt pour la production, construit avec Hono, Prisma et OpenAPI</p>
          </header>

          <!-- Features Section -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-4 text-gray-800">✨ Fonctionnalités</h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${featuresHtml}
            </ul>
          </section>

          <!-- Getting Started Section -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-4 text-gray-800">🚀 Pour bien démarrer</h2>
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <ol class="list-decimal pl-5 space-y-2">
                ${gettingStartedHtml}
              </ol>
            </div>
          </section>

          <!-- Deployment Section -->
          <section class="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <h2 class="text-2xl font-semibold mb-4 text-gray-800 md:col-span-3">☁️ Déploiement</h2>
            ${deploymentHtml}
          </section>

          <!-- New About Hono Section -->
          ${aboutHonoHtml}

          <footer class="text-center text-gray-500 text-sm">
            <p>Visitez <a href="/scalar" class="text-indigo-600 hover:underline">/API Docs</a> pour la documentation API</p>
            <p class="mt-2">Ce starter kit représente ~40-60 heures de développement</p>
          </footer>
        </div>
      </body>
    </html>`;

  return c.html(htmlContent);
});
// Separate the OpenAPI handler to ensure proper typing
function openApiHandler(c: Context) {
  const accept = c.req.header("Accept");

  if (accept?.includes("text/html")) {
    // Return a proper redirect response
    return c.redirect("/", HttpStatusCodes.MOVED_TEMPORARILY);
  }

  // Explicitly return the JSON response
  return c.json({
    message: "Bienvenue sur le kit de démarrage Product API",
    html: "Visitez cette route dans un navigateur pour une belle interface HTML",
  });
}

// Keep the OpenAPI route for API clients
router.openapi(
  createRoute({
    tags: ["Home"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          message: z.string(),
          html: z.string().optional().describe("Visit this route in a browser for HTML response"),
        }),
        "API Home",
      ),
      [HttpStatusCodes.MOVED_TEMPORARILY]: {
        description: "Redirects to HTML version when Accept header includes text/html",
        headers: z.object({
          Location: z.string().url(),
        }),
      },
    },
  }),
  openApiHandler,
);

export default router;
