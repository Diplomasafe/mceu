# MCEU Micro-Credentials Platform 🎓

Welcome to the **MCEU Micro-Credentials Platform**, a comprehensive solution for managing micro-credentials within the European Union.

## Overview 🚀

MCEU Platform is a comprehensive credential management system for issuing and managing Verifiable Credentials (VCs) in the hospitality industry.
The platform consists of two Vue.js frontends and a Nest.js backend.

## Features 🔧

- **Learner Portal** 🧑‍🎓: A Vue.js application for learners to view and manage their micro-credentials.
- **Provider Portal** 🏫: A Vue.js application for education and training providers to issue and manage micro-credentials.
- **API Service** 🌐: A Nest.js application providing RESTful API endpoints for the platform.
- **Integration with European Blockchain Services Infrastructure (EBSI)** 🔒: Leveraging blockchain technology for secure and verifiable credentials.
- **Support for Decentralised Identifiers (DIDs)** 🆔: Implementing DIDs for identity management.
- **Compliance with European Qualifications Framework (EQF)** 📚: Ensuring alignment with EU qualifications standards.

## Architecture 🏗️

The platform consists of three main components:

- `mceu-api`: Nest.js backend service
- `mceu-learner`: Vue.js frontend for students
- `mceu-provider`: Vue.js frontend for VET providers

## Quick Start 🚀

### Prerequisites

- Docker
- Docker Compose
- Node.js (recommended)

### Installation

Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/Diplomasafe/mceu.git
```

#### Environment Setup

For the API service, Provider Portal, and Learner Portal, you need to create .env files based on the provided .env.example files.
Navigate to each directory and create the .env files:

Run all services using Docker Compose:

```bash
docker compose -f docker-compose.yml \
              -f mceu-api/docker-compose.yml \
              -f mceu-learner/docker-compose.yml \
              -f mceu-provider/docker-compose.yml \
              up --build -d
```

## Technical Stack 💻

- **Backend**: Nest.js
- **Frontend**: Vue.js
- **Containerization**: Docker
- **Authentication**: JWT, DID
- **Standards Compliance**: EBSI, EDC

## Security 🔒

- Secure credential storage
- Cryptographic signatures
- GDPR compliant
- Role-based access control

## Support 💬

For support and training:

- Submit support tickets through the platform
- Access training sessions for VET providers
- Contact Diplomasafe support team

## License⚖️📝

This project is licensed under the MIT License.

## Contact 🤝

For more information, visit Diplomasafe:
