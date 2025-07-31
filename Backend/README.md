# 👤 User Registration API

## 🔗 POST `/user/register`

Registers a new user and returns a JWT token along with basic user information.

---

## 🧾 Request Headers

| Header       | Value            | Required | Description               |
| ------------ | ---------------- | -------- | ------------------------- |
| Content-Type | application/json | ✅       | Must be set for JSON body |

---

## 📥 Request Body

```json
{
  "fullName": {
    "firstName": "Taranjeet",
    "lastName": "Singh"
  },
  "email": "taranjeet@example.com",
  "password": "SecurePass123!"
}
📌 Fields
Field	Type	Required	Description
fullName.firstName	String	✅	Minimum 3 characters
fullName.lastName	String	❌	Optional, minimum 3 characters
email	String	✅	Must be a valid email
password	String	✅	Minimum 6 characters

✅ Successful Response
Status Code: 201 Created

json
Copy
Edit
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "688a016a93ed2ad20349a713",
    "fullName": {
      "firstName": "Taranjeet",
      "lastName": "Singh"
    },
    "email": "taranjeet@example.com",
    "createdAt": "2025-07-30T11:26:34.660Z",
    "updatedAt": "2025-07-30T11:26:34.660Z"
  }
}
❌ Error Responses
Status Code	Message / Format	Reason
400	"All fields are required"	Missing a required field
400	"User already exist"	Email already registered
400	[{"msg": "...", "path": "..."}]	Field-level validation errors
500	"Internal server error"	Server crash, DB issue, or unexpected failure

🔐 Security
Passwords are hashed using bcrypt before storing.

JWT token is signed using a secret key and expires in 7 days.

The token can be used to access protected routes like /user/profile.

🧪 Test It
You can test this endpoint using Postman or Hoppscotch with the following steps:

Set the method to POST.

URL: http://localhost:PORT/user/register

Set Headers:

Content-Type: application/json

In the Body (raw JSON), send:

json
Copy
Edit
{
  "fullName": {
    "firstName": "Taranjeet",
    "lastName": "Singh"
  },
  "email": "taranjeet@example.com",
  "password": "SecurePass123!"
}
```
