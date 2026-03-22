# State Tracking (Gemini)

## JSON Data Schema

### Contact Form — Raw Input Shape
```json
{
  "name": "string (required, min 2 chars)",
  "email": "string (required, valid email)",
  "message": "string (required, min 10 chars)"
}
```

### Contact Form — Firestore Document (Payload) Shape
```json
{
  "name": "string",
  "phone": "string",
  "message": "string",
  "createdAt": "Timestamp (server)"
}
```

**Collection:** `contacts`

## Maintenance Log
*(Pending Deployment)*
