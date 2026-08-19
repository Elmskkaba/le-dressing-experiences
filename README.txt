LE DRESSING EXPÉRIENCES — V8 FINALISATION
==========================================

Cette version consolide les refontes éditoriales V3 à V7 et ajoute une passe finale de qualité avant publication.

AMÉLIORATIONS V8
-----------------
- Images JPEG converties en WebP pour réduire le poids de chargement.
- Dimensions width/height réelles ajoutées/corrigées afin de limiter les sauts de mise en page (CLS).
- Préchargement des images hero utilisées en CSS sur Accueil, Univers et Excellence Edit.
- Priorité de chargement ajoutée aux portraits/visuels hero directs.
- Préconnexion Google Fonts harmonisée sur toutes les pages.
- Navigation mobile améliorée : aria-controls, boutons typés, restitution du focus à la fermeture.
- aria-current nettoyé pour ne désigner que la page courante.
- Métadonnées author et format-detection ajoutées.
- Page 404 personnalisée ajoutée.
- Fichier _headers ajouté pour Netlify : sécurité de base + cache long des assets.
- Formulaire Contact conservé en mailto tant qu’aucun backend/service d’envoi officiel n’est connecté.

PUBLICATION
-----------
Le dossier peut être publié tel quel sur Netlify ou un autre hébergement statique.

À AJOUTER LORSQUE LE DOMAINE OFFICIEL SERA CONNU
--------------------------------------------------
- URL canonical de chaque page
- og:url et image Open Graph absolue
- sitemap.xml avec les URL publiques définitives
- Search Console / Analytics si souhaité

À CONFIRMER AVANT MISE EN LIGNE PUBLIQUE
-----------------------------------------
- Adresse physique officielle
- Numéro WhatsApp officiel
- Éventuels réseaux sociaux officiels
- Solution d’envoi du formulaire si l’on veut éviter mailto
