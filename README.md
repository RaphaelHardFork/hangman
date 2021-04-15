# Bienvenue dans le jeu du pendu  
Pour utiliser le programme : `node main.js`  
*Puis c'est partie !*

**Fonctionnalités :** 
- mise à jour des scores (mise en ordre)
- sélection du joueur
- possibilité de demander un indice
- deux langues pour le choix du mot
- trois longueur de mots différentes
--------  
**Calcul du score :**  

| Longueur du mot | 3 et moins |4|5|6|7|8|9 et plus|
| ----------- | ----------- |----------- |----------- |----------- |----------- |----------- |----------- |
| Multiplicateur **avec** indice | 1 |1 |1 |1 |1.125 |1.25 |1.5 |
| Multiplicateur **sans** indice | 1.5 |1.25 |1.125 |1 |1.25 |1.5 |1.75 |

-----------
**Attention** : 
- certain mots (notamment en français) contiennent des espaces. 
- le programme est strict sur les accents (``é !== e``)