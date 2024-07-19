# Birds of Prey Endpoints

## Raptors:

- [x] GET /raptors: Show all raptors
- [x] GET /raptors/:id: Show a specific raptor

- [x] POST /raptors: Add a new raptor (or more)
- [x] DELETE /raptors/:id: Delete an existing raptor
- [x] PATCH /raptors/:id: Update an existing raptor

### More Request-Options for Raptors:

- [ ] GET /raptors/family: Show a raptor family
- [ ] GET /raptors/family/genus: Show raptor genera
- [ ] GET /raptors/family/genus/species: Show raptor species

## Falknereien:

- [x] GET /falconries: Show all Falconries
- [x] GET /falconries/:id: Show specific Falconries
- [x] POST /falconries: Add a new Falconry (only authorized users)
- [x] PATCH /falconries/:id: Update existing falconry (only authorized users)
- [x] DELETE /falconries/:id: Delete Falconry (only authorized users)

## Benutzer:

- [x] GET /users: Show all users
- [x] GET /users/:id: Show specific user
- [ ] POST /users: Add a new user
- [ ] PUT /users/:id: update an existing user
- [ ] DELETE /users/:id: delete specific user

## Beobachtungen:

- [ ] GET /observations:: Show all observations
- [ ] GET /observations/:id: show specific observations
- [ ] POST /observations: add a new observation
- [ ] PUT /observations/:id: update an existing observation
- [ ] DELETE /observations/:id: delete observation

## Sonstige Routen:

- [ ] GET /search: Search
- [ ] GET /events: Events referred to raptors
- [ ] GET /articles: articles referred to raptors

## Images

- Uploadfeature

# Authentifizierung und Autorisierung:

- [x] login
- [x] logout
- [x] register
- [x] verify

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

- #### **parse() and safeParse()**:
  The use of _parse()_ versus _safeParse()_ depends on specific requirements and the error handling in the application:
  parse(): Well suited if you are sure that the data is correct and if an exception on invalid data is helpful to indicate errors.
  safeParse(): Provides a safer way to validate that checks the validation status without throwing an exception. This is particularly useful if you want to validate data without the need for exception handling or if you want to process the detailed validation error directly.

#### Zod-to-Mongoose-Converter npm package

    Found and tried an interesting package to convert zod object into a mongoose schmema: [@zodyac/zod-mongoose: Zod to Mongoose Schema Converter](https://www.npmjs.com/package/@zodyac/zod-mongoose). Finally, I didn´t align with my specific needs due to limitations and overhead in terms of the time it costs to dig deep into the code under the hood, so that I can adapt some things based on my use case and the benefit. I realised, that I am quicker and more straightforward, when I just write the model by myself. Also, by now, this package is quite new and I can´t predict, how the maintenance will be in the future.But I'm definitely keeping an eye on it and I could well imagine using it for larger yet simple models one day.

### Connect Backend with Frontend

This project is to be linked to an existing front-end project of mine: [BirdsOfPrey-Project](https://github.com/nadjascodejourney/birdsOfPrey-Project). I have taken the following steps to do this:

#### 1. Setup Backend with relevant API Endpoints:

This whole repo shows, how this can be done.
For example, we need this Endpoint here to get all the raptors data:

```js
raptorsRouter.route("/").get(getAllRaptors);
´´´
```

#### 2. Setup Frontend:

- **Create a Context Provider**
  This component must be placed in the root component, to make the data from the backend accessible all over the frontend (see next step).

  For example: <BirdContextProvider/>

  ```js

  // In birdsOfPrey/src/context/BirdContextProvider.js
  import React, { createContext, useState, useEffect } from 'react';

  export const BirdContext = createContext();

  export const BirdProvider = ({ children }) => {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/raptors')
      .then(response => response.json())
      .then(data => setBirds(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <BirdContext.Provider value={{ birds }}>
      {children}
    </BirdContext.Provider>
  );
  };
  ´´´
  ```

  - **Place the Provider Component in the Root Component**

  This is required in order to make the Context Provider available in the whole frontend.

  ```js
  // birdsOfPrey/src/main.jsx

  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import { BirdProvider } from './context/BirdContext';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BirdProvider>
        <App />
      </BirdProvider>
    </React.StrictMode>
  );

  ´´´
  ```

  - **Create a Fetch-Component that uses and displays the data from the context**

  Name this component as clearly as possible so that it is clear what it does. For example <FetchBirds/>.

  The variable names in the JSX area must correspond to the property names from the database.

  ```js
  // birdsOfPrey/src/components/FetchBirds.js

  import React, { useContext } from 'react';
  import { BirdContext } from '../context/BirdContext';

  const FetchBirds = () => {
  const { birds } = useContext(BirdContext);

  return (
  <div>
    <h2>Birds of Prey</h2>
    <ul>
      {birds.map((bird) => (
        <li key={bird._id}>
          <h3>{bird.name}</h3>
          <p>Scientific Name: {bird.scientific_name}</p>
          <p>Family: {bird.family}</p>
          <p>Genus: {bird.genus}</p>
          <p>Conservation Status: {bird.conservation_status}</p>
          <p>Wing Span: {bird.wing_span_cm} cm</p>
          <p>Migration Distance: {bird.migration_distance_km} km</p>
          <p>Average Lifespan: {bird.average_lifespan_years} years</p>
          {/* More content here ... */}
        </li>
      ))}
    </ul>
  </div>
  );
  };

  export default FetchBirds;
  ´´´
  ```

  - **Place the <FetchBirds/> Component in your in your targeted parent component to display it there** (e.g. <Home/>)

  ```js
  // birdsOfPrey/src/pages/Home.jsx

  import React from 'react';
  import FetchBirds from "../components/FetchBirds";
  import HomeBirdMenu from "../components/HomeBirdMenu";

  const Home = () => {
    return (
        <HomeBirdMenu /> // another component
        <FetchBirds /> // our fetch component, we created before
    );
  };

  export default Home;

  ´´´
  ```

  #### Summary for the Frontend:

  1. Create a context provider (<BirdContext/>) and load the data there.
  2. Use the context provider in the root component (main.jsx).
  3. Create a <FetchBirds/> component that displays the data from the context.
  4. Add the <FetchBirds/> component to your parent component.

If you want to add additional functionalities, you can build on this basic framework.
