import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean }) => void;
  selectedAppId?: string;
  setSelectedAppId: (id?: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [selectedAppId, setSelectedAppId] = useState<string | undefined>(() => {
    const match = window.location.pathname.match(/\/broker\/applications\/([A-Za-z0-9-]+)/);
    return match ? match[1] : undefined;
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      const match = path.match(/\/broker\/applications\/([A-Za-z0-9-]+)/);
      if (match) {
        setSelectedAppId(match[1]);
      } else {
        setSelectedAppId(undefined);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, options?: { replace?: boolean }) => {
    if (path === currentPath) return;

    if (options?.replace) {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }

    setCurrentPath(path);

    const match = path.match(/\/broker\/applications\/([A-Za-z0-9-]+)/);
    if (match) {
      setSelectedAppId(match[1]);
    } else {
      setSelectedAppId(undefined);
    }

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        selectedAppId,
        setSelectedAppId,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
