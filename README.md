
# Song Recommendations

---

Name: Shannen Lam

Date: April 4, 2019

Project Topic: Best Songs and Their Ratings

URL: https://crowd-sourced-song-recs.herokuapp.com/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Title              `Type: String`
- `Field 2`:     Artist(s)          `Type: [String]`
- `Field 3`:     Genre(s)           `Type: [String]`
- `Field 4`:     Language           `Type: String`
- `Field 5`:     Rate (out of 5)    `Type: Number`

Schema: 
```javascript
{
   title: String, 
   artists: [String],
   genres: [String],
   language: String,
   suggested: Number,  
   rate: Number
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       title: "i'm so tired...", 
       artists:["Lauv","Troye Sivan"],
       genres:["Pop"],
       language:"English",
       suggested: 1,
       rate: 5
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getSongs`

### 4. Search Data

Search Field: Song title

### 5. Navigation Pages

Navigation Filters
1. Best Songs -> `  /bestsongs  `
2. By Genre -> `  /bygenre  `
3. English Songs -> `  /english  `
4. Alphabetically -> `  /alphabetical  `
5. Random Rec -> `  /randomrec  `

