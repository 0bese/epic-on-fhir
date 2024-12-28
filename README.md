# Epic on FHIR

This project demonstrates a healthcare interoperability solution that leverages OAuth 2.0 for secure user authentication and enables FHIR (Fast Healthcare Interoperability Resources) queries to access and interact with healthcare data.

## 🚀 **About the Application**

The application focuses on seamless and secure data exchange in healthcare settings. Here's how it works:

1. **OAuth 2.0 Login via Epic**: Users authenticate through Epic's OAuth 2.0 mechanism, ensuring secure access to their healthcare data.
2. **Redirection and Token Handling**: After successful authentication, the user is redirected back to the application with a token.
3. **FHIR Queries**: Using the token, the application makes FHIR-compliant API requests to access and manipulate healthcare resources like patients, observations, and appointments.

The project is designed to showcase real-time or near real-time healthcare data access while adhering to industry standards for interoperability and data security.

---

## 🚀 **Getting Started**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/epic-on-fhir.git
   cd epic-on-fhir
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   EPIC_CLIENT_ID=your_epic_client_id
   EPIC_REDIRECT_URI=your_redirect_uri
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the application in action.

---

## 📹 **Demonstration Video**

Check out a quick demo of the application in action:

[![Video Title](https://img.youtube.com/vi/oFKdJYI7g7I/0.jpg)](https://youtu.be/oFKdJYI7g7I)

https://youtu.be/oFKdJYI7g7I

---

## 🛠 **Technologies Used**

- **OAuth 2.0**: For secure authentication and token-based authorization.
- **FHIR API**: For standard-compliant healthcare data exchange.
- **HAPI-FHIR**: A Java-based library for working with FHIR resources.
- **JS**: Backend implementation for managing requests and responses.
- **Epic Systems**: For integrating real-world healthcare data.

---

## 💡 **Features**

- Secure login using OAuth 2.0 via Epic Systems.
- Retrieve patient details and clinical data through FHIR queries.
- Real-time data handling for healthcare resource access.
- Error handling to ensure reliable data integrity during interactions.

---

## 📚 **Documentation**

For more details on the APIs and endpoints used in this project, refer to the official [Epic on FHIR documentation](https://fhir.epic.com/Documentation?docId=oauth2).

---

## 🤝 **Contributing**

We welcome contributions to enhance the functionality and features of this project. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## 📄 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
