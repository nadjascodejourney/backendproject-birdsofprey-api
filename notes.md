# Birds of Prey Endpoints

## Raptors:

GET /raptors: Show all raptors
GET /raptors/:id: Show a specific raptor

POST /raptors: Add a new raptor (or more)
DELETE /raptors/:id: Delete an existing raptor
PATCH /raptors/:id: Update an existing raptor

### More Request-Options for Raptors:

GET /raptors/family: Show a raptor family
GET /raptors/family/genus: Show raptor genera
GET /raptors/family/genus/species: Show raptor species

## Falknereien:

GET /falconries: Show all Falconries
GET /falconries/:id: Show specific Falconries
POST /falconries: Add a new Falconry (only authorized users)
PATCH /falconries/:id: Update existing falconry (only authorized users)
DELETE /falconries/:id: Delete Falconry (only authorized users)

## Benutzer:

GET /users: Show all users
GET /users/:id: Show specific user
POST /users: Add a new user
PUT /users/:id: update an existing user
DELETE /users/:id: delete specific user

## Beobachtungen:

GET /observations:: Show all observations
GET /observations/:id: show specific observations
POST /observations: add a new observation
PUT /observations/:id: update an existing observation
DELETE /observations/:id: delete observation

## Sonstige Routen:

GET /search: Search
GET /events: Events referred to raptors
GET /articles: articles referred to raptors

## Images

- Uploadfeature

# Authentifizierung und Autorisierung:

- login
- logout
- register

# Security

## npm helmet

[Helmet](https://www.npmjs.com/package/helmet) sets the following headers by default:

- Content-Security-Policy: A powerful allow-list of what can happen on your page which mitigates many attacks
- Cross-Origin-Opener-Policy: Helps process-isolate your page
- Cross-Origin-Resource-Policy: Blocks others from loading your resources cross-origin
- Origin-Agent-Cluster: Changes process isolation to be origin-based
- Referrer-Policy: Controls the Referer header
- Strict-Transport-Security: Tells browsers to prefer HTTPS
- X-Content-Type-Options: Avoids MIME sniffing
- X-DNS-Prefetch-Control: Controls DNS prefetching
- X-Download-Options: Forces downloads to be saved (Internet Explorer only)
- X-Frame-Options: Legacy header that mitigates clickjacking attacks
- X-Permitted-Cross-Domain-Policies: Controls cross-domain behavior for Adobe products, like Acrobat
- X-Powered-By: Info about the web server. Removed because it could be used in simple attacks
- X-XSS-Protection: Legacy header that tries to mitigate XSS attacks, but makes things worse, so Helmet disables it

# Learnings

## Mongoose

### create() or insertMany()?

- Use create when you need validation and middleware execution and performance is not the main priority. It is ideal for scenarios where you want to insert a few documents at once and perform additional actions before or after saving.
- Use insertMany if you need high performance when inserting large amounts of documents and can skip validation and middleware execution. It is especially useful for bulk insertions where speed is critical.

### SchemaTypes

#### mongoose-autopopulate plugin

- You can add any property you want to your SchemaType options. Many plugins rely on custom SchemaType options. For example, the mongoose-autopopulate plugin automatically populates paths if you set autopopulate: true in your SchemaType options. Mongoose comes with support for several built-in SchemaType options, like lowercase in the above example.
- [Mongoose-Autopopulate](https://plugins.mongoosejs.io/plugins/autopopulate)

#### Dates in mongoose Schemas

- Built-in Date methods are not hooked into the mongoose change tracking logic which in English means that if you use a Date in your document and modify it with a method like setMonth(), mongoose will be unaware of this change and doc.save() will not persist this modification. If you must modify Date types using built-in methods, tell mongoose about the change with doc.markModified('pathToYourDate') before saving.

```js
const Eventdate = mongoose.model('Eventdate', { dueDate: Date });
const doc = await Eventdate.findOne();
doc.dueDate.setMonth(3);
await doc.save(); // THIS DOES NOT SAVE YOUR CHANGE

doc.markModified('dueDate');
await doc.save(); // works
´´´

```

### Zod

####

- **parse() and safeParse()**: The use of *parse()* versus *safeParse()* depends on specific requirements and the error handling in the application: 
parse(): Well suited if you are sure that the data is correct and if an exception on invalid data is helpful to indicate errors. 
safeParse(): Provides a safer way to validate that checks the validation status without throwing an exception. This is particularly useful if you want to validate data without the need for exception handling or if you want to process the detailed validation error directly.

#### Zod-to-Mongoose-Converter npm package

- Found and tried an interesting package to convert zod object into a mongoose schmema: [@zodyac/zod-mongoose: Zod to Mongoose Schema Converter](https://www.npmjs.com/package/@zodyac/zod-mongoose). Finally, I didn´t align with my specific needs due to limitations and overhead in terms of the time it costs to dig deep into the code under the hood, so that I can adapt some things based on my use case and the benefit. I realised, that I am quicker and more straightforward, when I just write the model by myself. Also, by now, this package is quite new and I can´t predict, how the maintenance will be in the future.But I'm definitely keeping an eye on it and I could well imagine using it for larger yet simple models one day.
