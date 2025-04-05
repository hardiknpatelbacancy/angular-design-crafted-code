import { createContext, useContext } from "react";

type AppContextType = {
  showUploadPage: () => void;
};

export const AppContext = createContext<AppContextType>({
  showUploadPage: () => {},
});

export const useAppContext = () => useContext(AppContext);
