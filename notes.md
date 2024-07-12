# Birds of Prey Endpoints

### Greifvögel:

GET /raptors: Alle Greifvögel abrufen
GET /raptors/:id: Einen spezifischen Greifvogel abrufen

POST /raptors: Einen neuen Greifvogel hinzufügen
PUT /raptors/:id: Einen vorhandenen Greifvogel aktualisieren
DELETE /raptors/:id: Einen Greifvogel löschen

#### Weitere Request-Optionen im Bereich Greifvögel:

GET /raptors/family: Eine bestimmte Greifvogelfamilie abrufen
GET /raptors/family/genus: Eine bestimmte Gattung einer Familie abrufen
GET /raptors/family/genus/species: Eine bestimmte Spezies einer Gattung abrufen

### Verbreitungsgebiet

GET /range: Verbreitungsgebiete
GET /range/raptors: Greifvögel nach Verbreitungsgebieten

### Falknereien:

GET /falconries: Alle Falknereien abrufen
GET /falconries/:id: Informationen zu einer spezifischen Falknerei abrufen
POST /falconries: Eine neue Falknerei hinzufügen (nur für Admins oder spezielle Rollen)
PUT /falconries/:id: Informationen einer Falknerei aktualisieren (nur für Admins oder spezielle Rollen)
DELETE /falconries/:id: Eine Falknerei löschen (nur für Admins oder spezielle Rollen)

### Benutzer:

GET /users: Alle Benutzer abrufen
GET /users/:id: Informationen zu einem spezifischen Benutzer abrufen
POST /users: Einen neuen Benutzer hinzufügen
PUT /users/:id: Informationen eines Benutzers aktualisieren
DELETE /users/:id: Einen Benutzer löschen

### Authentifizierung und Autorisierung:

POST /auth/login: Benutzer anmelden
POST /auth/logout: Benutzer abmelden
POST /auth/register: Neuen Benutzer registrieren

### Beobachtungen:

GET /observations: Alle Beobachtungen abrufen
GET /observations/:id: Eine spezifische Beobachtung abrufen
POST /observations: Eine neue Beobachtung hinzufügen
PUT /observations/:id: Eine vorhandene Beobachtung aktualisieren
DELETE /observations/:id: Eine Beobachtung löschen

### Sonstige Routen:

GET /stats: Statistiken über Greifvogelarten oder Beobachtungen abrufen
GET /search: Suche nach Greifvögeln oder Beobachtungen basierend auf bestimmten Kriterien
GET /health: Status der API überprüfen (z. B. Server-Status, Datenbankverbindung)

# Further Implementations:

- Dataschemas
- Security
- Roles
- Validation

# Learnings

### create() or insertMany()?

- Use create when you need validation and middleware execution and performance is not the main priority. It is ideal for scenarios where you want to insert a few documents at once and perform additional actions before or after saving.
- Use insertMany if you need high performance when inserting large amounts of documents and can skip validation and middleware execution. It is especially useful for bulk insertions where speed is critical.
