'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type EditLayoutModes = 'desktop' | 'mobile';

type EditModeContextValue = {
  draggingItem: any;
  setDraggingItem: (newDraggingItem: any) => void;
  editLayoutMode: EditLayoutModes;
  setEditLayoutMode: (newLayoutMode: any) => void;
};

const EditModeContext = createContext<EditModeContextValue | undefined>(
  undefined
);

export const useEditModeContext = (): EditModeContextValue => {
  const context = useContext(EditModeContext);

  if (!context) {
    throw new Error(
      'useEditModeContext must be used within a EditModeContextProvider'
    );
  }

  return context;
};

export const EditModeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [draggingItem, setDraggingItem] = useState();
  const [editLayoutMode, setEditLayoutMode] =
    useState<EditLayoutModes>('desktop');

  const contextValue: EditModeContextValue = {
    draggingItem,
    setDraggingItem,
    editLayoutMode,
    setEditLayoutMode,
  };

  return (
    <EditModeContext.Provider value={contextValue}>
      {children}
    </EditModeContext.Provider>
  );
};
