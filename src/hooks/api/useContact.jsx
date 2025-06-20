// hooks/useContact.js
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const sendContactRequest = async (data) => {
  const res = await fetch("https://datafull.me/api/contacts/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Contact submission failed");
  }

  return res.json();
};

export const useContact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState(null);

  const mutation = useMutation({
    mutationFn: () =>
      sendContactRequest({
        service: selectedService,
        fullname: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
    onSuccess: () => {
      setMessage({
        type: "success",
        text: "Message sent successfully. We’ll get back to you soon!",
      });
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setSelectedService("");
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
    },
  });

  const handleInputChange = (field, value) => {
    if (field === "phone") {
      value = value.replace(/\D/g, ""); // digits only
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setMessage(null);
    if (
      !selectedService ||
      !formData.fullName ||
      !formData.email ||
      !formData.message
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }
    mutation.mutate();
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    selectedService,
    setSelectedService,
    handleSubmit,
    isPending: mutation.isPending,
    message,
  };
};
