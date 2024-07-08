# Birds of Prey Endpoints

GET /birds: Alle Greifvögel abrufen
GET /birds/:id: Einen spezifischen Greifvogel abrufen
POST /birds: Einen neuen Greifvogel hinzufügen
PUT /birds/:id: Einen vorhandenen Greifvogel aktualisieren
DELETE /birds/:id: Einen Greifvogel löschen
Beobachtungen:

GET /observations: Alle Beobachtungen abrufen
GET /observations/:id: Eine spezifische Beobachtung abrufen
POST /observations: Eine neue Beobachtung hinzufügen
PUT /observations/:id: Eine vorhandene Beobachtung aktualisieren
DELETE /observations/:id: Eine Beobachtung löschen
Benutzer:

GET /users: Alle Benutzer abrufen
GET /users/:id: Informationen zu einem spezifischen Benutzer abrufen
POST /users: Einen neuen Benutzer hinzufügen
PUT /users/:id: Informationen eines Benutzers aktualisieren
DELETE /users/:id: Einen Benutzer löschen
Falknereien (Spezielle Ressource für regionale Falknereien):

GET /falconries: Alle Falknereien abrufen
GET /falconries/:id: Informationen zu einer spezifischen Falknerei abrufen
POST /falconries: Eine neue Falknerei hinzufügen (nur für Admins oder spezielle Rollen)
PUT /falconries/:id: Informationen einer Falknerei aktualisieren (nur für Admins oder spezielle Rollen)
DELETE /falconries/:id: Eine Falknerei löschen (nur für Admins oder spezielle Rollen)
Authentifizierung und Autorisierung:

POST /auth/login: Benutzer anmelden
POST /auth/logout: Benutzer abmelden
POST /auth/register: Neuen Benutzer registrieren
Sonstige Routen:

GET /stats: Statistiken über Greifvogelarten oder Beobachtungen abrufen
GET /search: Suche nach Greifvögeln oder Beobachtungen basierend auf bestimmten Kriterien
GET /health: Status der API überprüfen (z. B. Server-Status, Datenbankverbindung)

# Further Implementations:

- Dataschemas
- Security
- Roles
- Validation
