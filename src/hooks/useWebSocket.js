import { useState, useEffect } from 'react';

export function useWebSocket() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const url = `ws://localhost:8000/ws/${user}`;
      const newWs = new WebSocket(url);
      setWs(newWs);

      return () => newWs.close();
    }
  }, []);

  return ws;
}
