 const userIcon = (
    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
    </svg>
  );

  const emailIcon = (
    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 16">
      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
    </svg>
  );

  const passwordIcon = (
    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 8h-1V6a5 5 0 0 0-10 0v2H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-8-2a3 3 0 0 1 6 0v2H9V6Zm7 14H6V10h10v10Zm-5-3a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Z" />
    </svg>
  );

export const formFields = {
  signup: [
    { id: "name", label: "Name", placeholder: "Elon Musk", icon: userIcon },
    { id: "username", label: "Username", placeholder: "elonmusk", icon: userIcon },
    { id: "email", label: "Email", type: "email", placeholder: "elon@x.com", icon: emailIcon },
    { id: "password", label: "Password", type: "password", placeholder: "********", icon: passwordIcon },
  ],
  login: [
    { id: "email", label: "Email", type: "email", placeholder: "elon@x.com", icon: emailIcon },
    { id: "password", label: "Password", type: "password", placeholder: "********", icon: passwordIcon },
  ],
};
