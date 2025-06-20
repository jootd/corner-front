// hooks/useSubscribe.js
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const subscribe = async (email) => {
  const res = await fetch('https://datafull.me/api/subscribers/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Subscription failed');
  }

  return res.json();
};

export const useSubscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const mutation = useMutation({
    mutationFn: () => subscribe(email),
    onSuccess: () => {
      setMessage({ type: 'success', text: 'Successfully subscribed!' });
      setEmail('');
    },
    onError: (error) => {
      setMessage({ type: 'error', text: error.message });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null); // clear previous messages
    mutation.mutate();
  };

  return {
    email,
    setEmail,
    handleSubmit,
    isPending: mutation.isPending,
    message,
  };
};
