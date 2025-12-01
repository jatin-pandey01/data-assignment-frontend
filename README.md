# 📊 Soccer Insight Finder

Soccer Insight Finder is a clean and intuitive web application that
allows users to query soccer insights using natural language.\
The frontend sends the user's question to a backend API (`/api/query`),
which then returns an AI-generated SQL command along with the query
results.

## 🚀 Features

-   🔍 **Natural Language Search** --- Example: "Top 5 players on rating
    basis"
-   🧠 **Auto-generated SQL Query** --- Backend converts natural text to
    SQL
-   📄 **SQL Preview Panel** --- Full SQL displayed with a Copy button
-   📊 **Interactive Results Table**
-   🕒 **Execution Time Indicator**
-   📜 **Search History Tracking**
-   📋 **Copy SQL to Clipboard**

## 🖼️ UI Overview

### 🔹 Search Bar

Users can enter natural language questions at the top.\
Example: **"Top 5 player on rating basis"**

### 🔹 SQL Command Panel

A dark code section displaying the generated SQL.

### 🔹 Results Table

Displays columns such as:

  player_name         max_overall_rating
  ------------------- --------------------
  Lionel Messi        94
  Wayne Rooney        93
  Gianluigi Buffon    93
  Cristiano Ronaldo   93
  Xavi Hernandez      92

### 🔹 Search History

At the bottom, users can see their previously executed queries.

## 🛠️ Tech Stack

**Frontend:** Angular\
**Backend API:** ASP.NET Core Web API\
**Database:** SQL-based\
**Styling:** TailwindCSS / Custom Styles

## 📡 API Details

### Endpoint

    POST https://localhost:7193/api/query

### Request Body (Plain Text)

    "Top 5 player on rating basis"

![alt text](image.png)
![alt text](image-1.png)

### Backend Handler

``` csharp
[HttpPost]
public IActionResult Query([FromBody] string question)
```

### Example Response

``` json
{
  "sql": "SELECT ...",
  "results": [
    {
      "player_name": "Lionel Messi",
      "max_overall_rating": 94
    }
  ],
  "executionTimeMs": 224
}
```

## 🧑‍💻 Frontend Setup (Angular)

    npm install
    ng serve -o

### Angular API Call

``` ts
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

this.http.post(
  'https://localhost:7193/api/query',
  this.searchTerm,
  { headers }
).subscribe(response => {
  console.log(response);
});
```

## 🗄️ Backend Setup (ASP.NET Core)

    dotnet restore
    dotnet build
    dotnet run

### Enable CORS

``` csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

app.UseCors("AllowAll");
```

## 🧪 Example Query

User Input:

    Top 5 player on rating basis

Generated SQL:

``` sql
SELECT
    T1.player_name,
    MAX(T2.overall_rating) AS max_overall_rating
FROM Player AS T1
INNER JOIN Player_Attributes AS T2
    ON T1.player_api_id = T2.player_api_id
GROUP BY
    T1.player_name
ORDER BY
    max_overall_rating DESC
LIMIT 5;
```
