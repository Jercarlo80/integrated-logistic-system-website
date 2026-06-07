// components/SessionBar.tsx
'use client';

import { useEffect, useState } from 'react';
import { useToken } from '../hooks/useToken';

function decodeJWT(t: string) {
  try {
    const [, payload] = t.split('.');
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

export default function SessionBar() {
  const { token } = useToken();
  const [info, setInfo] = useState({ uid: '', role: '', exp: 0, expired: false, bf: 0 });

  useEffect(() => {
    if (!token) {
      setInfo({ uid: '', role: '', exp: 0, expired: false, bf: 0 });
      return;
    }
    const decoded = decodeJWT(token);
    if (!decoded) return;
    const now = Date.now() / 1000;
    const expired = decoded.exp && now > decoded.exp;
    setInfo({
      uid: decoded.uid || decoded.sub || '?',
      role: decoded.rid || '?',
      exp: decoded.exp || 0,
      expired,
      bf: decoded.bf || 0,
    });
  }, [token]);

  if (!token) return <div className="session-bar">No Session</div>;
  if (!info.uid) return <div className="session-bar err">Invalid Token</div>;

  return (
    <div className="session-bar">
      <span className="badge on">uid: {info.uid}</span>
      <span className="badge on">role: {info.role}</span>
      <span className={`badge ${info.expired ? 'err' : 'on'}`}>
        exp: {info.exp ? new Date(info.exp * 1000).toLocaleTimeString() : '?'}
        {info.expired ? ' !' : ''}
      </span>
      <span className="badge warn">bf: 0x{info.bf.toString(16)}</span>
    </div>
  );
}