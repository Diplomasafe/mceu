# JWT

```jwt
eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImRpZDplYnNpOnoyMkVQRjg2YWd6V0RkNjV5WndWeXkyNSNiYmpZNFVaWmVDVUNJY29WaXRWZnlqOTZrUkpScG5hcmVQNVdjbUZhazY4In0.eyJpYXQiOjE3MzcwNzIwMDAsImp0aSI6InVybjp1dWlkOmNkNmU3ZmVkLTA5YzYtNGZhZS1hYTIzLWRiM2ViYzJmOGM5YiIsInN1YiI6ImRpZDprZXk6ejJkbXpEODFjZ1B4OFZraTdKYnV1TW1GWXJXUGdZb3l0eWtVWjNleXFodDFqOUticUNpYWh6NHF4RnExeEYyVU54SkozU2VEVUtLZVJMdWNlZENhZXNYWmFISGRwMmRvb21tNEJCaFQ1VUVtdEdWU1BuNlJ4QXM0eVlGQVJUZEFnSlp1M0t2MmRRR2dVcjRYRW9wOUozQ3JvTkpHdW02VDhTVERzTDN6NVo0VEE4WGdRQyIsImlzcyI6ImRpZDplYnNpOnoyMkVQRjg2YWd6V0RkNjV5WndWeXkyNSIsIm5iZiI6MTczNzA3MjAwMCwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwiaWQiOiJ1cm46dXVpZDpjZDZlN2ZlZC0wOWM2LTRmYWUtYWEyMy1kYjNlYmMyZjhjOWIiLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiVmVyaWZpYWJsZUF0dGVzdGF0aW9uIl0sImlzc3VlciI6ImRpZDplYnNpOnoyMkVQRjg2YWd6V0RkNjV5WndWeXkyNSIsImlzc3VhbmNlRGF0ZSI6IjIwMjUtMDEtMTdUMDA6MDA6MDAuMDAwWiIsInZhbGlkRnJvbSI6IjIwMjUtMDEtMTdUMDA6MDA6MDAuMDAwWiIsImlzc3VlZCI6IjIwMjUtMDEtMTdUMDA6MDA6MDAuMDAwWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmtleTp6MmRtekQ4MWNnUHg4VmtpN0pidXVNbUZZcldQZ1lveXR5a1VaM2V5cWh0MWo5S2JxQ2lhaHo0cXhGcTF4RjJVTnhKSjNTZURVS0tlUkx1Y2VkQ2Flc1haYUhIZHAyZG9vbW00QkJoVDVVRW10R1ZTUG42UnhBczR5WUZBUlRkQWdKWnUzS3YyZFFHZ1VyNFhFb3A5SjNDcm9OSkd1bTZUOFNURHNMM3o1WjRUQThYZ1FDIiwibmFtZSI6IkV4YW1wbGUiLCJ0aXRsZSI6IkV4YW1wbGUgVGl0bGUiLCJsZXZlbCI6IjQiLCJjcmVkaXRzIjoiMSIsImNyaXRlcmlhIjoiQ3JpdGVyaWEiLCJhc3Nlc3NtZW50X3R5cGUiOiJBc3Nlc3NtZW50IHR5cGUiLCJwYXJ0aWNpcGF0aW9uX2Zvcm0iOiJQYXJ0aWNpcGF0aW9uIGZvcm0iLCJ2ZXJpZmllZF9ieSI6Ik1DRVUifSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6Imh0dHBzOi8vYXBpLXBpbG90LmVic2kuZXUvdHJ1c3RlZC1zY2hlbWFzLXJlZ2lzdHJ5L3YzL3NjaGVtYXMvejNNZ1VGVWtiNzIydXE0eDNkdjV5QUptbk5tekRGZUs1VUM4eDgzUW9lTEpNIiwidHlwZSI6IkZ1bGxKc29uU2NoZW1hVmFsaWRhdG9yMjAyMSJ9LCJ0ZXJtc09mVXNlIjp7ImlkIjoiaHR0cHM6Ly9hcGktcGlsb3QuZWJzaS5ldS90cnVzdGVkLWlzc3VlcnMtcmVnaXN0cnkvdjUvaXNzdWVycy9kaWQ6ZWJzaTp6MjJFUEY4NmFneldEZDY1eVp3Vnl5MjUvYXR0cmlidXRlcy82NTkwYjNmNTg3N2U3YmNmZTMyMTgwN2UwMjg5MmU2YWI0NmNlYTI3ZWFiYjliZTBmYmUzN2YxNjEzZmMyMTVhIiwidHlwZSI6Iklzc3VhbmNlQ2VydGlmaWNhdGUifX19.NZjwMw4Zi4ZGwsH1m58Qc8GjpwvP-sijzukINjTHp1ti-F84pQNranvg2zxj2HVxkkh5992VWzaPNMG6ooZacA
```

# Header

```json
{
  "typ": "JWT",
  "alg": "ES256",
  "kid": "did:ebsi:z22EPF86agzWDd65yZwVyy25#bbjY4UZZeCUCIcoVitVfyj96kRJRpnareP5WcmFak68"
}
```

# Payload

```json
{
  "iat": 1737072000,
  "jti": "urn:uuid:cd6e7fed-09c6-4fae-aa23-db3ebc2f8c9b",
  "sub": "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbqCiahz4qxFq1xF2UNxJJ3SeDUKKeRLucedCaesXZaHHdp2doomm4BBhT5UEmtGVSPn6RxAs4yYFARTdAgJZu3Kv2dQGgUr4XEop9J3CroNJGum6T8STDsL3z5Z4TA8XgQC",
  "iss": "did:ebsi:z22EPF86agzWDd65yZwVyy25",
  "nbf": 1737072000,
  "vc": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "urn:uuid:cd6e7fed-09c6-4fae-aa23-db3ebc2f8c9b",
    "type": [
      "VerifiableCredential",
      "VerifiableAttestation"
    ],
    "issuer": "did:ebsi:z22EPF86agzWDd65yZwVyy25",
    "issuanceDate": "2025-01-17T00:00:00.000Z",
    "validFrom": "2025-01-17T00:00:00.000Z",
    "issued": "2025-01-17T00:00:00.000Z",
    "credentialSubject": {
      "id": "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbqCiahz4qxFq1xF2UNxJJ3SeDUKKeRLucedCaesXZaHHdp2doomm4BBhT5UEmtGVSPn6RxAs4yYFARTdAgJZu3Kv2dQGgUr4XEop9J3CroNJGum6T8STDsL3z5Z4TA8XgQC",
      "name": "Example",
      "title": "Example Title",
      "level": "4",
      "credits": "1",
      "criteria": "Criteria",
      "assessment_type": "Assessment type",
      "participation_form": "Participation form",
      "verified_by": "MCEU"
    },
    "credentialSchema": {
      "id": "https://api-pilot.ebsi.eu/trusted-schemas-registry/v3/schemas/z3MgUFUkb722uq4x3dv5yAJmnNmzDFeK5UC8x83QoeLJM",
      "type": "FullJsonSchemaValidator2021"
    },
    "termsOfUse": {
      "id": "https://api-pilot.ebsi.eu/trusted-issuers-registry/v5/issuers/did:ebsi:z22EPF86agzWDd65yZwVyy25/attributes/6590b3f5877e7bcfe321807e02892e6ab46cea27eabb9be0fbe37f1613fc215a",
      "type": "IssuanceCertificate"
    }
  }
}
```
